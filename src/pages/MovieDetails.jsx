import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovieById } from "../services/tmdb";
import { FaHeart } from "react-icons/fa";
import { useFavorites } from "../contexts/FavoriteContext";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    async function fetchMovie() {
      try {
        const res = await getMovieById(id);
        if (!res) {
          setError("Movie not found.");
        } else {
          setMovie(res);
        }
      } catch (err) {
        console.error(err.message);
        setError("Something went wrong.");
      }
    }

    fetchMovie();
  }, [id]);

  if (error) return <p className="text-red-500 text-center p-4">{error}</p>;
  if (!movie) return <p className="text-white text-center p-4">Loading...</p>;

  const liked = isFavorite(movie.id);

  function toggleFavorite() {
    if (liked) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
  }

  return (
    <div className="bg-gray-900 min-h-screen">
      <div className="p-4 max-w-[60rem] m-auto text-center text-white flex flex-col items-center justify-center gap-2">
        <h1 className="text-2xl font-bold">{movie.title}</h1>
        <div className="relative w-fit">
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                : "https://via.placeholder.com/300x450?text=No+Image"
            }
            alt={movie.title}
            className="rounded border-white border-2"
          />

          <FaHeart
            size="1.5em"
            onClick={toggleFavorite}
            className={`absolute top-2 right-2 cursor-pointer transition-colors ${
              liked ? "text-red-500" : "text-white hover:text-red-500"
            }`}
            title={liked ? "Remove from favorites" : "Add to favorites"}
          />
        </div>
        <p className="mt-4 max-w-xl">{movie.overview}</p>
        <p>
          Release date:{" "}
          {new Date(movie.release_date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <p>Rating: ⭐ {movie.vote_average.toFixed(1)}</p>
      </div>
    </div>
  );
}
