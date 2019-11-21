import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import Cast from '../../components/Cast/Cast';
import Reviews from '../../components/Reviews/Reviews';
import routes from '../../routes';
import tvApiService from '../../services/tv-api-service';
import styles from './MovieDetailsPage.module.css';

export default class ShowDetailsPage extends Component {
  state = {
    shows: null,
  };

  componentDidMount() {
    this.fetchDetails();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.location === this.props.location) {
      return;
    }

    this.fetchDetails();
  }

  fetchDetails = () => {
    const movieId = this.props.match.params.movieId;

    tvApiService.getMovieDetails(movieId).then(shows => {
      this.setState({ shows });
    });
  };

  handleGoHomePage = () => {
    const { state } = this.props.location;
    const { history } = this.props;

    if (state) {
      this.props.history.push(state.from);
      return;
    }

    history.push(`${routes.HOME_PAGE}`);
  };

  render() {
    const { match, location } = this.props;
    const { shows } = this.state;

    return (
      <div>
        <button
          className={styles.button}
          type="button"
          onClick={this.handleGoHomePage}
        >
          <span> Go Prev Page</span>
        </button>
        <h2>Movies Details</h2>
        {shows && (
          <>
            <img
              className={styles.img}
              src={`https://image.tmdb.org/t/p/w300/${shows.poster_path}`}
              width="280"
              alt={shows.title}
            />
            <h3>{shows.original_title}</h3>
            <p>User score: {shows.popularity.toFixed(1)}%</p>
            <h3>Overview</h3>
            <p>{shows.overview}</p>
            <h3>Genres</h3>
            <p>{shows.genres.map(item => `${item.name} `)}</p>
            <p>{match.params.showId}</p>
          </>
        )}
        <h3>Click for more information about film</h3>
        <ul className={styles.list}>
          <li>
            <Link
              to={{
                pathname: `${match.url}/cast`,
                state: { from: location },
              }}
            >
              CAST
            </Link>
          </li>
          <li>
            <Link
              to={{
                pathname: `${match.url}/reviews`,
                state: { from: location },
              }}
            >
              REVIEWS
            </Link>
          </li>
        </ul>
        <Switch>
          <Route path={`${match.path}/cast`} component={Cast} />
          <Route path={`${match.path}/reviews`} component={Reviews} />
        </Switch>
      </div>
    );
  }
}
