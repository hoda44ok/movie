import { Link } from "react-router-dom";
import { useLocalFavorites } from "../LocalFavoritesContext/LocalFavoritesContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const LocalFavoritesPage = () => {
  const { favorites, toggleFavorite } = useLocalFavorites();

  return (

    <div className="min-h-screen bg-[#121212] px-4 sm:px-6 md:px-16 py-10 text-white ">
      <h1 className="text-2xl sm:text-3xl font-semibold mb-10 text-center sm:text-left mt-20">
        Your Favorite List
      </h1>

      {favorites.length === 0 ? (
        <p className="text-center text-gray-400 text-lg">
          You have no favorites yet. Start adding some!
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-10">
          {favorites.map((item) => (
            <div
              key={item.id}
              className="bg-[#1f1f1f] relative rounded-2xl overflow-hidden shadow-lg hover:shadow-purple-500/30 transition duration-300 group"
            >
              <Link to={`/${item.media_type || "movie"}/${item.id}`}>
                <img
                  src={
                    item.poster_path || item.profile_path
                      ? `https://image.tmdb.org/t/p/w500${item.poster_path || item.profile_path}`
                      : "https://via.placeholder.com/500x750?text=No+Image"
                  }
                  alt={item.title || item.name}
                  className="w-full h-[160px] sm:h-[200px] md:h-[250px] object-cover group-hover:brightness-75 transition duration-300 rounded-t-2xl"
                />
              </Link>

              <button
                onClick={() => toggleFavorite(item)}
                className="absolute top-2 right-2 z-10 bg-red-500 hover:bg-red-600 text-white rounded-full w-7 h-7 flex items-center justify-center text-xs"
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>

              <div className="p-3 text-center">
                <h3 className="text-sm font-semibold truncate">
                  {item.title || item.name}
                </h3>
                {item.vote_average && (
                  <p className="text-xs text-gray-400 mt-1">
                    ⭐ {item.vote_average.toFixed(1)} / 10
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>

  );
};

export default LocalFavoritesPage;
