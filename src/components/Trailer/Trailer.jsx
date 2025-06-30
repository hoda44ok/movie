import { useEffect, useState, useRef } from "react";
import { Volume2, VolumeX, Pause, Play } from "lucide-react";
import { Link } from "react-router-dom";

const Trailer = () => {
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [trailerKey, setTrailerKey] = useState(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const iframeRef = useRef(null);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
       Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjY2ZjY2U5Nzk1YTlhMWM2OTdkMjE2NzlkNjFjZDczYiIsIm5iZiI6MTc1MDkzNjgxOS4yMDgsInN1YiI6IjY4NWQyY2YzMzg1NmMzODY4NDRkMTAxYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xxTpJHPQUn0G3XkurXdjcLkG4wRsOKElSH8GL8zCm_U`

    },
  };

  useEffect(() => {
    fetch("https://api.themoviedb.org/3/trending/movie/day?language=en-US", options)
      .then((res) => res.json())
      .then((data) => {
        const topMovies = data.results.slice(0, 5);
        setMovies(topMovies);
      });
  }, []);

  useEffect(() => {
    if (movies.length > 0) {
      const currentMovie = movies[currentIndex];
      fetch(`https://api.themoviedb.org/3/movie/${currentMovie.id}/videos?language=en-US`, options)
        .then((res) => res.json())
        .then((data) => {
          const trailer = data.results.find(
            (vid) => vid.type === "Trailer" && vid.site === "YouTube"
          );
          if (trailer) setTrailerKey(trailer.key);
        });
    }
  }, [currentIndex, movies]);

  // Control YouTube via postMessage
  const sendCommandToIframe = (func) => {
    const iframe = iframeRef.current;
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.postMessage(
        JSON.stringify({ event: "command", func, args: [] }),
        "*"
      );
    }
  };

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
    sendCommandToIframe(isMuted ? "unMute" : "mute");
  };

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
    sendCommandToIframe(isPlaying ? "pauseVideo" : "playVideo");
  };

  return (

    <section className="relative w-full h-[100vh] overflow-hidden text-white">
      {/* 🎬 Video Background */}
      <div className="absolute inset-0 z-0">
        {trailerKey && (
          <iframe
            ref={iframeRef}
            className="w-full h-full object-cover"
            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1&controls=0&enablejsapi=1&rel=0&modestbranding=1&playsinline=1`}
            title="Movie Trailer"
            allow="autoplay; fullscreen"
            allowFullScreen
          />
        )}
        <div className="absolute inset-0 bg-black/25 backdrop-blur-[2px]" />
      </div>

      {/* 📝 Trailer Info */}
      <div className="relative z-10 px-6 md:px-20 pt-60 max-w-3xl">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-pink-500">
          {movies[currentIndex]?.title}
        </h1>
        <p className="text-gray-300 mt-4 mb-6 text-sm md:text-lg line-clamp-4">
          {movies[currentIndex]?.overview}
        </p>

        {/* 🎬 Action Buttons */}
        <div className="flex gap-4">
          <Link to={`/watch/${movies[currentIndex]?.id}`}>
            <button className="bg-purple-800 hover:bg-purple-700 text-white px-5 py-2 rounded-full font-medium transition">
              Watch Now
            </button>
          </Link>
        </div>
      </div>

      {/* 🎛️ Controls */}
      <div className="absolute top-24 right-6 z-20 flex gap-4">
        <button
          onClick={toggleMute}
          className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition"
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
        <button
          onClick={togglePlay}
          className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition"
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>
      </div>

      {/* 🖼️ Thumbnails */}
      <div className="absolute bottom-8 right-10 z-10 flex gap-3 overflow-x-auto max-w-full pb-2">
        {movies.map((m, i) => (
          <img
            key={m.id}
            src={`https://image.tmdb.org/t/p/w200${m.poster_path}`}
            alt={m.title}
            className={`w-16 h-24 rounded-lg object-cover border-2 transition cursor-pointer ${i === currentIndex
                ? "border-blue-400 scale-105"
                : "border-white/20"
              }`}
            onClick={() => setCurrentIndex(i)}
          />
        ))}
      </div>
    </section>
  );
};

export default Trailer;
