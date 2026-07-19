import { Playfair_Display, Lato, Noto_Sans_KR } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['700', '900'],
  variable: '--font-playfair',
});

const lato = Lato({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-lato',
});

const notoKR = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-noto-kr',
});

export const metadata = {
  title: "Sam's Fridge",
  description: 'Track fridge ingredients and get recipe suggestions',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko" className={`${playfair.variable} ${lato.variable} ${notoKR.variable}`}>
      <body className="bg-cream text-neutral-900 font-sans antialiased">{children}</body>
    </html>
  );
}
