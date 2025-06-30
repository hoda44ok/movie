import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLocalFavorites } from "../LocalFavoritesContext/LocalFavoritesContext";
import { faCheck, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SearchContext } from "../../Context/SearchContext";

const TrendingPage = () => {
  const [mediaType, setMediaType] = useState("movie");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const { toggleFavorite, isFavorite } = useLocalFavorites(); // ← استخدام الكونتكست
  const { searchTerm, searchResults, isLoading } = useContext(SearchContext);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjY2ZjY2U5Nzk1YTlhMWM2OTdkMjE2NzlkNjFjZDczYiIsIm5iZiI6MTc1MDkzNjgxOS4yMDgsInN1YiI6IjY4NWQyY2YzMzg1NmMzODY4NDRkMTAxYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xxTpJHPQUn0G3XkurXdjcLkG4wRsOKElSH8GL8zCm_U`

    },
  };

  useEffect(() => {
    setLoading(true);
    fetch(
      `https://api.themoviedb.org/3/trending/${mediaType}/day?language=en-US`,
      options
    )
      .then((res) => res.json())
      .then((data) => setItems(data.results || []))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [mediaType]);

  const tabs = [
    { type: "all", label: " All" },
    { type: "movie", label: " Movies" },
    { type: "tv", label: " Series" },

  ];

  return (
    <section className="px-4 md:px-10 lg:px-16 py-14 bg-[#0e0e0e] text-white font-sans min-h-screen mt-20">
  {searchTerm ? (
    <>
      <h2 className="text-2xl font-semibold mb-4 ms-3">
        Search Results for: <span className="text-purple-400">"{searchTerm}"</span>
      </h2>

      {isLoading ? (
        <p className="text-gray-400 mt-10 text-center">Loading...</p>
      ) : searchResults.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 mt-8">
          {searchResults.map((item) =>
            item.poster_path ? (
              <Link to={`/movie/${item.id}`} key={item.id}>
                <div className="bg-[#1f1f1f] p-2 rounded-xl hover:scale-105 transition duration-300 shadow-lg">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                    alt={item.title}
                    className="rounded-lg h-[240px] object-cover w-full mb-2"
                  />
                  <h3 className="text-sm font-semibold truncate">{item.title || item.name}</h3>
                  <p className="text-xs text-gray-400">{item.release_date?.slice(0, 4)}</p>
                </div>
              </Link>
            ) : null
          )}
        </div>
      ) : (
        <p className="text-gray-400 text-center mt-10 text-lg">😢 No results found.</p>
      )}
    </>
  ) : (
    <>
      {/* Header + Tabs */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
        <h2 className="text-3xl font-semibold tracking-tight  bg-clip-text ">
           Trending Now
        </h2>

        <div className="flex flex-wrap gap-3">
          {tabs.map((tab) => (
            <button
              key={tab.type}
              onClick={() => setMediaType(tab.type)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all border ${
                mediaType === tab.type
                  ? "bg-gradient-to-r from-purple-600 to-pink-500 text-white border-none shadow-md"
                  : "bg-zinc-800 text-gray-300 border-zinc-600 hover:bg-zinc-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Loader or Trending Grid */}
      {loading ? (
        <div className="text-center text-gray-400">Loading trending content...</div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {items.map((item) => (
            <div
              key={item.id}
              className="group relative rounded-xl overflow-hidden bg-[#1a1a1a] hover:shadow-purple-800/40 transition duration-300"
            >
              {/* Poster */}
              <Link to={`/${item.media_type}/${item.id}`}>
                <img
                  src={
                    item.poster_path || item.profile_path
                      ? `https://image.tmdb.org/t/p/w500${item.poster_path || item.profile_path}`
                      : "https://via.placeholder.com/500x750?text=No+Image"
                  }
                  alt={item.title || item.name}
                  className="w-full h-[300px] object-cover transform group-hover:scale-105 transition duration-500"
                />
              </Link>

              {/* Favorite Button */}
              <button
                onClick={() => toggleFavorite(item)}
                className={`absolute top-3 left-3 z-10 w-8 h-8 flex items-center justify-center rounded-full text-white backdrop-blur-md border transition ${
                  isFavorite(item.id)
                    ? "bg-purple-600 border-purple-600 hover:bg-purple-700"
                    : "bg-white/10 border-white/30 hover:bg-white/20"
                }`}
              >
                <FontAwesomeIcon icon={isFavorite(item.id) ? faCheck : faPlus} size="sm" />
              </button>

              {/* Info Overlay */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent px-4 py-3">
                <h3 className="text-sm font-semibold truncate">
                  {item.title || item.name}
                </h3>
                {mediaType !== "person" && (
                  <p className="text-xs text-gray-300 mt-1">
                    ⭐ {item.vote_average?.toFixed(1)} / 10
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )}
</section>

  );

};

export default TrendingPage;
