import { createContext, useState } from "react";
import { AuthContext } from "./AuthContext";

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchPage, setSearchPage] = useState(""); // ✅ الصفحة اللي فيها البحث

  async function getCollection() {
    if (!searchTerm) return;

    setIsLoading(true);

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjY2ZjY2U5Nzk1YTlhMWM2OTdkMjE2NzlkNjFjZDczYiIsIm5iZiI6MTc1MDkzNjgxOS4yMDgsInN1YiI6IjY4NWQyY2YzMzg1NmMzODY4NDRkMTAxYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xxTpJHPQUn0G3XkurXdjcLkG4wRsOKElSH8GL8zCm_U`

    },
    };

    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/collection?query=${encodeURIComponent(
          searchTerm
        )}&include_adult=false&language=en-US&page=1`,
        options
      );
      const data = await res.json();
      setSearchResults(data.results || []);
    } catch (err) {
      console.error("Search error:", err);
    } finally {
      setIsLoading(false);
    }
  }

  async function getCompany() {
    if (!searchTerm) return;

    setIsLoading(true);

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjY2ZjY2U5Nzk1YTlhMWM2OTdkMjE2NzlkNjFjZDczYiIsIm5iZiI6MTc1MDkzNjgxOS4yMDgsInN1YiI6IjY4NWQyY2YzMzg1NmMzODY4NDRkMTAxYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xxTpJHPQUn0G3XkurXdjcLkG4wRsOKElSH8GL8zCm_U`

    },
    };

    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/company?query=${encodeURIComponent(searchTerm)}&page=1`,
        options
      );

      const data = await res.json();
      setSearchResults(data.results || []);
    } catch (err) {
      console.error("Search error:", err);
    } finally {
      setIsLoading(false);
    }
  }
  async function getMovie() {
    if (!searchTerm) return;

    setIsLoading(true);

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
         Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjY2ZjY2U5Nzk1YTlhMWM2OTdkMjE2NzlkNjFjZDczYiIsIm5iZiI6MTc1MDkzNjgxOS4yMDgsInN1YiI6IjY4NWQyY2YzMzg1NmMzODY4NDRkMTAxYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xxTpJHPQUn0G3XkurXdjcLkG4wRsOKElSH8GL8zCm_U`

    },
    };

    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(searchTerm)}&include_adult=false&language=en-US&page=1`,
        options
      );

      const data = await res.json();
      setSearchResults(data.results || []);
    } catch (err) {
      console.error("Search error:", err);
    } finally {
      setIsLoading(false);
    }
  }
  async function getSeries() {
    if (!searchTerm) return;

    setIsLoading(true);

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
         Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjY2ZjY2U5Nzk1YTlhMWM2OTdkMjE2NzlkNjFjZDczYiIsIm5iZiI6MTc1MDkzNjgxOS4yMDgsInN1YiI6IjY4NWQyY2YzMzg1NmMzODY4NDRkMTAxYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xxTpJHPQUn0G3XkurXdjcLkG4wRsOKElSH8GL8zCm_U`

    },
    };

    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/tv?query=${encodeURIComponent(searchTerm)}&include_adult=false&language=en-US&page=1`,
        options
      );

      const data = await res.json();
      setSearchResults(data.results || []);
    } catch (err) {
      console.error("Search error:", err);
    } finally {
      setIsLoading(false);
    }
  }
  async function getPerson() {
    if (!searchTerm) return;

    setIsLoading(true);

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjY2ZjY2U5Nzk1YTlhMWM2OTdkMjE2NzlkNjFjZDczYiIsIm5iZiI6MTc1MDkzNjgxOS4yMDgsInN1YiI6IjY4NWQyY2YzMzg1NmMzODY4NDRkMTAxYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xxTpJHPQUn0G3XkurXdjcLkG4wRsOKElSH8GL8zCm_U`

    },
    };

    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/person?query=${encodeURIComponent(searchTerm)}&include_adult=false&language=en-US&page=1`,
        options
      );

      const data = await res.json();
      setSearchResults(data.results || []);
    } catch (err) {
      console.error("Search error:", err);
    } finally {
      setIsLoading(false);
    }
  }
  async function getAllResults() {
    if (!searchTerm) return;
    setIsLoading(true);

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjY2ZjY2U5Nzk1YTlhMWM2OTdkMjE2NzlkNjFjZDczYiIsIm5iZiI6MTc1MDkzNjgxOS4yMDgsInN1YiI6IjY4NWQyY2YzMzg1NmMzODY4NDRkMTAxYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xxTpJHPQUn0G3XkurXdjcLkG4wRsOKElSH8GL8zCm_U`

    },
    };

    try {
      const [movieRes, seriesRes, personRes, companyRes, collectionRes] = await Promise.all([
        fetch(`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(searchTerm)}&include_adult=false&language=en-US&page=1`, options),
        fetch(`https://api.themoviedb.org/3/search/tv?query=${encodeURIComponent(searchTerm)}&include_adult=false&language=en-US&page=1`, options),
        fetch(`https://api.themoviedb.org/3/search/person?query=${encodeURIComponent(searchTerm)}&include_adult=false&language=en-US&page=1`, options),
        fetch(`https://api.themoviedb.org/3/search/company?query=${encodeURIComponent(searchTerm)}&page=1`, options),
        fetch(`https://api.themoviedb.org/3/search/collection?query=${encodeURIComponent(searchTerm)}&include_adult=false&language=en-US&page=1`, options),
      ]);

      const movieData = await movieRes.json();
      const seriesData = await seriesRes.json();
      const personData = await personRes.json();
      const companyData = await companyRes.json();
      const collectionData = await collectionRes.json();

      const allResults = [
        ...(movieData.results || []),
        ...(seriesData.results || []),
        ...(personData.results || []),
        ...(companyData.results || []),
        ...(collectionData.results || []),
      ];

      setSearchResults(allResults);
    } catch (err) {
      console.error("Search error:", err);
    } finally {
      setIsLoading(false);
    }
  }

  const clearSearch = () => {
    setSearchTerm("");
    setSearchResults([]);
    setSearchPage("");
  };
  return (
    <SearchContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        getCollection,
        getCompany,
        getMovie,
        getSeries,
        getPerson,
        getAllResults,
        searchResults,
        isLoading,
        clearSearch,
        searchPage,        // ✅ نضيفه هنا
        setSearchPage, 
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;
