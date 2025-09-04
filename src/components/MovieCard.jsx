import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { useFavorites } from "../contexts/FavoriteContext";

export default function MovieCard({ movie }) {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  const liked = isFavorite(movie.id);

  function toggleFavorite(e) {
    e.preventDefault();
    if (liked) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
  }

  return (
    <Link to={`/movie/${movie.id}`} className="relative block">
      <li className="bg-white rounded shadow-md p-2 text-center relative">
        <img
          className="rounded mb-2 w-full h-auto object-cover"
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w200/${movie.poster_path}`
              : "https://via.placeholder.com/200x300?text=No+Image"
          }
          alt={movie.title || movie.name}
        />
        <h2 className="text-sm font-bold text-gray-800">
          {movie.title || movie.name}
        </h2>
        <p className="text-xs text-gray-600">
          ⭐ {movie.vote_average?.toFixed(1) ?? "N/A"}
        </p>
        <FaHeart
          size="1.5em"
          onClick={toggleFavorite}
          className={`absolute top-2 right-2 cursor-pointer transition-colors ${
            liked ? "text-red-500" : "text-white hover:text-red-500"
          }`}
        />
      </li>
    </Link>
  );
}
