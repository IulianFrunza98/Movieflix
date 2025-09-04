import { useEffect, useState } from "react";
import { searchMovie } from "../services/tmdb";
import MoviesList from "../components/MoviesList";

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      async function fetchData() {
        const trimmedQuery = query.trim();
        if (!trimmedQuery) {
          setResults([]);
          setLoading(false);
          return;
        }

        try {
          setLoading(true);
          const res = await searchMovie(trimmedQuery);
          setResults(Array.isArray(res) ? res : []);
        } catch (err) {
          console.error(err.message);
          setResults([]);
        } finally {
          setLoading(false);
        }
      }

      fetchData();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [query]);

  return (
    <div className="bg-gray-900 min-h-screen">
      <input
        className="w-full my-2 p-2 border-2 border-white text-white outline-0 rounded"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {loading && <p className="text-white font-bold my-2">Searching...</p>}
      {!loading && query.trim() !== "" && (
        <p className="text-white font-bold px-3 mb-4">
          Search results for: <strong>{query}</strong>
        </p>
      )}

      <MoviesList movies={results} />
    </div>
  );
}
