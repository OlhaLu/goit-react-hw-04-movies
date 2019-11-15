const apiKey = '5979b2b5e52ab9071f018ce1261af041';

const getTrending = () =>
  fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`)
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      throw new Error('not found');
    })
    .then(data => data.results)
    .catch(err => {
      throw err;
    });

const searchMovies = query =>
  fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`,
  )
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      throw new Error('not found');
    })
    .then(data => data.results)
    .catch(err => {
      throw err;
    });

const getMovieDetails = movieId =>
  fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`)
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      throw new Error('not found');
    })
    .catch(err => {
      throw err;
    });

const getMovieCredits = movieId =>
  fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`,
  )
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      throw new Error('not found');
    })
    .then(data => data.cast)
    .catch(err => {
      throw err;
    });

const getMovieReviews = movieId =>
  fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${apiKey}`,
  )
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      throw new Error('not found');
    })
    .then(data => data.results)
    .catch(err => {
      throw err;
    });

export default {
  getTrending,
  searchMovies,
  getMovieDetails,
  getMovieCredits,
  getMovieReviews,
};
