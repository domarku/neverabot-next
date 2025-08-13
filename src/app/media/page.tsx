import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Image from 'next/image';
import client from '@/lib/contentful';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ContentfulEntry = any;

export const metadata = {
  title: 'neverabot.org / Media',
  description:
    'Media coverage and related stories about memorial chatbots and digital remains.',
};

async function getArticles(): Promise<ContentfulEntry[]> {
  try {
    const entries = await client.getEntries({
      content_type: 'neverabotMediaItem',
      order: ['-fields.publishDate'],
    });
    return entries.items;
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
}

export default async function Media() {
  const articles = await getArticles();

  return (
    <div className="outer-container">
      <Navigation currentPage="media" />

      <div className="paper">
        <div className="logo"></div>
        <h2 className="subtitle">Media and Related Stories</h2>

        <div className="articles">
          {articles.map((article: ContentfulEntry) => (
            <a key={article.sys.id} href={article.fields.link}>
              <article>
                <Image
                  alt={article.fields.title}
                  width={100}
                  height={50}
                  src={
                    article.fields.image?.fields?.file?.url?.startsWith('//')
                      ? `https:${article.fields.image.fields.file.url}`
                      : article.fields.image?.fields?.file?.url ||
                        '/assets/img/article-1.jpg'
                  }
                />
                <div className="text-content">
                  <h3>{article.fields.title}</h3>
                  <p>{article.fields.excerpt}</p>
                  <p className="meta">
                    <span className="publish-date">
                      {article.fields.publishDate}
                    </span>{' '}
                    — <span className="authors">{article.fields.authors}</span>{' '}
                    — <span className="type">{article.fields.type}</span> —{' '}
                    <span className="source">{article.fields.source}</span>
                  </p>
                </div>
              </article>
            </a>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
