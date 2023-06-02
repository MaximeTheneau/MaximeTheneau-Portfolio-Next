import * as React from 'react';
import Cursor from './cursor/Cursor';
import Navbar from './navbar/Navbar';
import Footer from './footer/Footer';

type LayoutProps = {
  children: React.ReactNode;
  }

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        {children}
      </main>
      <footer>
        <Footer />
      </footer>
      <Cursor />
    </>
  );
}
