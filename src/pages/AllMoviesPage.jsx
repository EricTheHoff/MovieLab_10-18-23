import { useLoaderData } from "react-router-dom";

export default function AllMoviesPage() {
  const {movies} = useLoaderData()

  const movieListItems = movies.map((movie) => {
    <li key={movie.movieId}>
      {movie.title}
    </li>
  })

  return (
    <>
      <h1>All Movies</h1>
      <ul>{movieListItems}</ul>
    </>
  );
}
