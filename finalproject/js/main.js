import { fetchMovies } from './modules/data.js';
import { renderGenres, renderMovies, renderFavorites, openModal, closeModal, loadFavorites, saveFavorites, toggleFavorite } from './modules/ui.js';

const state = {
  movies: [],
  favorites: loadFavorites(),
};

const genreFilter = document.querySelector('#genre-filter');
const movieGrid = document.querySelector('#movie-grid');
const favoriteList = document.querySelector('#favorite-list');
const modal = document.querySelector('#movie-modal');
const modalClose = document.querySelector('#modal-close');

async function init() {
  try {
    const movies = await fetchMovies();
    state.movies = movies;
    renderGenres(movies, genreFilter);
    renderMovies(movies, movieGrid, state.favorites);
    renderFavorites(state.favorites, favoriteList, state.movies);
  } catch (error) {
    movieGrid.innerHTML = '<p class="status">Unable to load movies right now.</p>';
    console.error(error);
  }
}

if (genreFilter) {
  genreFilter.addEventListener('change', (event) => {
    const selectedGenre = event.target.value;
    const filteredMovies = selectedGenre === 'All'
      ? state.movies
      : state.movies.filter((movie) => movie.genre === selectedGenre);
    renderMovies(filteredMovies, movieGrid, state.favorites);
  });
}

document.addEventListener('click', (event) => {
  const card = event.target.closest('[data-movie-id]');

  if (!card) return;

  const movieId = Number(card.dataset.movieId);
  const movie = state.movies.find((item) => item.id === movieId);

  if (event.target.closest('.favorite-btn')) {
    state.favorites = toggleFavorite(movieId, state.favorites);
    saveFavorites(state.favorites);
    renderMovies(state.movies, movieGrid, state.favorites);
    renderFavorites(state.favorites, favoriteList, state.movies);
    return;
  }

  if (movie) {
    openModal(modal, movie);
  }
});

if (modalClose) {
  modalClose.addEventListener('click', () => closeModal(modal));
}

if (modal) {
  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeModal(modal);
    }
  });
}

init();
