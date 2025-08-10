import Navigation from '@/components/Navigation'
import Image from 'next/image'

export const metadata = {
  title: 'neverabot.org / About',
  description: 'About Never a bot - a website that allows you to sign a document that says you don\'t want to be turned into a memorial chatbot after death.',
}

export default function About() {
  return (
    <div className="outer-container">
      <Navigation />

      <div className="paper">
        <div className="logo">
          <Image 
            src="/assets/img/neverabot-logo.svg" 
            alt="Never a bot logo" 
            width={100} 
            height={100}
            className="logo-hover"
          />
        </div>

        <div className="statement">
          <p className="subhead">
            Never a bot is a website that allows you to sign, download and share a document that says you don&apos;t want to be turned into a{' '}
            <span className="tooltip">
              chatbot
              <span className="tooltiptext">
                Chatbot<br />
                — noun<br />
                a computer program which conducts a conversation via auditory or textual methods [...] often designed to convincingly simulate how a human would behave as a conversational partner, thereby passing the Turing test.<br />
                (From Wikipedia, 22 November 2017)
              </span>
            </span>{' '}
            after death.
          </p>
          <p className="fine-print">
            This project was part of an art installation at the Science Fiction exhibition at the Technical Museum in Zagreb, Croatia in November 2016. Statements filled online were automatically printed to a transparent box in the museum, as a physical representation of interest in the subject.
          </p>
        </div>

        <div className="articles">
          <h2 className="subtitle">Related Articles</h2>

          <a href="https://www.wired.com/story/a-sons-race-to-give-his-dying-father-artificial-immortality/">
            <article>
              <Image 
                alt="From left to right: Roman Mazurenko, Eugenia Kuyda, Andronik Khachiyan" 
                width={400} 
                height={200} 
                src="/assets/img/dadbot-opener.jpg"
              />
              <h3>Wired &gt; A son&apos;s race to give his dying father artificial immortality</h3>
              <p>For weeks, amid my dad&apos;s barrage of doctor&apos;s appointments, medical tests, and treatments, I keep the notion to myself. I dream of creating a Dadbot—a chatbot that emulates not a children&apos;s toy but the very real man who is my father. And I have already begun gathering the raw material: those 91,970 words ...</p>
            </article>
          </a>

          <a href="https://www.theverge.com/a/luka-artificial-intelligence-memorial-roman-mazurenko-bot">
            <article>
              <Image 
                alt="From left to right: Roman Mazurenko, Eugenia Kuyda, Andronik Khachiyan" 
                width={400} 
                height={200} 
                src="/assets/img/speak-memory.jpg"
              />
              <h3>The Verge &gt; Speak, memory</h3>
              <p>When her best friend died, Eugenia Kuyda rebuilt him using artificial intelligence</p>
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
              <h3>My Dead Girlfriend&apos;s Bot, a short story by Joshua Allen</h3>
              <p>It&apos;s been seven months since Emma died and two weeks since I started building a bot from her texts</p>
            </article>
          </a>
        </div>
      </div>

      <footer>
        <p>© 2024 neverabot.org</p>
      </footer>
    </div>
  )
}
