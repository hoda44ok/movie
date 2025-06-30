import { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";

const NowPlaying = () => {
    const [movies, setMovies] = useState([]);

    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
             Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjY2ZjY2U5Nzk1YTlhMWM2OTdkMjE2NzlkNjFjZDczYiIsIm5iZiI6MTc1MDkzNjgxOS4yMDgsInN1YiI6IjY4NWQyY2YzMzg1NmMzODY4NDRkMTAxYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xxTpJHPQUn0G3XkurXdjcLkG4wRsOKElSH8GL8zCm_U`

    },
    };

    useEffect(() => {
        fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options)
            .then(res => res.json())
            .then(data => {
                setMovies(data.results);
            })
            .catch(err => console.error(err));
    }, []);

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 1280 },
            items: 5,
        },
        desktop: {
            breakpoint: { max: 1280, min: 1024 },
            items: 4,
        },
        tablet: {
            breakpoint: { max: 1024, min: 640 },
            items: 3,
        },
        mobile: {
            breakpoint: { max: 640, min: 0 },
            items: 2,
        },
    };

    return (
        <section className="px-4 md:px-10 py-6 mt-5">
            <h2 className="text-2xl ms-4 font-semibold mb-10 text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-yellow-400 to-pink-500">
                Now Playing in Cinemas 🎬
            </h2>

            <Carousel
                responsive={responsive}
                infinite
                autoPlay
                autoPlaySpeed={3500}
                draggable
                swipeable
                itemClass="px-2" // لضبط المسافات الجانبية
            >
                {movies.map((movie) => (
                    <Link to={`/movie/${movie.id}`} key={movie.id}>
                        <div className="relative group overflow-hidden rounded-2xl shadow-lg">
                            <img
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title}
                                className="w-full h-[300px] sm:h-[320px] object-cover rounded-2xl group-hover:brightness-75 transition duration-300"
                            />

                            {/* Rating Badge */}
                            <div className="absolute top-2 right-2 bg-yellow-600 text-black text-xs font-bold px-2 py-1 rounded shadow-md">
                                ⭐ {movie.vote_average.toFixed(1)}
                            </div>

                            {/* Movie Info Overlay */}
                            <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-3 backdrop-blur-md">
                                <h3 className="text-base font-semibold line-clamp-2 text-white group-hover:text-yellow-300 transition">
                                    {movie.title}
                                </h3>
                                <p className="text-xs text-gray-400 mt-1">
                                    {movie.release_date}
                                </p>
                            </div>
                        </div>
                    </Link>
                ))}
            </Carousel>
        </section>

    );
};

export default NowPlaying;
