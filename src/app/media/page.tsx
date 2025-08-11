import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Image from 'next/image';

export const metadata = {
  title: 'neverabot.org / Media',
  description:
    'Media coverage and related stories about memorial chatbots and digital remains.',
};

export default function Media() {
  return (
    <div className="outer-container">
      <Navigation currentPage="media" />

      <div className="paper">
        <div className="logo"></div>

        <div className="articles">
          <h2 className="subtitle">Media and Related Stories</h2>

          <a href="https://www.wired.com/story/a-sons-race-to-give-his-dying-father-artificial-immortality/">
            <article>
              <Image
                alt="Wired: A son's race to give his dying father artificial immortality"
                width={400}
                height={200}
                src="/assets/img/dadbot-opener.jpg"
              />
              <h3>
                Wired &gt; A son&apos;s race to give his dying father artificial
                immortality
              </h3>
              <p>
                For weeks, amid my dad&apos;s barrage of doctor&apos;s
                appointments, medical tests, and treatments, I keep the notion
                to myself. I dream of creating a Dadbot — a chatbot that
                emulates not a children&apos;s toy but the very real man who is
                my father.
              </p>
            </article>
          </a>

          <a href="https://www.theverge.com/a/luka-artificial-intelligence-memorial-roman-mazurenko-bot">
            <article>
              <Image
                alt="The Verge: Speak, memory"
                width={400}
                height={200}
                src="/assets/img/speak-memory.jpg"
              />
              <h3>The Verge &gt; Speak, memory</h3>
              <p>
                When her best friend died, Eugenia Kuyda rebuilt him using
                artificial intelligence
              </p>
            </article>
          </a>

          <a href="https://i.imgur.com/XY5KnXr.jpg">
            <article>
              <Image
                alt="My Dead Girlfriend's Bot story image"
                width={400}
                height={200}
                src="/assets/img/my-dead-girfriends-bot.jpg"
              />
              <h3>
                My Dead Girlfriend&apos;s Bot, a short story by Joshua Allen
              </h3>
              <p>
                It&apos;s been seven months since Emma died and two weeks since
                I started building a bot from her texts
              </p>
            </article>
          </a>
        </div>
      </div>

      <Footer />
    </div>
  );
}
