import { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const PopularPeopleSlider = () => {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjY2ZjY2U5Nzk1YTlhMWM2OTdkMjE2NzlkNjFjZDczYiIsIm5iZiI6MTc1MDkzNjgxOS4yMDgsInN1YiI6IjY4NWQyY2YzMzg1NmMzODY4NDRkMTAxYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xxTpJHPQUn0G3XkurXdjcLkG4wRsOKElSH8GL8zCm_U`

    },
  };

  useEffect(() => {
    fetch('https://api.themoviedb.org/3/person/popular?language=en-US&page=1', options)
      .then((res) => res.json())
      .then((data) => {
        setPeople(data.results || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching people:", err);
        setLoading(false);
      });
  }, []);

  const responsive = {
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 6 },
    tablet: { breakpoint: { max: 1024, min: 768 }, items: 4 },
    mobile: { breakpoint: { max: 768, min: 0 }, items: 3 },
  };

  if (loading) return <p className="text-white text-center">Loading...</p>;

  return (

    <section className="px-4 md:px-10 py-6 mt-5">
      <h2 className="text-white text-2xl font-semibold mb-6 ms-5">Popular People</h2>

      <Carousel
        responsive={responsive}
        infinite
        autoPlay
        autoPlaySpeed={3500}
        draggable
        swipeable
        itemClass="px-2"
      >
        {people.map((person) => (
          <div
            key={person.id}
            className="mx-2 flex flex-col items-center text-center"
          >
            <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 overflow-hidden rounded-full border-4 border-white/10 shadow-md mb-3">
              <img
                src={`https://image.tmdb.org/t/p/w500${person.profile_path}`}
                alt={person.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-white text-sm font-semibold truncate w-24 sm:w-28 md:w-32 lg:w-36">
              {person.name}
            </h3>
            <p className="text-gray-400 text-xs mt-1 truncate w-24 sm:w-28 md:w-32 lg:w-36">
              {person.known_for_department}
            </p>
          </div>
        ))}
      </Carousel>
    </section>


  );
};

export default PopularPeopleSlider;
