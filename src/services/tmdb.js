const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_API_KEY;

export async function getPopularMovies() {
  try {
    const res = await fetch(`${BASE_URL}/trending/all/day?api_key=${API_KEY}`);

    if (!res.ok) throw new Error("Failed to fetch popular movies");

    const data = await res.json();
    return data.results;
  } catch (err) {
    console.error(err.message);
    return [];
  }
}

export async function searchMovie(query) {
  try {
    const res = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
        query
      )}`
    );

    if (!res.ok) throw new Error("Failed to fetch movies");

    const data = await res.json();
    console.log(data);
    return data.results;
  } catch (err) {
    console.error(err.message);
    return [];
  }
}

export async function getMovieById(id) {
  try {
    const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);

    if (!res.ok) {
      throw new Error("Failed to fetch movie details");
    }

    const data = await res.json();
    console.log(data);
    return data;
  } catch (err) {
    console.error("getMovieById error:", err.message);
    return null;
  }
}
