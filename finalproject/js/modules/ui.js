export function renderGenres(movies, selectElement) {
  if (!selectElement) return;

  const genres = ['All', ...new Set(movies.map((movie) => movie.genre))];
  selectElement.innerHTML = genres.map((genre) => `<option value="${genre}">${genre}</option>`).join('');
}

export function renderMovies(movies, container, favorites) {
  if (!container) return;

  container.innerHTML = movies.map((movie) => {
    const isActive = favorites.includes(movie.id);
    return `
      <article class="movie-card" data-movie-id="${movie.id}">
        <button class="favorite-btn ${isActive ? 'is-active' : ''}" type="button" aria-label="Save ${movie.title} as favorite">★</button>
        <img src="${movie.image}" alt="${movie.title} poster" loading="lazy">
        <div class="movie-card__body">
          <h3>${movie.title}</h3>
        </div>
      </article>
    `;
  }).join('');
}

export function renderFavorites(favorites, container, movies) {
  if (!container) return;

  if (favorites.length === 0) {
    container.innerHTML = '<li class="status">No favorites yet.</li>';
    return;
  }

  container.innerHTML = favorites.map((movieId) => {
    const movie = movies.find((item) => item.id === movieId);
    return movie ? `<li>${movie.title}</li>` : '';
  }).filter(Boolean).join('');
}

export function openModal(modal, movie) {
  if (!modal) return;

  const streamingText = Array.isArray(movie.streaming) && movie.streaming.length > 0
    ? movie.streaming.join(', ')
    : 'Not listed';

  modal.querySelector('.modal-title').textContent = movie.title;
  modal.querySelector('.modal-body').innerHTML = `
    <p>${movie.description}</p>
    <p><strong>Genre:</strong> ${movie.genre}</p>
    <p><strong>Year:</strong> ${movie.year}</p>
    <p><strong>Rating:</strong> ${movie.rating}</p>
    <p><strong>Streaming:</strong> ${streamingText}</p>
  `;
  modal.classList.add('is-open');
}

export function closeModal(modal) {
  if (!modal) return;
  modal.classList.remove('is-open');
}

export function loadFavorites() {
  return JSON.parse(localStorage.getItem('favoriteMovies') || '[]');
}

export function saveFavorites(favorites) {
  localStorage.setItem('favoriteMovies', JSON.stringify(favorites));
}

export function toggleFavorite(movieId, favorites) {
  return favorites.includes(movieId)
    ? favorites.filter((id) => id !== movieId)
    : [...favorites, movieId];
}
