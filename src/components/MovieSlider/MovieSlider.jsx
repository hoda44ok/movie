import { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPlus } from "@fortawesome/free-solid-svg-icons";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { Link } from "react-router-dom";
import { useLocalFavorites } from "../LocalFavoritesContext/LocalFavoritesContext";

const MovieSlider = () => {
  const [selectedGenreId, setSelectedGenreId] = useState(null);
  const [genres, setGenres] = useState([]);
  const [allMovies, setAllMovies] = useState([]);
  const [genreMovies, setGenreMovies] = useState([]);
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start', draggable: true });
  const { toggleFavorite, isFavorite } = useLocalFavorites(); // ← استخدام الكونتكست

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
       Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjY2ZjY2U5Nzk1YTlhMWM2OTdkMjE2NzlkNjFjZDczYiIsIm5iZiI6MTc1MDkzNjgxOS4yMDgsInN1YiI6IjY4NWQyY2YzMzg1NmMzODY4NDRkMTAxYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xxTpJHPQUn0G3XkurXdjcLkG4wRsOKElSH8GL8zCm_U`

    },
  };

  // Fetch genres
  useEffect(() => {
    fetch("https://api.themoviedb.org/3/genre/movie/list?language=en", options)
      .then((res) => res.json())
      .then((data) => setGenres(data.genres || []));
  }, []);

  // Fetch all movies on load
  useEffect(() => {
    fetch("https://api.themoviedb.org/3/discover/movie?language=en-US&page=1", options)
      .then((res) => res.json())
      .then((data) => setAllMovies(data.results || []));
    console.log()
  }, []);

  // Fetch movies for selected genre
  useEffect(() => {
    if (selectedGenreId) {
      fetch(
        `https://api.themoviedb.org/3/discover/movie?with_genres=${selectedGenreId}&language=en-US&page=1`,
        options
      )
        .then((res) => res.json())
        .then((data) => setGenreMovies(data.results || []));
    }
  }, [selectedGenreId]);

  const responsive = {
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 5 },
    tablet: { breakpoint: { max: 1024, min: 768 }, items: 3 },
    mobile: { breakpoint: { max: 768, min: 0 }, items: 2 },
  };

  return (

    <section className="px-4 md:px-10 py-6 mt-5">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-3 gap-3 md:gap-0">
        <h2 className="text-white text-2xl font-semibold">
          {selectedGenreId ? "Movies by Genre" : "All Movies"}
        </h2>

        {selectedGenreId ? (
          <button
            onClick={() => setSelectedGenreId(null)}
            className="text-purple-400 hover:underline text-sm"
          >
            ← Back to All Movies
          </button>
        ) : (
          <Link to="/movies" className="text-purple-400 hover:underline text-sm">
            See All →
          </Link>
        )}
      </div>

      {/* Genre Buttons Slider */}
      <div className="flex items-center mb-6 space-x-2">
        <button
          onClick={() => emblaApi?.scrollPrev()}
          className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-full"
          aria-label="Scroll genres left"
        >
          <ChevronLeft size={20} />
        </button>

        <div className="overflow-hidden flex-1" ref={emblaRef}>
          <div className="flex space-x-4">
            {genres.map((genre) => (
              <button
                key={genre.id}
                onClick={() => setSelectedGenreId(genre.id)}
                className={`px-4 py-2 text-sm font-medium whitespace-nowrap transition-all duration-200 focus:outline-none 
              ${selectedGenreId === genre.id
                    ? "bg-purple-800 text-white rounded-[30px]"
                    : "bg-transparent border border-[#81787d] rounded-[30px] hover:bg-slate-950 hover:border-white"
                  }`}
              >
                {genre.name}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => emblaApi?.scrollNext()}
          className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-full"
          aria-label="Scroll genres right"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Movie Carousel */}
      <Carousel
        responsive={responsive}
        infinite
        autoPlay
        autoPlaySpeed={3500}
        draggable
        swipeable
        containerClass="pb-6" // لإضافة padding أسفل الكاروسيل
      >
        {(selectedGenreId ? genreMovies : allMovies).map((movie) =>
          movie.poster_path ? (
            <div
              key={movie.id}
              className="relative mx-2 group overflow-hidden rounded-2xl shadow-lg"
            >
              <Link to={`/movie/${movie.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-[280px] md:h-[320px] object-cover rounded-2xl group-hover:brightness-75 transition duration-300"
                />
              </Link>
              <button
                onClick={() => toggleFavorite(movie)}
                className={`absolute top-3 left-3 z-10 border rounded-full w-7 h-7 flex items-center justify-center text-sm backdrop-blur-md transition
              ${isFavorite(movie.id)
                    ? "bg-purple-600 text-white border-purple-600 hover:bg-purple-700"
                    : "bg-white/10 text-white border-white/30 hover:bg-white/20"
                  }`}
              >
                <FontAwesomeIcon icon={isFavorite(movie.id) ? faCheck : faPlus} />
              </button>
              <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-3 backdrop-blur-md">
                <h3 className="text-white text-sm font-semibold truncate">
                  {movie.title}
                </h3>
                <p className="text-gray-300 text-xs mt-1">
                  ⭐ {movie.vote_average?.toFixed(1)} / 10
                </p>
                <p className="text-gray-400 text-[11px]">
                  {movie.release_date?.slice(0, 4) || "Unknown"}
                </p>
              </div>
            </div>
          ) : null
        )}
      </Carousel>
    </section>

  );
};

export default MovieSlider;
