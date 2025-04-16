
import filmalogo from '../assets/filma.png'

function NavBar(){

    const buttoncss="px-4 mx-1 my-auto h-4/5 rounded-md text-indigo-100 font-light tracking-wider hover:text-indigo-950 transition-all b ease-out hover:px-6 hover:text-lg hover:backdrop-brightness-400 hover:font-black cursor-pointer"
    return (
        <div className="fixed top-5 z-2 flex w-19/20 h-12 left-1/2 transform -translate-x-1/2 rounded-xl bg-indigo-950/50 backdrop-blur-sm border-[2px] border-indigo-100/0 hover:border-indigo-100/100 transition-all">
            <p className="px-5 mx-1 my-auto h-4/5 rounded-md text-indigo-100 font-extrabold tracking-wider text-3xl"> FIL.MA </p>
            <button className={`${buttoncss}`}>✦︎ About</button>
            <button className={`${buttoncss}`}>➥ Films</button>
            <button className={`${buttoncss}`}>➥ Dicouvrir</button>
            <button className={`${buttoncss}`}>➥ Genres</button>
            <button className={`absolute right-1 top-1 ${buttoncss}`}>❯❯ Se Connecter</button>
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
