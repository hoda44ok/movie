import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const WatchPage = () => {
  const { id } = useParams();
  const [trailerKey, setTrailerKey] = useState(null);
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
     Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjY2ZjY2U5Nzk1YTlhMWM2OTdkMjE2NzlkNjFjZDczYiIsIm5iZiI6MTc1MDkzNjgxOS4yMDgsInN1YiI6IjY4NWQyY2YzMzg1NmMzODY4NDRkMTAxYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xxTpJHPQUn0G3XkurXdjcLkG4wRsOKElSH8GL8zCm_U`

    },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
          options
        );
        const data = await res.json();
        setMovie(data);

        const videoRes = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
          options
        );
        const videoData = await videoRes.json();
        const trailer = videoData.results.find(
          (vid) => vid.type === "Trailer" && vid.site === "YouTube"
        );
        if (trailer) setTrailerKey(trailer.key);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <div className="text-white text-center mt-20">Loading...</div>;

  return (
  
    <section className="min-h-screen text-white px-4 md:px-12 py-10 ">
  <Link
    to="/"
    className="text-purple-400 hover:underline text-sm inline-block mt-20"
  >
    ← Back to Home
  </Link>

  {/* Video */}
  {trailerKey ? (
    <div className="w-full max-w-6xl mx-auto aspect-video mb-10 rounded-xl overflow-hidden shadow-lg mt-10">
      <iframe
        src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=0&rel=0&modestbranding=1&controls=1`}
        title="Movie Trailer"
        className="w-full h-full"
        allow="autoplay; fullscreen"
        allowFullScreen
      />
    </div>
  ) : (
    <p className="text-gray-400 mb-8 text-center mt-10">
      No trailer available for this movie.
    </p>
  )}

  {/* Movie Details */}
  <div className="max-w-6xl mx-auto ">
    <h1 className="text-4xl font-Semibold mb-4">{movie?.title}</h1>
    <p className="text-gray-300 text-lg leading-relaxed">
      {movie?.overview}
    </p>
  </div>
</section>

  );
};

export default WatchPage;
