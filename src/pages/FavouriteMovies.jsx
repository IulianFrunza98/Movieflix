import MovieCard from "../components/MovieCard";
import { useFavorites } from "../contexts/FavoriteContext";

export default function Favorites() {
  const { favorites } = useFavorites();

  if (favorites.length === 0)
    return <p className="text-center mt-8">You have no favorite movies yet.</p>;

  return (
    <div className="bg-gray-900 min-h-screen">
      <ul className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
        {favorites.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </ul>
    </div>
  );
}
