import { useEffect, useState } from "react";
import { getPopularMovies } from "../services/tmdb";
import MoviesList from "../components/MoviesList";

export default function Homepage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchPopularMovies() {
      try {
        setLoading(true);
        const res = await getPopularMovies();
        setMovies(res);
      } catch (err) {
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPopularMovies();
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen">
      <h1 className="text-white font-bold text-2xl p-4">
        Popular movies and TV Shows
      </h1>
      {loading && <p className="text-white font-bold my-2">Loading...</p>}
      <MoviesList movies={movies} />
    </div>
  );
}
