import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-gray-800">
          Blog Animaux
        </Link>
        <div className="space-x-4">
          <Button variant="outline" asChild>
            <Link href="/">Accueil</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/about">À propos</Link>
          </Button>
        </div>
      </nav>
    </header>
  );
}