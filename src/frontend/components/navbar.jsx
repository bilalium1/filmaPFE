
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);

      }

      
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 px-4 md:px-12 py-3 ${
      isScrolled ? "bg-netflix-black" : "bg-gradient-to-b from-[rgba(0,0,0,0.7)] to-transparent"
    }`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
        <Link to="/" className="text-netflix-red text-2xl font-bold">
            Fil.ma
          </Link>
         
          <div className="hidden md:flex space-x-4">
            <Link to="/" className="text-white hover:text-gray-300 transition">Accueil</Link>
            <Link to="/series" className="text-white hover:text-gray-300 transition">Séries</Link>
            <Link to="/films" className="text-white hover:text-gray-300 transition">Films</Link>
            <Link to="/ma-liste" className="text-white hover:text-gray-300 transition">Ma Liste</Link>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            {showSearch ? (
              <div className="flex items-center bg-[rgba(0,0,0,0.75)] border border-gray-600 rounded-sm overflow-hidden">
                <Input 
                  type="text" 
                  placeholder="Titres, personnes, genres" 
                  className="bg-transparent border-0 text-white w-40 md:w-64 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setShowSearch(false)}
                  className="text-white hover:text-gray-300">
                  <Search className="h-5 w-5" />
                </Button>
              </div>
            ) : (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setShowSearch(true)}
                className="text-white hover:text-gray-300">
                <Search className="h-5 w-5" />
              </Button>
            )}
          </div>
          
          <Button variant="ghost" size="icon" className="text-white hover:text-gray-300">
            <Bell className="h-5 w-5" />
          </Button>
          
          <div className="relative group">
            <Button variant="ghost" size="icon" className="overflow-hidden rounded-sm">
              <User className="h-5 w-5 text-white" />
            </Button>
            <div className="absolute right-0 mt-2 w-48 bg-netflix-dark shadow-lg hidden group-hover:block rounded-sm border border-gray-700">
              <div className="py-2">
                <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800">Profil</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800">Paramètres</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800">Se déconnecter</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
