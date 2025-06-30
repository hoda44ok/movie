import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLocalFavorites } from "../LocalFavoritesContext/LocalFavoritesContext";
import { faCheck, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SearchContext } from "../../Context/SearchContext";
import { useLocation } from "react-router-dom";

const SeriesPage = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [genres, setGenres] = useState([]);
  const [selectedGenreId, setSelectedGenreId] = useState(null);
  const { toggleFavorite, isFavorite } = useLocalFavorites(); // ← استخدام الكونتكست
  const { searchTerm, searchResults, isLoading } = useContext(SearchContext);
  const location = useLocation(); // 👈 يحدد الصفحة الحالية

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
       Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjY2ZjY2U5Nzk1YTlhMWM2OTdkMjE2NzlkNjFjZDczYiIsIm5iZiI6MTc1MDkzNjgxOS4yMDgsInN1YiI6IjY4NWQyY2YzMzg1NmMzODY4NDRkMTAxYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xxTpJHPQUn0G3XkurXdjcLkG4wRsOKElSH8GL8zCm_U`

    },
  };

  const fetchGenres = () => {
    fetch("https://api.themoviedb.org/3/genre/tv/list?language=en", options)
      .then((res) => res.json())
      .then((data) => setGenres(data.genres || []));
  };

  const fetchSeries = () => {
    setLoading(true);
    const genreQuery = selectedGenreId ? `&with_genres=${selectedGenreId}` : "";
    fetch(
      `https://api.themoviedb.org/3/discover/tv?language=en-US&page=${page}${genreQuery}`,
      options
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.results?.length > 0) {
          setMovies((prev) => [...prev, ...data.results]);
          setPage((prev) => prev + 1);
          if (page >= data.total_pages) setHasMore(false);
        } else {
          setHasMore(false);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchGenres();
    fetchSeries();
  }, []);

  // Reload movies when genre is changed
  useEffect(() => {
    if (selectedGenreId !== null) {
      setMovies([]);
      setPage(1);
      setHasMore(true);
      setTimeout(() => {
        fetchSeries();
      }, 100);
    }
  }, [selectedGenreId]);

  return (

    <section className="px-4 md:px-12 py-10 min-h-screen bg-[#121212] text-white ">
      <div className="max-w-7xl mx-auto">
        {searchTerm && location.pathname === "/series" ? (
          <>
            <h2 className="text-2xl ms-3 font-semibold">
              Search Results for: <span className="text-purple-400">"{searchTerm}"</span>
            </h2>

            {isLoading ? (
              <p className="text-gray-300 mt-4">Loading...</p>
            ) : searchResults.length > 0 ? (
              <div className="grid gap-4 mt-10 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                {searchResults.map((item) =>
                  item.poster_path ? (
                    <Link to={`/movie/${item.id}`} key={item.id}>
                      <div className="bg-white/5 p-2 rounded-xl hover:scale-105 transition duration-300">
                        <img
                          src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                          alt={item.title}
                          className="rounded-lg h-[250px] object-cover mb-2 w-full"
                        />
                        <h3 className="text-sm font-semibold truncate">
                          {item.title || item.name}
                        </h3>
                        <p className="text-xs text-gray-400">
                          {item.release_date?.slice(0, 4)}
                        </p>
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
            <h1 className="text-3xl font-semibold mt-20">Series</h1>

            {/* Genre Filter */}
            <div className="flex flex-wrap gap-3 mb-8 mt-10">
              <button
                onClick={() => setSelectedGenreId(null)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedGenreId === null
                    ? "bg-purple-800 text-white"
                    : "bg-zinc-800 text-gray-300 hover:bg-zinc-600"
                  }`}
              >
                All
              </button>

              {genres.map((genre) => (
                <button
                  key={genre.id}
                  onClick={() => setSelectedGenreId(genre.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedGenreId === genre.id
                      ? "bg-purple-800 text-white"
                      : "bg-zinc-800 text-gray-300 hover:bg-zinc-600"
                    }`}
                >
                  {genre.name}
                </button>
              ))}
            </div>

            {/* Series Grid */}
            <div className="grid gap-6 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {movies.map((movie) => (
                <div
                  key={movie.id}
                  className="bg-[#1f1f1f] relative rounded-xl overflow-hidden shadow hover:scale-105 transition"
                >
                  <Link to={`/tv/${movie.id}`}>
                    <img
                      src={
                        movie.poster_path
                          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                          : "https://via.placeholder.com/500x750?text=No+Image"
                      }
                      alt={movie.title}
                      className="w-full h-[250px] object-cover"
                    />
                  </Link>

                  <button
                    onClick={() => toggleFavorite(movie)}
                    className={`absolute top-3 left-3 z-10 border rounded-full w-7 h-7 flex items-center justify-center text-sm backdrop-blur-md transition ${isFavorite(movie.id)
                        ? "bg-purple-600 text-white border-purple-600 hover:bg-purple-700"
                        : "bg-white/10 text-white border-white/30 hover:bg-white/20"
                      }`}
                  >
                    <FontAwesomeIcon icon={isFavorite(movie.id) ? faCheck : faPlus} />
                  </button>

                  <div className="p-3">
                    <h2 className="text-white text-sm font-semibold truncate">
                      {movie.title || movie.name}
                    </h2>
                    <p className="text-gray-400 text-xs mt-1">
                      ⭐ {movie.vote_average?.toFixed(1)} / 10
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More */}
            {hasMore && (
              <div className="text-center mt-10">
                <button
                  onClick={fetchSeries}
                  disabled={loading}
                  className="px-6 py-2 bg-purple-900 text-white rounded-full hover:bg-purple-800 transition"
                >
                  {loading ? "Loading..." : "Load More"}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>

  );
};

export default SeriesPage;
