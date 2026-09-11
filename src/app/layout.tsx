import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Vaigai Certificate Provider | 5-Day AI Webinar Series 2026',
  description: 'Official Certificate Generation and Verification Portal for the 5-Day AI Webinar Series 2026 organized by Vaigai College of Engineering.',
  keywords: 'Vaigai College of Engineering, AI Webinar Series 2026, Certificate Provider, AI Certificate, ECE, CSE',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-slate-950 text-slate-100 min-h-screen flex flex-col selection:bg-amber-500 selection:text-slate-950">
        {children}
      </body>
    </html>
  );
}
