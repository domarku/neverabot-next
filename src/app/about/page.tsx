import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'neverabot.org / About',
  description:
    "About Never a bot - a website that allows you to sign a document that says you don't want to be turned into a memorial chatbot after death.",
};

export default function About() {
  return (
    <div className="outer-container">
      <Navigation currentPage="about" />

      <div className="paper">
        <div className="logo"></div>

        <div className="statement">
          <p className="subhead">
            Never a Bot is an interactive online and physical installation that
            invites individuals to formally declare their refusal to be
            digitally replicated after death.
          </p>
          <p>
            The project centers on a downloadable, signable statement asserting
            the right to prevent one&rsquo;s personal data — including messages,
            emails, posts, and images — from being used to create artificial
            intelligence chatbots or other posthumous digital simulations.
          </p>

          <img src="/assets/img/neverabot-2.jpg" alt="Never a Bot" />

          <p>
            When it was first conceived in 2016, the statement referred only to
            &quot;chatbots,&quot; reflecting the language and technological
            landscape of the time. In light of rapid advances in AI, the
            work&rsquo;s implications now encompass a wider range of possible
            replications, from voice and likeness models to generative identity
            simulations.
          </p>
          <p>
            The idea emerged in response to an article in{' '}
            <a
              href="https://www.theverge.com/a/luka-artificial-intelligence-memorial-roman-mazurenko-bot"
              target="_blank"
              rel="noopener noreferrer"
            >
              The Verge
            </a>
            , on Eugenia Kuyda, who built a chatbot using the archived
            communications of her deceased friend. By translating that premise
            into an accessible, opt-out format, Never a Bot engages with
            questions of privacy, consent, and digital legacy in the age of
            intelligent systems.
          </p>
          <p>
            The project debuted as part of the exhibition{' '}
            <a
              href="https://radiona.org/science-fiction-new-parallel-worlds/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Science Fiction – New Parallel Worlds
            </a>{' '}
            at the Nikola Tesla Technical Museum in Zagreb, Croatia, in November
            2016, created by Ana Labudović and Dominik Markušić Gross. Online
            submissions were automatically printed on paper slips and deposited
            into a transparent box within the exhibition space, transforming
            intangible digital choices into a visible accumulation of dissent.
          </p>

          <img src="/assets/img/neverabot-4.gif" alt="Never a Bot" />

          <p>
            By juxtaposing the ephemeral nature of online consent with a
            tangible, accumulating record, Never a Bot invites reflection on the
            persistence of personal data, the ethics of posthumous identity, and
            the shifting boundaries between human memory and machine simulation.
          </p>
        </div>

        <div className="privacy-policy">
          <h3>Privacy Policy</h3>
          <p>
            Never a Bot is committed to protecting your privacy. This website
            does not collect, store, or transmit any personal data.
          </p>
          <p>
            No Data Collection: We do not store your name, location, birth date,
            or any other information you enter on this site. All form
            submissions are processed locally in your browser and result only in
            a downloadable document.
          </p>
          <p>
            No Tracking: We do not use cookies, analytics, or any tracking
            technologies. Your visit to this site is completely anonymous.
          </p>
          <p>
            No Server Storage: No data is sent to or stored on our servers. The
            website operates entirely through your browser without any backend
            data processing.
          </p>
          <p>
            Third-Party Services: We use Mapbox for location autocomplete
            functionality. While this service may receive your location queries,
            we do not have access to or store any of this data.
          </p>
          <p>
            IP-Based Geolocation: When you visit this site, we may use your IP
            address to suggest your approximate location for the form&rsquo;s
            location field. This is done through a third-party geolocation
            service and is only used to pre-fill the location field for your
            convenience. We do not store your IP address or the suggested
            location data.
          </p>
          <p>
            Your Rights: Since we don&rsquo;t collect any data, there&rsquo;s
            nothing to access, modify, or delete. Your privacy is protected by
            design.
          </p>
        </div>

        <div className="contact-section">
          <h3>Contact Us</h3>
          <p>
            For any inquiries, please contact us at{' '}
            <a href="mailto:hello@neverabot.org">
              {['hello', '@', 'neverabot.org'].join('')}
            </a>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
