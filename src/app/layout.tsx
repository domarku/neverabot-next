import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'neverabot.org',
  description: 'Never a bot is a website that allows you to sign, download and share a document that says you don\'t want to be turned into a memorial chatbot after death.',
  openGraph: {
    url: 'http://neverabot.org/',
    title: 'Never a bot',
    description: 'Never a bot is a website that allows you to sign, download and share a document that says you don\'t want to be turned into a memorial chatbot after death.',
    images: ['/assets/img/neverabot-page.jpg'],
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
}

export const viewport = {
  themeColor: '#ffffff',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
