import { Jura } from 'next/font/google';
import Cursor from './cursor/Cursor';
import Navbar from './navbar/Navbar';
import Footer from './footer/Footer';

type LayoutProps = {
  children: React.ReactNode;
}
const inter = Jura({ subsets: ['latin'] });

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <style jsx global>
        {`
        html {
          font-family: ${inter.style.fontFamily};
        }
      `}
      </style>
      <div className="flex flex-col h-screen">
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
    </>
  );
}
