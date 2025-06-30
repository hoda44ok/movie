import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const SeasonPage = () => {
  const { tvId, seasonNumber } = useParams();
  const [season, setSeason] = useState(null);
  const navigate = useNavigate();


  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
       Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjY2ZjY2U5Nzk1YTlhMWM2OTdkMjE2NzlkNjFjZDczYiIsIm5iZiI6MTc1MDkzNjgxOS4yMDgsInN1YiI6IjY4NWQyY2YzMzg1NmMzODY4NDRkMTAxYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xxTpJHPQUn0G3XkurXdjcLkG4wRsOKElSH8GL8zCm_U`

    },
  };

  useEffect(() => {
    const fetchSeason = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/tv/${tvId}/season/${seasonNumber}`,
          options
        );
        const data = await res.json();
        setSeason(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchSeason();
  }, [tvId, seasonNumber]);

  if (!season) return <p className="text-white text-center mt-20">Loading...</p>;

  return (


    <section className="px-4 md:px-12 py-10 min-h-screen bg-[#121212] text-white mt-20">
      <div className="max-w-7xl mx-auto">

        {/* 🔙 Back Button */}
        <div className="flex items-center mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-purple-500 hover:text-purple-300 font-medium transition"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
        </div>

        {/* Season Info */}
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-4 text-purple-400">{season.name}</h1>

        {season.air_date && (
          <p className="text-sm text-gray-400 mb-2">
            Aired on: <span className="text-white">{season.air_date}</span>
          </p>
        )}

        {season.overview && (
          <p className="text-gray-300 mb-10 leading-relaxed max-w-3xl">{season.overview}</p>
        )}

        {/* Episodes Title */}
        <h2 className="text-xl sm:text-2xl font-semibold mb-6 border-l-4 border-purple-600 pl-4">
          Episodes
        </h2>

        {/* Episodes Carousel */}
        <Carousel
          responsive={{
            desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
            tablet: { breakpoint: { max: 1024, min: 768 }, items: 2 },
            mobile: { breakpoint: { max: 768, min: 0 }, items: 1 },
          }}
          infinite
          autoPlay
          autoPlaySpeed={5500}
          keyBoardControl
          itemClass="px-3"
        >
          {season.episodes?.map((ep) => (
            <div
              key={ep.id}
              className="bg-[#1a1a1a] rounded-xl shadow-xl hover:shadow-purple-800/80 transition duration-300 flex flex-col h-full"
            >
              <img
                src={
                  ep.still_path
                    ? `https://image.tmdb.org/t/p/w500${ep.still_path}`
                    : "https://via.placeholder.com/500x281?text=No+Image"
                }
                alt={ep.name}
                className="rounded-t-xl w-full h-[200px] sm:h-[220px] object-cover"
              />
              <div className="p-3 sm:p-4 flex flex-col justify-between flex-grow">
                <h3 className="text-base sm:text-lg font-semibold text-purple-300 mb-1 line-clamp-1">
                  {ep.episode_number}. {ep.name}
                </h3>
                <p className="text-xs text-gray-400 mb-1">
                  Air Date: <span className="text-white">{ep.air_date || "Unknown"}</span>
                </p>
                <p className="text-sm text-gray-300 line-clamp-3">
                  {ep.overview || "No overview available."}
                </p>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </section>

  );
};

export default SeasonPage;
