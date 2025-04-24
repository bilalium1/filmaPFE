import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Tete({ medias: originalMedias }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward
    const [sauve, setSauve] = useState(false);
    const [desc, setDesc] = useState(false);
    const navigate = useNavigate();

    // Filter medias
    const medias = originalMedias
        ?.filter(media => media.vote_average > 7.5)
        ?.filter(media => media.adult === false)
        ?.filter(media => media.original_language === "en")
        ?.filter(media => !media.genre_ids?.includes(10751))
        ?.filter(media => !media.genre_ids?.includes(10762))
        ?.filter(media => !media.genre_ids?.includes(10763))
        ?.filter(media => !media.genre_ids?.includes(10764))
        ?.filter(media => !media.genre_ids?.includes(10766))
        ?.filter(media => !media.genre_ids?.includes(10767))
        ?.filter(media => !media.genre_ids?.includes(10768))
        ?.filter(media => !media.genre_ids?.includes(10749))
        ?.filter(media => !media.genre_ids?.includes(35)) || [];

    // Auto-cycling effect with directional awareness
    useEffect(() => {
        if (medias.length <= 1) return;

        const interval = setInterval(() => {
            setDirection(1);
            setCurrentIndex((prev) => (prev + 1) % medias.length);
        }, 6000);

        return () => clearInterval(interval);
    }, [medias.length]);

    const navigateTo = (newIndex) => {
        const newDirection = newIndex > currentIndex ? 1 : -1;
        setDirection(newDirection);
        setCurrentIndex(newIndex);
    };

    const goToNext = () => navigateTo((currentIndex + 1) % medias.length);
    const goToPrev = () => navigateTo((currentIndex - 1 + medias.length) % medias.length);

    if (!medias || medias.length === 0) {
        return (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="relative flex w-full h-[40vw] mt-15 bg-gray-800/50"
            >
                <p className="m-auto text-white">Loading featured content...</p>
            </motion.div>
        );
    }

    const media = medias[currentIndex];

    return (
        <div className="relative flex w-full h-[45vw] mt-20 group">
            {/* Background Blur */}
            <motion.img 
                src={`https://image.tmdb.org/t/p/original/${media?.backdrop_path}`} 
                className="absolute -top-10 inset-x-0 blur-[50px] size-[200%] object-cover saturate-80 -z-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                key={`bg-${media.id}`}
            />

            {/* Navigation Arrows */}
            <motion.button 
                onClick={goToPrev}
                className="absolute left-10 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/80 rounded-lg p-2 opacity-0 group-hover:opacity-100 backdrop-blur-sm transition-all duration-100"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </motion.button>

            <motion.button 
                onClick={goToNext}
                className="absolute right-10 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/80 rounded-lg p-2 opacity-0 group-hover:opacity-100 backdrop-blur-sm transition-all duration-100"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </motion.button>

            {/* Main Content with Animation */}
            <AnimatePresence mode="popLayout" initial={false} custom={direction}>
                <motion.div
                    key={media.id}
                    custom={direction}
                    initial={{ opacity: 0, x: direction * 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: direction * -100 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="relative mx-auto flex w-95/100 h-full border-t-[2px] border-stone-100/50 rounded-md overflow-hidden [box-shadow:0px_5px_10px_0px_rgba(0,0,0,0.5)]"
                >
                    {/* Main Image with Ken Burns effect */}
                    <motion.img 
                        src={`https://image.tmdb.org/t/p/original/${media?.backdrop_path}`}
                        className="absolute w-full h-full object-cover"
                        initial={{ scale: 1.5 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 3, ease: [0.16, 1, 0.3, 1] }}
                        alt={media?.title || media?.name}
                    />

                    {/* Overlay */}
                    <div className="absolute w-full h-full bg-white/10 z-2 pointer-events-none [box-shadow:inset_0px_0px_100px_0px_rgba(0,0,0,0.5)]" />

                    {/* Title Section */}
                    <motion.div 
                        className="absolute inline-flex gap-3 top-3 w-full h-20"
                        initial={{ y: -50 }}
                        animate={{ y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <p className='relative p-1.50 tracking-[1px] text-4xl lg:text-6xl bg-stone-950/50 [box-shadow:0px_10px_20px_0px_rgba(0,0,0,0.3)] lg:px-4 px-2 text-left w-auto max-w-190 lg:h-10 h-6 lg:rounded-lg rounded-sm backdrop-blur-lg text-white z-3 font-chakra font-bold uppercase left-3'>
                            {media?.title || media?.name}
                        </p>
                        <p className='relative lg:p-1.5 p-1 tracking-wide text-xs lg:text-lg bg-stone-950/50 lg:px-4 px-2 text-left w-auto lg:h-10 h-6 lg:rounded-lg rounded-sm backdrop-blur-lg text-white z-3 font-light uppercase left-3'>
                            ▧ {media?.media_type}
                        </p>
                        <p className='relative lg:p-1.5 p-1 tracking-wide text-xs lg:text-lg bg-amber-300/50 lg:px-4 px-2 text-left w-auto lg:h-10 h-6 slg:rounded-lg rounded-sm backdrop-blur-lg text-white z-3 font-light uppercase left-3'>
                            {`★ ${media?.vote_average?.toFixed(1)}`}
                        </p>
                        <p className={`absolute ${sauve ? "opacity-100" : "opacity-0"} lg:p-1.5 p-1 tracking-wide text-xs lg:text-lg bg-pink-400/80 lg:px-4 px-2 text-left w-auto lg:h-10 h-6 lg:rounded-lg rounded-sm backdrop-blur-lg text-white z-3 font-light uppercase right-3 transition-all`}>
                            Favorite
                        </p>
                    </motion.div>

                    {/* Bottom Buttons */}
                    <motion.div
                        className="absolute bottom-3 right-3 flex gap-2"
                        initial={{ y: 50 }}
                        animate={{ y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <button 
                            onClick={() => navigate(`/${media.media_type}s/${media.id}${media.media_type==="film" ? "" : "/1/1"}`)} 
                            className='lg:right-16 right-10 bg-stone-950/50 lg:w-50 w-30 backdrop-blur-lg lg:h-10 h-6 lg:rounded-lg rounded-sm cursor-pointer text-stone-100 lg:text-md text-xs p-1 font-bold hover:bg-stone-200 hover:text-stone-800 transition-all'
                        >
                            ►
                        </button>
                        <button 
                            onClick={() => setSauve(!sauve)} 
                            className={`${sauve ? "bg-pink-600/50" : "bg-pink-500"} lg:w-10 w-6 backdrop-blur-lg lg:h-10 h-6 lg:rounded-lg rounded-sm cursor-pointer text-stone-100 lg:text-md text-xs p-1 font-bold hover:bg-pink-500 active:bottom-2 hover:text-stone-800 transition-all`}
                        >
                            {sauve ? "✖" : "❤"}
                        </button>
                    </motion.div>

                    {/* Description Panel */}
                    <motion.button 
                        onClick={() => setDesc(!desc)}
                        className={`absolute ${desc ? "-rotate-180" : "rotate-0"} left-3 bottom-3 lg:w-10 w-6 lg:h-10 h-6 bg-stone-950/50 backdrop-blur-lg lg:rounded-lg rounded-sm transition-all duration-500 lg:text-xl text-m cursor-pointer`}
                        whileTap={{ scale: 0.9 }}
                    >
                        ◥
                    </motion.button>

                    <motion.div 
                        className={`absolute pointer-events-none ${desc ? "lg:bottom-16 bottom-10 opacity-100" : "opacity-0 bottom-5"} left-3 lg:w-70 w-40 xl:h-72 lg:h-50 h-20 bg-stone-950/50 backdrop-blur-lg lg:rounded-lg rounded-sm transition-all duration-500 cursor-pointer`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: desc ? 1 : 0, y: desc ? 0 : 20 }}
                    >
                        <p className='lg:p-5 p-1 text-left lg:text-lg text-[6px]'>
                            ✸ {media?.overview}
                        </p>
                        <p className='lg:p-5 p-1 text-left lg:text-lg text-[6px]'>
                            Action ✖ Sci-fi ✖ Fantastique
                        </p>
                    </motion.div>
                </motion.div>
            </AnimatePresence>

            {/* Dot Navigation */}
            {medias.length > 1 && (
                <motion.div 
                    className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    {medias.map((_, index) => (
                        <motion.button
                            key={index}
                            onClick={() => navigateTo(index)}
                            className={`w-3 h-3 rounded-full transition-all ${index === currentIndex ? 'bg-white' : 'bg-white/50 hover:bg-white/80'}`}
                            whileHover={{ scale: 1.2 }}
                            animate={{
                                width: index === currentIndex ? 24 : 12
                            }}
                        />
                    ))}
                </motion.div>
            )}
        </div>
    );
}

export default Tete;