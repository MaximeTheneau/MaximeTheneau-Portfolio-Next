import * as React from 'react';
import { Jura } from 'next/font/google';
import Cursor from './cursor/Cursor';
import Navbar from './navbar/Navbar';
import Footer from './footer/Footer';

const jura = Jura({
  variable: '--font-jura',
  subsets: ['latin'],
});

type LayoutProps = {
  children: React.ReactNode;
  }

export default function Layout({ children }: LayoutProps) {
  return (
    <div className={`flex flex-col h-screen ${jura.variable}`}>
      <header className="min-h-10">
        <Navbar />
      </header>
      <main className="flex-grow">
        {children}
      </main>
      <footer>
        <Footer />
      </footer>
      <Cursor />
    </div>
  );
}
