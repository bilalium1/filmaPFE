
import { Mail, Phone, Facebook, Twitter, Instagram } from "lucide-react";

const Footer = () => (
  <footer className="w-full bg-rose-950/50 text-white pt-10 pb-6 px-4 mt-16 border-t border-gray-700">
    <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-10 md:gap-6">
      {/* Branding & Description */}
      <div className="flex flex-col items-start md:items-start gap-3">
        {/* Logo Placeholder */}
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xl font-bold tracking-wide">⚝ FIL.MA</span>
        </div>
        <p className="text-sm text-gray-400 max-w-xs">
          FIL.MA – Votre plateforme de streaming de films et séries, accessible partout et à tout moment.
        </p>
      </div>
      {/* Contact Info */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Contact</h3>
        <div className="flex items-center gap-2 mb-1">
          <Mail className="w-4 h-4" aria-hidden="true" />
          <a
            href="mailto:contact@fil.ma"
            className="hover:underline focus:underline outline-none transition-colors"
            tabIndex={0}
          >
            lemrabetbilal90@gmail.com
          </a>
        </div>
        <div className="flex items-center gap-2">
          <Phone className="w-4 h-4" aria-hidden="true" />
          <span>06 84 01 15 18</span>
        </div>
      </div>
      {/* Social Media */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Suivez-nous</h3>
        <nav aria-label="Réseaux sociaux">
          <ul className="flex gap-4">
            <li>
              <a
                href="https://x.com/Bilalium_"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="group focus:outline-none"
              >
                <Twitter className="w-6 h-6 group-hover:text-blue-400 group-focus:text-blue-400 transition-colors" />
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/bilalium/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="group focus:outline-none"
              >
                <Instagram className="w-6 h-6 group-hover:text-pink-500 group-focus:text-pink-500 transition-colors" />
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
    <div className="text-center text-xs text-gray-500 mt-8">
      &copy; {new Date().getFullYear()} <span className="font-semibold">FIL.MA</span>. Tous droits réservés.
    </div>
  </footer>
);

export default Footer;
