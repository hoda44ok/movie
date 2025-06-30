import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home/Home";
import Error from "./components/Error/Error";
import Layout from "./components/Layout/Layout";
import AuthContextProvider from "./Context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { SearchProvider } from "./Context/SearchContext";
import Trending from "./components/TrendingPage/TrendingPage";
import MoviePage from "./components/MoviePage/MoviePage";
import Trailer from "./components/Trailer/Trailer";
import WatchNow from "./components/WatchNow/WatchNow";
import KidsMovies from "./components/KidsMovies/KidsMovies";
import SeriesPage from "./components/SeriesPage/SeriesPage";
import CollectionPage from "./components/CollectionPage/CollectionPage";
import MovieDetails from "./components/MovieDetails/MovieDetails";
import SeriesDetails from "./components/SeriesDetails/SeriesDetails";
import SeasonPage from "./components/SeasonPage/SeasonPage";
import NowPlaying from "./components/NowPlaying/NowPlaying";
import { Toaster } from "react-hot-toast";
import LocalFavoritesProvider from "./components/LocalFavoritesContext/LocalFavoritesContext";
import LocalFavoritesPage from "./components/LocalFavoritesPage/LocalFavoritesPage";
import TrendingPage from "./components/TrendingPage/TrendingPage";



const App = () => {


  const x = new QueryClient()
  const router = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        { path: "/", element: <ProtectedRoute><Home /></ProtectedRoute> },
        { path: "trending", element: <ProtectedRoute><Trending /></ProtectedRoute> },
        { path: "series", element: <ProtectedRoute><SeriesPage /></ProtectedRoute> },
        { path: "movies", element: <ProtectedRoute><MoviePage /></ProtectedRoute> },
        { path: "collection", element: <ProtectedRoute><CollectionPage /></ProtectedRoute> },
        { path: "/movie/:id", element: <ProtectedRoute><MovieDetails /></ProtectedRoute> },
        { path: "/tv/:id", element: <ProtectedRoute><SeriesDetails /></ProtectedRoute> },
        { path: "/series/:tvId/season/:seasonNumber", element: <ProtectedRoute><SeasonPage /></ProtectedRoute> },
        { path: "trailer", element: <ProtectedRoute><Trailer /></ProtectedRoute> },
        { path: "kids", element: <ProtectedRoute><KidsMovies /></ProtectedRoute> },
        { path: "page", element: <ProtectedRoute><TrendingPage /></ProtectedRoute> },
        { path: "now-playing", element: <ProtectedRoute><NowPlaying /></ProtectedRoute> },
        { path: "favorites", element: <ProtectedRoute><LocalFavoritesPage /></ProtectedRoute> },
        { path: "/watch/:id", element: <ProtectedRoute>< WatchNow /></ProtectedRoute> },
        { path: "*", element: <Error /> },
      ],
    },
  ]);

  return (
    <SearchProvider>
      <QueryClientProvider client={x}>
        <AuthContextProvider>
          <LocalFavoritesProvider>

            <Toaster position="top-right" />
            <RouterProvider router={router} />
          </LocalFavoritesProvider>

        </AuthContextProvider>
      </QueryClientProvider>
    </SearchProvider>


  );
};

export default App;
