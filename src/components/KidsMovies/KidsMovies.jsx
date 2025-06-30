import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { useLocalFavorites } from "../LocalFavoritesContext/LocalFavoritesContext";
import { faCheck, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SearchContext } from "../../Context/SearchContext";

const KidsMovies = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
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

  const fetchMovies = (pageNumber) => {
    setLoading(true);
    fetch(
      `https://api.themoviedb.org/3/discover/movie?certification_country=US&certification.lte=G&with_genres=16&sort_by=popularity.desc&page=${pageNumber}`,
      options
    )
      .then((res) => res.json())
      .then((data) => {
        // دمج النتائج القديمة بالجديدة
        setMovies((prev) => [...prev, ...data.results]);
        setTotalPages(data.total_pages);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching kids movies", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchMovies(page);
  }, [page]);

  const handleLoadMore = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  return (

    <section className="px-4 md:px-16 py-10 bg-[#121212] min-h-screen text-white ">
      {searchTerm ? (
        <>
          <h2 className="text-2xl ms-3 font-semibold">
            Search Results for: <span className="text-purple-400">"{searchTerm}"</span>
          </h2>

          {isLoading ? (
            <p className="text-gray-300 mt-4">Loading...</p>
          ) : searchResults.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mt-10">
              {searchResults.map((item) =>
                item.poster_path ? (
                  <Link to={`/movie/${item.id}`} key={item.id}>
                    <div className="bg-white/5 p-2 rounded-xl hover:scale-105 transition duration-300">
                      <img
                        src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                        alt={item.title}
                        className="rounded-lg h-[180px] sm:h-[200px] md:h-[220px] lg:h-[240px] xl:h-[260px] object-cover mb-2 w-full"
                      />
                      <h3 className="text-sm font-semibold truncate">{item.title || item.name}</h3>
                      <p className="text-xs text-gray-400">{item.release_date?.slice(0, 4)}</p>
                    </div>
                  </Link>
                ) : null
              )}
            </div>
          ) : (
            <p className="text-gray-400 mt-6">No results found.</p>
          )}
        </>
      ) : (
        <>
          <h1 className="text-2xl sm:text-3xl font-semibold mt-20">Kids Movies</h1>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6 mt-10">
            {movies.map((movie) => (
              <div
                key={movie.id}
                className="bg-[#1e1e1e] relative rounded-xl p-3 sm:p-4 shadow hover:scale-[1.03] transition"
              >
                <Link to={`/movie/${movie.id}`}>
                  {movie.poster_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                      className="rounded-lg mb-3 w-full h-[160px] sm:h-[200px] md:h-[230px] lg:h-[250px] object-cover"
                    />
                  ) : (
                    <div className="h-[160px] sm:h-[200px] md:h-[230px] lg:h-[250px] bg-gray-600 rounded-lg mb-3 flex items-center justify-center">
                      No Image
                    </div>
                  )}
                </Link>

                <button
                  onClick={() => toggleFavorite(movie)}
                  className={`absolute top-3 left-3 z-10 border rounded-full w-7 h-7 flex items-center justify-center text-sm backdrop-blur-md transition
            ${isFavorite(movie.id)
                      ? "bg-purple-600 text-white border-purple-600 hover:bg-purple-700"
                      : "bg-white/10 text-white border-white/30 hover:bg-white/20"}`}
                >
                  <FontAwesomeIcon icon={isFavorite(movie.id) ? faCheck : faPlus} />
                </button>

                <h3 className="text-sm font-semibold truncate">
                  {movie.title.split(" ").slice(0, 4).join(" ")}
                  {movie.title.split(" ").length > 4 && "..."}
                </h3>

                <p className="text-gray-400 text-sm mt-1">⭐ {movie.vote_average?.toFixed(1)}</p>
              </div>
            ))}
          </div>

          {page < totalPages && (
            <div className="text-center mt-10">
              <button
                onClick={handleLoadMore}
                disabled={loading}
                className="bg-purple-900 hover:bg-purple-800 text-white px-6 py-3 rounded-full transition disabled:opacity-50"
              >
                {loading ? "Loading..." : "Load More"}
              </button>
            </div>
          )}
        </>
      )}
    </section>

  );
};

export default KidsMovies;
