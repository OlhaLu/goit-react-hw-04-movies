import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import Cast from '../../components/Cast/Cast';
import Reviews from '../../components/Reviews/Reviews';
import tvApiService from '../../services/tv-api-service';

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

  render() {
    const { match, location } = this.props;
    const { shows } = this.state;

    return (
      <div>
        <h2>Show Movies Details</h2>
    {shows && (
      <>
      <img 
      src={`https://image.tmdb.org/t/p/w300/${shows.poster_path}`} 
      width="280" 
      alt={shows.title} />
      <h3>{shows.original_title}</h3>
      <p>User score: {shows.popularity}%</p>
      <h3>Overview</h3>
      <p>{shows.overview}</p>
      <h3>Genres</h3>
      <p>{shows.genres.map(item => ` ${item.name} `)}</p>
      <p>{match.params.showId}</p>
      </>
    )}
        <p>More iInformation</p>
        <ul>
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

        <Route
          path={`${match.path}/cast`}
          component={Cast}
        />
        <Route
          path={`${match.path}/reviews`}
          component={Reviews}
        />
      </div>
    );
  }
}
