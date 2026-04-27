import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'FLASH BOOSTAGE | #1 SMM Panel In The World',
  description:
    '#1 SMM PANEL IN THE WORLD! FLASH BOOSTAGE is an online social media marketing tool. This software includes almost everything for you need to do a social media marketing business.',
  keywords:
    '#1 SMM PANEL IN THE WORLD!, FLASH BOOSTAGE, best smm panel, cheapest smm panel, facebook, follower, instagram, like, SMM, smm panel, social media marketing, youtube, subscribers',
  openGraph: {
    title: 'FLASH BOOSTAGE | #1 SMM Panel In The World',
    description: '#1 SMM PANEL IN THE WORLD! FLASH BOOSTAGE is an online social media marketing tool.',
    images: [
      {
        url: 'https://boostsmm.ng/assets/uploads/logo/meta.png',
        width: 1200,
        height: 630,
        alt: 'FLASH BOOSTAGE',
      },
    ],
    url: 'https://boostsmm.ng',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FLASH BOOSTAGE | #1 SMM Panel In The World',
    description: '#1 SMM PANEL IN THE WORLD! FLASH BOOSTAGE is an online social media marketing tool.',
  },
  icons: {
    icon: 'https://boostsmm.ng/assets/uploads/logo/favicon.png',
    apple: 'https://boostsmm.ng/assets/uploads/logo/logo.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta name="apple-mobile-web-app-title" content="FLASH BOOSTAGE | Home" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
