import { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPlus } from "@fortawesome/free-solid-svg-icons";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { Link } from "react-router-dom";
import { useLocalFavorites } from "../LocalFavoritesContext/LocalFavoritesContext";

const SeriesSlider = () => {
    const [selectedGenreId, setSelectedGenreId] = useState(null);
    const [genres, setGenres] = useState([]);
    const [allMovies, setAllMovies] = useState([]);
    const [genreSeries, setGenreSeries] = useState([]);
    const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start', draggable: true });
    const { toggleFavorite, isFavorite } = useLocalFavorites(); // ← استخدام الكونتكست


    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
             Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjY2ZjY2U5Nzk1YTlhMWM2OTdkMjE2NzlkNjFjZDczYiIsIm5iZiI6MTc1MDkzNjgxOS4yMDgsInN1YiI6IjY4NWQyY2YzMzg1NmMzODY4NDRkMTAxYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xxTpJHPQUn0G3XkurXdjcLkG4wRsOKElSH8GL8zCm_U`

    },
    };

    // Fetch genres
    useEffect(() => {
        fetch("https://api.themoviedb.org/3/genre/tv/list?language=en", options)
            .then((res) => res.json())
            .then((data) => setGenres(data.genres || []));
    }, []);

    // Fetch all movies on load
    useEffect(() => {
        fetch("https://api.themoviedb.org/3/discover/tv?language=en-US&page=1", options)
            .then((res) => res.json())
            .then((data) => setAllMovies(data.results || []));
    }, []);

    // Fetch movies for selected genre
    useEffect(() => {
        if (selectedGenreId) {
            fetch(
                `https://api.themoviedb.org/3/discover/tv?with_genres=${selectedGenreId}&language=en-US&page=1`,
                options
            )
                .then((res) => res.json())
                .then((data) => setGenreSeries(data.results || []));
        }
    }, [selectedGenreId]);

    const responsive = {
        desktop: { breakpoint: { max: 3000, min: 1024 }, items: 5 },
        tablet: { breakpoint: { max: 1024, min: 768 }, items: 3 },
        mobile: { breakpoint: { max: 768, min: 0 }, items: 2 },
    };

    return (

        <section className="px-4 md:px-10 py-6 mt-5">
            {/* Header */}
            <div className="flex justify-between items-center mb-3">
                <h2 className="text-white text-2xl font-semibold">
                    {selectedGenreId ? "Series by Genre" : "All Series"}
                </h2>

                {selectedGenreId ? (
                    <button
                        onClick={() => setSelectedGenreId(null)}
                        className="text-purple-400 hover:underline text-sm"
                    >
                        ← Back to All Series
                    </button>
                ) : (
                    <Link to="/series" className="text-purple-400 hover:underline text-sm">
                        See All →
                    </Link>
                )}
            </div>

            {/* Genre Buttons Slider */}
            <div className="flex items-center mb-6">
                <button
                    onClick={() => emblaApi?.scrollPrev()}
                    className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-full mr-2"
                >
                    <ChevronLeft size={20} />
                </button>

                <div className="overflow-hidden w-full" ref={emblaRef}>
                    <div className="flex space-x-4">
                        {genres.map((genre) => (
                            <button
                                key={genre.id}
                                onClick={() => setSelectedGenreId(genre.id)}
                                className={`px-4 py-2 text-sm font-medium whitespace-nowrap transition-all duration-200 focus:outline-none 
                  ${selectedGenreId === genre.id
                                        ? "bg-purple-800 text-white rounded-[30px]"
                                        : "bg-transparent border border-[#81787d] text-white hover:bg-slate-950 hover:border-white rounded-[30px]"
                                    }`}
                            >
                                {genre.name}
                            </button>
                        ))}
                    </div>
                </div>

                <button
                    onClick={() => emblaApi?.scrollNext()}
                    className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-full ml-2"
                >
                    <ChevronRight size={20} />
                </button>
            </div>

            {/* Series Carousel */}
            <Carousel
                responsive={responsive}
                infinite
                autoPlay
                autoPlaySpeed={3500}
                draggable
                swipeable
                keyBoardControl
            >
                {(selectedGenreId ? genreSeries : allMovies).map((tv) =>
                    tv.poster_path ? (
                        <div
                            key={tv.id}
                            className="relative mx-2 group overflow-hidden rounded-2xl shadow-lg"
                        >
                            <Link to={`/tv/${tv.id}`}>
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${tv.poster_path}`}
                                    alt={tv.name}
                                    className="w-full h-[320px] object-cover rounded-2xl group-hover:brightness-75 transition duration-300"
                                />
                            </Link>

                            {/* + Button */}
                            <button
                                onClick={() => toggleFavorite(tv)}
                                className={`absolute top-3 left-3 z-10 border rounded-full w-7 h-7 flex items-center justify-center text-sm backdrop-blur-md transition
                  ${isFavorite(tv.id)
                                        ? "bg-purple-600 text-white border-purple-600 hover:bg-purple-700"
                                        : "bg-white/10 text-white border-white/30 hover:bg-white/20"
                                    }`}
                            >
                                <FontAwesomeIcon icon={isFavorite(tv.id) ? faCheck : faPlus} />
                            </button>

                            {/* Info */}
                            <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-3 backdrop-blur-md">
                                <h3 className="text-white text-sm font-semibold truncate">{tv.name}</h3>
                                <p className="text-gray-300 text-xs mt-1">
                                    ⭐ {tv.vote_average?.toFixed(1)} / 10
                                </p>
                                <p className="text-gray-400 text-[11px]">
                                    {tv.first_air_date?.slice(0, 4)}
                                </p>
                            </div>
                        </div>
                    ) : null
                )}
            </Carousel>
        </section>
    );
};

export default SeriesSlider;
