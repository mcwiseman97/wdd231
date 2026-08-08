export async function fetchMovies() {
  const response = await fetch('./data/movies.json');

  if (!response.ok) {
    throw new Error('Could not load movie data');
  }

  return response.json();
}
