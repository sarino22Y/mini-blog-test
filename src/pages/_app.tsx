import type { AppProps } from 'next/app';
import '../styles/globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { cn } from '@/lib/utils';
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });
export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={cn(inter.className, 'min-h-screen flex flex-col bg-gray-50')}>
      <Navbar />
      <main className="flex-1">
        <Component {...pageProps} />
      </main>
      <Footer />
    </div>
  );
}