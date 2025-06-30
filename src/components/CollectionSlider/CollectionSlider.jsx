import { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useLocalFavorites } from "../LocalFavoritesContext/LocalFavoritesContext";

const CollectionSlider = () => {
  const [type, setType] = useState("movie");
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toggleFavorite, isFavorite } = useLocalFavorites(); // ← استخدام الكونتكست


const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1536 },
    items: 6,
  },
  desktop: {
    breakpoint: { max: 1535, min: 1024 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1023, min: 768 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 767, min: 0 },
    items: 2,
  },
};


  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
       Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjY2ZjY2U5Nzk1YTlhMWM2OTdkMjE2NzlkNjFjZDczYiIsIm5iZiI6MTc1MDkzNjgxOS4yMDgsInN1YiI6IjY4NWQyY2YzMzg1NmMzODY4NDRkMTAxYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xxTpJHPQUn0G3XkurXdjcLkG4wRsOKElSH8GL8zCm_U`

    },
  };

  const listId = type === "movie" ? 10 : 5;

  useEffect(() => {
    setLoading(true);
    fetch(`https://api.themoviedb.org/3/list/${listId}?language=en-US`, options)
      .then((res) => res.json())
      .then((data) => {
        setCollections(data.items || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching collections:", err);
        setLoading(false);
      });
  }, [type]);

  return (
  
    <section className="px-4 md:px-10 py-10">
  {/* Header + Switch */}
  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
    <h2 className="text-white text-2xl sm:text-3xl font-semibold">
      {type === "movie" ? " Movie Collections" : " Series Collections"}
    </h2>
    <div className="flex gap-2">
      <button
        onClick={() => setType("movie")}
        className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
          type === "movie"
            ? "bg-purple-800 text-white"
            : "bg-[#2b2b2b] text-gray-300 hover:bg-[#3a3a3a]"
        }`}
      >
        Movies
      </button>
      <button
        onClick={() => setType("tv")}
        className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
          type === "tv"
            ? "bg-purple-800 text-white"
            : "bg-[#2b2b2b] text-gray-300 hover:bg-[#3a3a3a]"
        }`}
      >
        Series
      </button>
    </div>
  </div>

  {/* Loader */}
  {loading ? (
    <p className="text-white text-center animate-pulse">Loading collections...</p>
  ) : collections.length === 0 ? (
    <p className="text-gray-400 text-center">No collections found.</p>
  ) : (
    <Carousel
      responsive={responsive}
      infinite
      autoPlay
      autoPlaySpeed={3500}
      draggable
      swipeable
    >
      {collections.map((item) =>
        item.poster_path ? (
          <div
            key={item.id}
            className="relative mx-2 group overflow-hidden rounded-2xl shadow-lg bg-[#1a1a1a] hover:shadow-xl"
          >
            <Link to={type === "movie" ? `/movie/${item.id}` : `/series/${item.id}`}>
            <img
  src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
  alt={item.title || item.name}
  className="w-full h-[220px] sm:h-[260px] md:h-[300px] lg:h-[320px] object-cover rounded-2xl group-hover:brightness-75 transition duration-300"
/>

            </Link>
            <button
              onClick={() => toggleFavorite(item)}
              className={`absolute top-3 left-3 z-10 border rounded-full w-7 h-7 flex items-center justify-center text-sm backdrop-blur-md transition
              ${
                isFavorite(item.id)
                  ? "bg-purple-600 text-white border-purple-600 hover:bg-purple-700"
                  : "bg-white/10 text-white border-white/30 hover:bg-white/20"
              }`}
            >
              <FontAwesomeIcon icon={isFavorite(item.id) ? faCheck : faPlus} />
            </button>
            <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-3 backdrop-blur-md">
              <h3 className="text-sm sm:text-base font-semibold truncate">
                {item.title || item.name}
              </h3>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                {item.release_date?.slice(0, 4) || "Unknown Year"}
              </p>
            </div>
          </div>
        ) : null
      )}
    </Carousel>
  )}
</section>

  );
};

export default CollectionSlider;
