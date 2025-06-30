import { useContext } from "react";
import Trailer from "../Trailer/Trailer";
import TrendsSlider from "../TrendsSlider/TrendsSlider";
import MovieSlider from "../MovieSlider/MovieSlider";
import img1 from "../../assets/images/Golden Globe.png";
import img2 from "../../assets/images/kids.png";
import SeriesSlider from './../SeriesSlider/SeriesSlider';
import CollectionSlider from "../CollectionSlider/CollectionSlider";
import PeopleSlider from "../PeopleSlider/PeopleSlider";
import { Link } from "react-router-dom";
import UpcomingSlider from "../UpcomingSlider/UpcomingSlider";
import NowPlaying from "../NowPlaying/NowPlaying";
import { SearchContext } from "../../Context/SearchContext";
import { useLocation } from "react-router-dom";

const Home = () => {
  const { searchTerm, searchResults, isLoading } = useContext(SearchContext);
  const location = useLocation(); // 👈 يحدد الصفحة الحالية

  return (


    <div className="bg-[#121212] min-h-screen text-white">
      {searchTerm && location.pathname === "/" ? (
        <>
          <h2 className="text-2xl font-semibold mt-28 px-4">
            Search Results for: <span className="text-purple-400">"{searchTerm}"</span>
          </h2>

          {isLoading ? (
            <p className="text-gray-300 px-4">Loading...</p>
          ) : searchResults.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-10 px-4">
              {searchResults.map((item) =>
                item.poster_path ? (
                  <Link to={`/movie/${item.id}`} key={item.id}>
                    <div className="bg-white/5 p-2 rounded-xl hover:scale-105 transition duration-300">
                      <img
                        src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                        alt={item.title}
                        className="rounded-lg h-[230px] sm:h-[250px] object-cover mb-2 w-full"
                      />
                      <h3 className="text-sm font-semibold truncate">{item.title || item.name}</h3>
                      <p className="text-xs text-gray-400">{item.release_date?.slice(0, 4)}</p>
                    </div>
                  </Link>
                ) : null
              )}
            </div>
          ) : (
            <p className="text-gray-400 px-4">No results found.</p>
          )}
        </>
      ) : (
        <>
          <Trailer />
          <TrendsSlider />
          <UpcomingSlider />
          <NowPlaying />
          <MovieSlider />

          {/* Golden Globe image section */}
          <div className="flex items-center justify-center px-4 mt-10">
            <img
              src={img1}
              alt="Golden Globe"
              className="w-full max-w-[1200px] object-contain"
            />
          </div>

          <SeriesSlider />
          <CollectionSlider />
          <PeopleSlider />

          {/* Kids section image + button */}
          <div className="relative flex flex-col items-center justify-center pt-10 px-4">
            <img
              src={img2}
              alt="Kids"
              className="w-full max-w-[1200px] object-contain"
            />
            <Link to="/kids" className="mt-4 sm:mt-6">
              <button className="bg-purple-900 text-white px-6 py-3 rounded-full hover:bg-purple-700 transition w-full sm:w-auto">
                Watch the children's section
              </button>
            </Link>
          </div>
        </>
      )}
    </div>

  );
};

export default Home;
