import * as React from 'react';
import Cursor from './cursor/cursor';
import Navbar from './navbar/navbar';
import Footer from './footer/footer';

type LayoutProps = {
  children: React.ReactNode;
  }

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Cursor />
      <header>
        <Navbar />
      </header>
      <main>
        {children}
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}
