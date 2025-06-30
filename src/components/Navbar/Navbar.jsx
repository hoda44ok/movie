import { useEffect, useState, useContext, useRef } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,

  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import logoLight from "../../assets/images/Logo- light.png";
import logoDark from "../../assets/images/Logo- Dark.png";
import { SearchContext } from "../../Context/SearchContext";

const navLinks = [
  { path: "/", label: "Home" },
  { path: "/movies", label: "Movies" },
  { path: "/series", label: "Series" },
  { path: "/collection", label: "Collections" },
  { path: "/favorites", label: "Favorites" },
];

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark"
  );
  const [showSearch, setShowSearch] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const searchRef = useRef();

  const { searchTerm, setSearchTerm, getAllResults } = useContext(SearchContext);

  // ⏱ Debounced search
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchTerm.trim()) {
        getAllResults();
      }
    }, 600);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  // 📉 Hide/show navbar on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShowNavbar(currentScrollY <= lastScrollY || currentScrollY <= 50);
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // 🖱 Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target)
      ) {
        setShowSearch(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 🌙 Handle theme
  useEffect(() => {
    const html = document.documentElement;
    if (darkMode) {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (

    <>
      <nav
        role="navigation"
        aria-label="Main Navigation"
        className={`fixed top-0 left-0 w-full z-50 transition-transform duration-500 transform 
    ${showNavbar ? "translate-y-0" : "-translate-y-full"}
    bg-[#1a1a1acb]/50 backdrop-blur-lg shadow-md border-b  border-[#121212]`}
      >
        <div className="max-w-screen-xl mx-auto py-2 flex items-center justify-between px-4">
          {/* Left: Logo + Links */}
          <div className="flex items-center gap-8">
            <img
              src={darkMode ? logoLight : logoDark}
              alt="Logo"
              className="w-16 object-contain"
            />
            <ul className="hidden md:flex items-center gap-5 font-semibold text-gray-200 text-base">
              {navLinks.map(({ path, label }) => (
                <li key={path}>
                  <NavLink
                    to={path}
                    className={({ isActive }) =>
                      isActive
                        ? "text-gradient-active underline underline-offset-4"
                        : "hover:text-black-active transition duration-300 ease-in-out"
                    }
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Icons */}
          <div className="flex items-center gap-5 text-gray-200 text-lg">
            {!showSearch && (
              <button
                onClick={() => setShowSearch(true)}
                className="hover:text-gradient-active transition-transform duration-300 hover:scale-110"
                title="Search"
              >
                <FontAwesomeIcon icon={faSearch} />
              </button>
            )}

            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden hover:text-gradient-active transition-transform duration-300 hover:scale-110 text-2xl"
            >
              <FontAwesomeIcon icon={faBars} />
            </button>
          </div>
        </div>

        {/* 🔍 Search Form */}
        <div
          ref={searchRef}
          className={`transition-all duration-500 ease-in-out ${showSearch ? "max-h-40 py-6 px-4 opacity-100" : "max-h-0 py-0 px-4 opacity-0"
            } bg-transparent backdrop-blur-md border-b border-purple-700 shadow-md`}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (searchTerm.trim()) {
                getAllResults();
                setShowSearch(false);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            className="flex gap-4 items-center w-full max-w-3xl mx-auto"
          >
            <input
              type="text"
              placeholder="Search for movies, series, collections or people..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-5 py-3 rounded-full border border-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-400/50 text-white bg-[#1f1f1f] placeholder-gray-400 shadow-md transition"
              autoFocus={showSearch}
            />
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-purple-700 to-purple-500 text-white font-semibold rounded-full hover:from-purple-600 hover:to-purple-400 shadow-lg transition-all"
            >
              Search
            </button>
          </form>
        </div>
      </nav>

      {/* 📱 Mobile Menu */}
      <div
        className={`fixed top-0 left-0 w-full bg-gradient-to-b from-purple-900 via-purple-800 to-purple-900 text-white shadow-lg z-50 transition-transform duration-500 ease-in-out
    ${isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"}`}
      >
        <div className="flex justify-between items-center px-6 py-3 border-b border-purple-700">
          <img
            src={darkMode ? logoLight : logoDark}
            alt="Logo"
            className="w-20 object-contain"
          />
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-4xl hover:text-gradient-active transition-transform duration-300 hover:scale-110"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <nav className="flex flex-col gap-5 px-6 py-6 font-semibold text-base">
          {navLinks.map(({ path, label }) => (
            <NavLink
              key={path}
              to={path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? "text-gradient-active underline underline-offset-4"
                  : "hover:text-gradient-active transition duration-300 ease-in-out"
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* خلفية شفافة عند فتح القائمة */}
      {isMobileMenuOpen && (
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-40"
        />
      )}

      {/* تأثير النص المتدرج */}
      <style>{`
    .text-gradient-active {
      background: linear-gradient(90deg, #6a11cb 0%, #2575fc 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;
    }
  `}</style>
    </>


  );
};

export default Navbar;
