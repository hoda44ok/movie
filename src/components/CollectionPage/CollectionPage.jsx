import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useLocalFavorites } from "../LocalFavoritesContext/LocalFavoritesContext";
import { useContext } from "react";
import { SearchContext } from "../../Context/SearchContext";

const CollectionPage = () => {
  const [type, setType] = useState("movie");
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const { toggleFavorite, isFavorite } = useLocalFavorites(); // ← استخدام الكونتكست
  const { searchTerm, searchResults, isLoading } = useContext(SearchContext);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjY2ZjY2U5Nzk1YTlhMWM2OTdkMjE2NzlkNjFjZDczYiIsIm5iZiI6MTc1MDkzNjgxOS4yMDgsInN1YiI6IjY4NWQyY2YzMzg1NmMzODY4NDRkMTAxYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xxTpJHPQUn0G3XkurXdjcLkG4wRsOKElSH8GL8zCm_U`

    },
  };

  const fetchCollections = () => {
    setLoading(true);

    const listId = type === "movie" ? 10 : 5;

    fetch(`https://api.themoviedb.org/3/list/${listId}?language=en-US`, options)
      .then((res) => res.json())
      .then((data) => {
        const items = data.items || [];
        if (items.length > 0) {
          setCollections(items);
          setHasMore(false); // Because TMDB list is static
        } else {
          setHasMore(false);
        }
      })
      .catch((err) => {
        console.error("Error fetching collections:", err);
        setHasMore(false);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    setCollections([]);
    setHasMore(true);
    fetchCollections();
  }, [type]);

  return (

    <section className="px-4 md:px-6 lg:px-12 py-10 min-h-screen bg-[#121212] text-white transition-colors duration-300">
      {searchTerm ? (
        <>
          <h2 className="text-2xl ms-2 md:ms-3 font-semibold">
            Search Results for: <span className="text-purple-400">"{searchTerm}"</span>
          </h2>

          {isLoading ? (
            <p className="text-gray-500 dark:text-gray-300 mt-6">Loading...</p>
          ) : searchResults.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mt-8">
              {searchResults.map(
                (item) =>
                  item.poster_path && (
                    <Link to={`/movie/${item.id}`} key={item.id}>
                      <div className="bg-white/5 p-2 rounded-xl hover:scale-105 transition duration-300">
                        <img
                          src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                          alt={item.title}
                          className="w-full h-[180px] sm:h-[220px] md:h-[250px] object-cover rounded-lg mb-2"
                        />

                        <h3 className="text-sm font-semibold truncate">{item.title || item.name}</h3>
                        <p className="text-xs text-gray-400">
                          {item.release_date?.slice(0, 4)}
                        </p>
                      </div>
                    </Link>

                  )
              )}
            </div>
          ) : (
            <p className="text-gray-400 mt-6">No results found.</p>
          )}
        </>
      ) : (
        <>
          {/* Header + Switch */}
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mt-20">
            <h2 className="text-2xl sm:text-3xl font-semibold">
              {type === "movie" ? "Movie Collections" : "Series Collections"}
            </h2>
            <div className="flex gap-2">
              <button
                onClick={() => setType("movie")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${type === "movie"
                    ? "bg-purple-800 text-white"
                    : "bg-zinc-800 text-gray-300 hover:bg-zinc-700"
                  }`}
              >
                Movies
              </button>
              <button
                onClick={() => setType("tv")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${type === "tv"
                    ? "bg-purple-800 text-white"
                    : "bg-zinc-800 text-gray-300 hover:bg-zinc-700"
                  }`}
              >
                Series
              </button>
            </div>
          </div>

          {/* Loader or Collections */}
          {loading ? (
            <p className="text-center text-white animate-pulse">Loading collections...</p>
          ) : collections.length === 0 ? (
            <p className="text-center text-gray-400">No collections found.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {collections.map(
                (item) =>
                  item.poster_path && (
                    <div
                      key={item.id}
                      className="bg-[#1f1f1f] relative rounded-xl overflow-hidden mt-5 shadow hover:scale-105 transition"
                    >
                      <Link to={type === "movie" ? `/movie/${item.id}` : `/series/${item.id}`}>
                        <img
                          src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                          alt={item.title || item.name}
                          className="w-full h-[180px] sm:h-[220px] md:h-[250px] object-cover"
                        />

                      </Link>
                      <button
                        onClick={() => toggleFavorite(item)}
                        className={`absolute top-3 left-3 z-10 border rounded-full w-7 h-7 flex items-center justify-center text-sm backdrop-blur-md transition
                      ${isFavorite(item.id)
                            ? "bg-purple-600 text-white border-purple-600 hover:bg-purple-700"
                            : "bg-white/20 text-white border-white/30 hover:bg-white/30"
                          }`}
                      >
                        <FontAwesomeIcon icon={isFavorite(item.id) ? faCheck : faPlus} />
                      </button>
                      <div className="p-3">
                        <h3 className="text-sm font-semibold truncate">{item.title || item.name}</h3>
                        <p className="text-xs text-gray-400">
                          {item.release_date?.slice(0, 4) || "Unknown Year"}
                        </p>
                      </div>
                    </div>
                  )
              )}
            </div>
          )}
        </>
      )}
    </section>

  );
};

export default CollectionPage;
