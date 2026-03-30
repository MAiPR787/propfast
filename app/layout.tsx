import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
});

export const metadata: Metadata = {
  title: 'PropFast — AI Proposal Generator for Freelancers',
  description: 'Generate professional freelance proposals in 60 seconds. Stop writing, start closing.',
  keywords: ['freelance proposal', 'proposal generator', 'AI proposal', 'freelancer tools'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={geist.variable}>
      <head>
        <script defer data-domain="propfast.vercel.app" src="https://plausible.io/js/script.js"></script>
      </head>
      <body className="min-h-screen bg-white text-gray-900 antialiased font-sans">
        <Navbar />
        <main className="pt-16">
          {children}
        </main>
      </body>
    </html>
  );
}
