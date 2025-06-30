import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { faCheck, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocalFavorites } from "../LocalFavoritesContext/LocalFavoritesContext";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [images, setImages] = useState([]);
  const [credits, setCredits] = useState(null);
  const [similar, setSimilar] = useState([]);
  const [collectionParts, setCollectionParts] = useState([]);
  const { toggleFavorite, isFavorite } = useLocalFavorites(); // ← استخدام الكونتكست

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjY2ZjY2U5Nzk1YTlhMWM2OTdkMjE2NzlkNjFjZDczYiIsIm5iZiI6MTc1MDkzNjgxOS4yMDgsInN1YiI6IjY4NWQyY2YzMzg1NmMzODY4NDRkMTAxYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xxTpJHPQUn0G3XkurXdjcLkG4wRsOKElSH8GL8zCm_U`

    },
  };

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [m, imgRes, credRes, simRes] = await Promise.all([
          fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options).then(r => r.json()),
          fetch(`https://api.themoviedb.org/3/movie/${id}/images`, options).then(r => r.json()),
          fetch(`https://api.themoviedb.org/3/movie/${id}/credits`, options).then(r => r.json()),
          fetch(`https://api.themoviedb.org/3/movie/${id}/similar?language=en-US`, options).then(r => r.json()),
        ]);

        setMovie(m);
        setImages(imgRes.backdrops?.slice(0, 6) || []);
        setCredits(credRes);
        setSimilar(simRes.results || []);

        // Fetch collection parts if movie belongs to one
        if (m.belongs_to_collection) {
          const collectionId = m.belongs_to_collection.id;
          const collectionRes = await fetch(
            `https://api.themoviedb.org/3/collection/${collectionId}?language=en-US`,
            options
          ).then(r => r.json());
          setCollectionParts(collectionRes.parts || []);
        } else {
          setCollectionParts([]);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchAll();
  }, [id]);

  if (!movie) return <p className="text-white text-center mt-20">Loading...</p>;

  const director = credits?.crew?.find(c => c.job === "Director");
  const cast = credits?.cast?.slice(0, 10) || [];

  return (

    <section className="min-h-screen text-white">
      {/* Hero */}
      <div
        className="relative bg-cover bg-center h-[80vh] flex items-end mt-10"
        style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        <div className="relative bottom-6 z-10 p-4 md:p-8 max-w-7xl mx-auto flex flex-col md:flex-row gap-6 md:gap-8 items-start">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            className="w-[120px] md:w-[200px] rounded-xl shadow flex-shrink-0"
            alt={movie.title}
          />
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">{movie.title}</h1>
            <p className="text-sm md:text-base text-gray-400 mt-2">
              {movie.release_date?.slice(0, 4)} • {movie.runtime} mins
            </p>
            <p className="mt-3 max-w-xl text-gray-300 text-sm md:text-base">{movie.overview}</p>

            <div className="flex items-center gap-3 mt-4 relative">
              <button className="bg-purple-900 px-5 py-2 rounded-full text-sm md:text-base flex-shrink-0">
                Watch Now
              </button>

              <button
                onClick={() => toggleFavorite(movie)}
                className={`border rounded-full px-4 py-2 text-sm backdrop-blur-md transition whitespace-nowrap
      ${isFavorite(movie.id)
                    ? "bg-purple-600 text-white border-purple-600 hover:bg-purple-700"
                    : "bg-white/10 text-white border-white/30 hover:bg-white/20"
                  }`}
              >
                {isFavorite(movie.id) ? "Added" : "Add to Favorite"}
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Backdrops Carousel */}
      <div className="max-w-7xl mx-auto px-4 mt-5 overflow-x-auto">
        <Carousel
          responsive={{
            desktop: { breakpoint: { max: 3000, min: 1024 }, items: 4 },
            tablet: { breakpoint: { max: 1024, min: 768 }, items: 3 },
            mobile: { breakpoint: { max: 768, min: 0 }, items: 2 },
          }}
          infinite
          autoPlay
          autoPlaySpeed={3500}
          keyBoardControl
          draggable
          swipeable
          itemClass="px-2"
        >
          {images.map((img, i) => (
            <div key={i} className="rounded-lg overflow-hidden">
              <img
                src={`https://image.tmdb.org/t/p/w780${img.file_path}`}
                className="w-full h-[200px] md:h-[300px] object-cover rounded-xl shadow-lg"
                alt={`scene ${i}`}
              />
            </div>
          ))}
        </Carousel>
      </div>

      {/* About + Genres */}
      <div className="max-w-7xl mx-auto px-4 mt-10">
        <h2 className="text-2xl font-semibold mb-4">About {movie.title}</h2>
        <p className="text-gray-300 text-sm md:text-base">{movie.overview}</p>

        <h3 className="text-xl mt-8 mb-2">Genres</h3>
        <div className="flex gap-2 flex-wrap">
          {movie.genres?.map((g) => (
            <span key={g.id} className="bg-purple-600 px-3 py-1 rounded-full text-sm">
              {g.name}
            </span>
          ))}
        </div>

        {/* Movie Parts Slider (Collection) */}
        {collectionParts.length > 0 && (
          <>
            <h3 className="text-xl font-semibold mt-10 mb-4">Seasons</h3>
            <Carousel
              responsive={{
                desktop: { breakpoint: { max: 3000, min: 1024 }, items: 5 },
                tablet: { breakpoint: { max: 1024, min: 768 }, items: 3 },
                mobile: { breakpoint: { max: 768, min: 0 }, items: 2 },
              }}
              infinite
              autoPlay
              autoPlaySpeed={4000}
              keyBoardControl
              draggable
              swipeable
              itemClass="px-2"
            >
              {collectionParts.map((part) => (
                <Link
                  key={part.id}
                  to={`/movie/${part.id}`}
                  className="hover:scale-105 transition-transform"
                >
                  <div className="bg-[#1f1f1f] rounded-xl overflow-hidden shadow-md">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${part.poster_path}`}
                      className="w-full h-[200px] md:h-[260px] object-cover"
                      alt={part.title}
                    />
                    <div className="p-3">
                      <h4 className="text-sm font-semibold truncate mb-1">{part.title}</h4>
                      <p className="text-gray-400 text-xs">{part.release_date?.slice(0, 4) || "Unknown"}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </Carousel>
          </>
        )}

        {/* Cast */}
        <h3 className="text-xl mt-8 mb-2">Characters</h3>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {cast.map((a) => (
            <div key={a.id} className="text-center w-[80px] sm:w-[100px] flex-shrink-0">
              <img
                src={
                  a.profile_path
                    ? `https://image.tmdb.org/t/p/w200${a.profile_path}`
                    : "https://via.placeholder.com/100x150"
                }
                alt={a.name}
                className="w-[80px] h-[80px] rounded-full object-cover mb-2"
              />
              <p className="text-sm truncate">{a.name}</p>
            </div>
          ))}
        </div>

        {/* Director */}
        {director && (
          <>
            <h3 className="text-xl mt-8 mb-2">Director</h3>
            <div className="flex items-center gap-4">
              <img
                src={
                  director.profile_path
                    ? `https://image.tmdb.org/t/p/w200${director.profile_path}`
                    : "https://via.placeholder.com/100"
                }
                alt={director.name}
                className="w-[80px] h-[80px] rounded-full object-cover"
              />
              <p className="text-lg">{director.name}</p>
            </div>
          </>
        )}

        {/* Similar Movies */}
        <h3 className="text-xl font-semibold mt-10 mb-4">
          Suggestions like “{movie.title}”
        </h3>
        <Carousel
          responsive={{
            desktop: { breakpoint: { max: 3000, min: 1024 }, items: 5 },
            tablet: { breakpoint: { max: 1024, min: 768 }, items: 4 },
            mobile: { breakpoint: { max: 768, min: 0 }, items: 2 },
          }}
          infinite
          autoPlay
          autoPlaySpeed={4000}
          keyBoardControl
          draggable
          swipeable
          itemClass="px-2"
        >
          {similar.map((item) => (
            <Link
              key={item.id}
              to={`/movie/${item.id}`}
              className="hover:scale-105 transition-transform"
            >
              <div className="bg-[#1f1f1f] rounded-xl overflow-hidden shadow-md">
                <img
                  src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                  className="w-full h-[200px] md:h-[260px] object-cover"
                  alt={item.title}
                />
                <div className="p-3">
                  <h4 className="text-sm font-semibold truncate mb-1">{item.title}</h4>
                  <p className="text-gray-400 text-xs">
                    ⭐ {item.vote_average?.toFixed(1)} / 10
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </Carousel>
      </div>
    </section>

  );
};

export default MovieDetails;
