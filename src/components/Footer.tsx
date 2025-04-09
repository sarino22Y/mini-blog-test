export default function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-6 text-center">
          <p>© {new Date().getFullYear()} Blog des Animaux. Tous droits réservés.</p>
        </div>
      </footer>
    );
  }