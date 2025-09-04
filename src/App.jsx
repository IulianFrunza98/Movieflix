import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

const Homepage = lazy(() => import("./pages/Homepage"));
const MovieDetails = lazy(() => import("./pages/MovieDetails"));
const Search = lazy(() => import("./pages/Search"));
const FavouriteMovies = lazy(() => import("./pages/FavouriteMovies"));

export default function App() {
  return (
    <Router>
      <Navbar />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route index element={<Homepage />} />
          <Route path="/favourites" element={<FavouriteMovies />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
