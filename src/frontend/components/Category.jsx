import { useState } from 'react'
import '../App.css'
import Button from '@mui/material/Button';

const Category = () => {
  const [movie, setMovie] = useState<Movie | undefined>(undefined);
  const [muted, setMuted] = useState(true);
  const similarContent = getPopularContent();

  useEffect(() => {
    if (id) {
      const foundMovie = getMovieById(id);
      setMovie(foundMovie);
    }
  }, [id]);

  if (!movie) {
    return (
      <div className="min-h-screen bg-netflix-black flex items-center justify-center">
        <div className="text-white">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-netflix-black text-white">
      <Navbar />
      
      <div className="relative pt-16">
        <div className="relative h-[70vh] w-full">
          <div className="absolute inset-0 overflow-hidden">
            <img 
              src={movie.backdropUrl} 
              alt={movie.title} 
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 hero-overlay"></div>
            <div className="absolute inset-0 bottom-fade"></div>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 z-10">
            {movie.logoUrl ? (
              <img src={movie.logoUrl} alt={movie.title} className="w-[70%] max-w-[400px] mb-6" />
            ) : (
              <h1 className="text-4xl md:text-6xl font-bold mb-4">{movie.title}</h1>
            )}
            
            <div className="flex flex-wrap gap-3 mb-4">
              <span className="text-green-500">{movie.rating}% Match</span>
              <span>{movie.year}</span>
              <span>{movie.duration}</span>
              <span className="border border-gray-600 px-1 text-xs">HD</span>
            </div>
            
            <div className="flex space-x-3 mb-6">
              <Link to={`/watch/${movie.id}`}>
                <Button variant="default" size="lg" className="bg-white text-black hover:bg-white/90">
                  <Play className="mr-2 h-5 w-5" /> Lecture
                </Button>
              </Link>
              <Button variant="outline" size="icon" className="rounded-full h-10 w-10 border-white/40">
                <Plus className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full h-10 w-10 border-white/40">
                <ThumbsUp className="h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-full h-10 w-10 border-white/40 ml-auto"
                onClick={() => setMuted(!muted)}
              >
                {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <p className="text-white/90 text-sm md:text-base">
                  {movie.description}
                </p>
              </div>
              <div>
                <div className="text-sm space-y-2">
                  <p><span className="text-gray-400">Genres:</span> {movie.genre}</p>
                  <p><span className="text-gray-400">Type:</span> {movie.type === 'movie' ? 'Film' : 'Série'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="px-4 md:px-12 py-8">
          <ContentRow title="Contenu similaire" movies={similarContent} />
        </div>
      </div>
    </div>
  );
};

export default Category;