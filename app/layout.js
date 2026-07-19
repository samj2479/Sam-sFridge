import './globals.css';

export const metadata = {
  title: "Sam's Fridge",
  description: 'Track fridge ingredients and get recipe suggestions',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body className="bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 min-h-screen">
        {children}
      </body>
    </html>
  );
}
