import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Image from 'next/image';

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
            Never a bot is a website that allows you to sign, download and share
            a document that says you don&apos;t want to be turned into a{' '}
            <span className="tooltip">
              chatbot
              <span className="tooltiptext">
                Chatbot
                <br />
                — noun
                <br />
                a computer program which conducts a conversation via auditory or
                textual methods [...] often designed to convincingly simulate
                how a human would behave as a conversational partner, thereby
                passing the Turing test.
                <br />
                (From Wikipedia, 22 November 2017)
              </span>
            </span>{' '}
            after death.
          </p>
          <p className="fine-print">
            This project was part of an art installation at the Science Fiction
            exhibition at the Technical Museum in Zagreb, Croatia in November
            2016. Statements filled online were automatically printed to a
            transparent box in the museum, as a physical representation of
            interest in the subject.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
