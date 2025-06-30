import { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCheck } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useLocalFavorites } from "../LocalFavoritesContext/LocalFavoritesContext";

const TrendsSlider = () => {
  const [movies, setMovies] = useState([]);
  const { toggleFavorite, isFavorite } = useLocalFavorites(); // ← استخدام الكونتكست

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
       Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjY2ZjY2U5Nzk1YTlhMWM2OTdkMjE2NzlkNjFjZDczYiIsIm5iZiI6MTc1MDkzNjgxOS4yMDgsInN1YiI6IjY4NWQyY2YzMzg1NmMzODY4NDRkMTAxYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xxTpJHPQUn0G3XkurXdjcLkG4wRsOKElSH8GL8zCm_U`

    },
  };

  useEffect(() => {
    fetch('https://api.themoviedb.org/3/trending/all/day?language=en-US', options)
      .then(res => res.json())
      .then(data => {
        setMovies(data.results || []);
      })
      .catch(err => console.error(err));
  }, []);

  // const responsive = {
  //   desktop: { breakpoint: { max: 3000, min: 1024 }, items: 5 },
  //   tablet: { breakpoint: { max: 1024, min: 768 }, items: 3 },
  //   mobile: { breakpoint: { max: 768, min: 0 }, items: 2 },
  // };

  return (

    <section className="px-4 md:px-10 py-6 mt-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold ps-4 text-white"> Trending Now</h2>
        <Link to="/trending" className="text-purple-400 hover:underline text-sm">
          See All →
        </Link>
      </div>

      <Carousel
        responsive={{
          desktop: { breakpoint: { max: 3000, min: 1024 }, items: 5 },
          tablet: { breakpoint: { max: 1024, min: 768 }, items: 3 },
          mobile: { breakpoint: { max: 768, min: 0 }, items: 2 },
        }}
        infinite
        autoPlay
        autoPlaySpeed={3500}
        draggable
        swipeable
        className="gap-6"
      >
        {movies.map((movie) => (
          <div key={movie.id} className="relative mx-2 group overflow-hidden rounded-2xl shadow-lg">
            <Link to={`/${movie.media_type}/${movie.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title || movie.name}
                className="w-full h-[320px] object-cover rounded-2xl group-hover:brightness-75 transition duration-300"
              />
            </Link>

            {/* + Button */}
            <button
              onClick={() => toggleFavorite(movie)}
              className={`absolute top-3 left-3 z-10 border rounded-full w-7 h-7 flex items-center justify-center text-sm backdrop-blur-md transition
            ${isFavorite(movie.id)
                  ? "bg-purple-600 text-white border-purple-600 hover:bg-purple-700"
                  : "bg-white/10 text-white border-white/30 hover:bg-white/20"}`}
            >
              <FontAwesomeIcon icon={isFavorite(movie.id) ? faCheck : faPlus} />
            </button>

            {/* Info Box */}
            <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-3 backdrop-blur-md">
              <h3 className="text-white text-sm font-semibold truncate">
                {movie.title || movie.name}
              </h3>
              <p className="text-gray-300 text-xs mt-1">
                ⭐ {movie.vote_average?.toFixed(1)} / 10
              </p>
            </div>
          </div>
        ))}
      </Carousel>
    </section>

  );
};

export default TrendsSlider;

