import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useLocalFavorites } from "../LocalFavoritesContext/LocalFavoritesContext";

const SeriesDetails = () => {
  const { id } = useParams();
  const [series, setSeries] = useState(null);
  const [images, setImages] = useState([]);
  const [credits, setCredits] = useState(null);
  const [similar, setSimilar] = useState([]);
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
          fetch(`https://api.themoviedb.org/3/tv/${id}?language=en-US`, options).then((r) => r.json()),
          fetch(`https://api.themoviedb.org/3/tv/${id}/images`, options).then((r) => r.json()),
          fetch(`https://api.themoviedb.org/3/tv/${id}/credits`, options).then((r) => r.json()),
          fetch(`https://api.themoviedb.org/3/tv/${id}/similar?language=en-US`, options).then((r) => r.json()),
        ]);
        setSeries(m);
        setImages(imgRes.backdrops?.slice(0, 6) || []);
        setCredits(credRes);
        setSimilar(simRes.results || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAll();
  }, [id]);

  if (!series) return <p className="text-white text-center mt-20">Loading...</p>;

  const director = credits?.crew?.find((c) => c.job === "Director");
  const cast = credits?.cast?.slice(0, 10) || [];

  return (

    <section className="min-h-screen bg-[#0f0f0f] text-white">
      {/* Hero */}
      <div
        className="relative bg-cover bg-center h-[80vh] flex items-end mt-10"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${series.backdrop_path})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        <div className="relative bottom-6 z-10 p-4 sm:p-8 max-w-7xl mx-auto flex flex-col md:flex-row gap-6 md:gap-8 flex-wrap">
          <img
            src={`https://image.tmdb.org/t/p/w500${series.poster_path}`}
            className="w-full max-w-[200px] mx-auto md:mx-0 rounded-xl shadow"
            alt={series.name}
          />
          <div>
            <h1 className="text-4xl font-bold">{series.name}</h1>
            <p className="text-sm text-gray-400 mt-2">
              {series.first_air_date?.slice(0, 4)} • {series.episode_run_time?.[0]} mins
            </p>
            <p className="text-sm text-gray-400">
              Seasons: {series.number_of_seasons} • Episodes: {series.number_of_episodes}
            </p>
            <p className="mt-3 max-w-xl text-gray-300">{series.overview}</p>
            <div className="flex flex-wrap gap-3 mt-4">
              <button className="bg-purple-900 px-5 py-2 rounded-full">Watch Now</button>
 <button
                onClick={() => toggleFavorite(series)}
                className={`border rounded-full px-4 py-2 text-sm backdrop-blur-md transition whitespace-nowrap
      ${isFavorite(series.id)
                    ? "bg-purple-600 text-white border-purple-600 hover:bg-purple-700"
                    : "bg-white/10 text-white border-white/30 hover:bg-white/20"
                  }`}
              >
                {isFavorite(series.id) ? "Added" : "Add to Favorite"}
              </button>            </div>
          </div>
        </div>
      </div>

      {/* Images Carousel */}
      <div className="max-w-7xl mx-auto px-4 mt-5">
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
                className="w-full h-[300px] object-cover rounded-xl shadow-lg"
                alt={`scene ${i}`}
              />
            </div>
          ))}
        </Carousel>
      </div>

      {/* About Section */}
      <div className="max-w-7xl mx-auto px-4 mt-10">
        <h2 className="text-2xl font-semibold mb-4">About {series.name}</h2>
        <p className="text-gray-300">{series.overview}</p>

        <h3 className="text-xl mt-8 mb-2">Genres</h3>
        <div className="flex flex-wrap gap-2">
          {series.genres?.map((g) => (
            <span key={g.id} className="bg-purple-600 px-3 py-1 rounded-full text-sm">
              {g.name}
            </span>
          ))}
        </div>

        {/* Seasons */}
        <div className="max-w-8xl mx-auto mt-12">
          <h3 className="text-xl font-semibold mb-6">Seasons</h3>
          <Carousel
            responsive={{
              desktop: { breakpoint: { max: 3000, min: 1024 }, items: 4 },
              tablet: { breakpoint: { max: 1024, min: 768 }, items: 3 },
              mobile: { breakpoint: { max: 768, min: 0 }, items: 1 },
            }}
            infinite
            autoPlay
            autoPlaySpeed={4000}
            keyBoardControl
            draggable
            swipeable
            itemClass="px-2"
          >
            {series.seasons?.map((season) => (
              <div
                key={season.id}
                className="bg-[#1f1f1f] rounded-xl overflow-hidden shadow-lg transition-transform hover:scale-[1.03] flex flex-col"
              >
                <img
                  src={
                    season.poster_path
                      ? `https://image.tmdb.org/t/p/w300${season.poster_path}`
                      : "https://via.placeholder.com/300x450?text=No+Image"
                  }
                  alt={season.name}
                  className="w-full h-[200px] object-cover"
                />
                <div className="p-4 flex flex-col justify-between h-[150px]">
                  <div>
                    <h4 className="text-white font-semibold text-md truncate">{season.name}</h4>
                    <p className="text-gray-400 text-sm mt-1">{season.episode_count} episodes</p>
                    <p className="text-gray-500 text-xs">
                      Aired {season.air_date ? new Date(season.air_date).getFullYear() : "N/A"}
                    </p>
                  </div>
                  <Link
                    to={`/series/${series.id}/season/${season.season_number}`}
                    className="mt-4 bg-purple-700 hover:bg-purple-800 transition px-3 py-1.5 text-sm rounded-full text-center text-white"
                  >
                    View Season
                  </Link>
                </div>
              </div>
            ))}
          </Carousel>
        </div>

        {/* Characters */}
        <h3 className="text-xl mt-8 mb-2">Characters</h3>
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {cast.map((a) => (
            <div key={a.id} className="text-center min-w-[100px]">
              <img
                src={
                  a.profile_path
                    ? `https://image.tmdb.org/t/p/w200${a.profile_path}`
                    : "https://via.placeholder.com/100x150"
                }
                alt={a.name}
                className="w-[80px] h-[80px] rounded-full object-cover mb-2 mx-auto"
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

        {/* Suggestions Carousel */}
        <h3 className="text-xl font-semibold mt-10 mb-4">Suggestions like “{series.name}”</h3>
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
            <Link key={item.id} to={`/series/${item.id}`} className="hover:scale-105 transition-transform">
              <div className="bg-[#1f1f1f] rounded-xl overflow-hidden shadow-md">
                <img
                  src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                  className="w-full h-[260px] object-cover"
                  alt={item.name}
                />
                <div className="p-3">
                  <h4 className="text-sm font-semibold truncate mb-1">{item.name}</h4>
                  <p className="text-gray-400 text-xs">⭐ {item.vote_average?.toFixed(1)} / 10</p>
                </div>
              </div>
            </Link>
          ))}
        </Carousel>
      </div>
    </section>

  );
};

export default SeriesDetails;
