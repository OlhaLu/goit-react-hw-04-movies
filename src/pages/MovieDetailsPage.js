import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import Cast from '../components/Cast';
import Reviews from '../components/Reviews';
import routes from '../routes';
import tvApiService from '../services/tv-api-service';

export default class ShowDetailsPage extends Component {
  state = {
    shows: [],
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
    const showId = this.props.match.params;

    tvApiService.fetchShowDetails(showId).then(shows => {
      this.setState({ shows });
    });
  };

  render() {
    const { shows } = this.state;
    const { match, location } = this.props;

    return (
      <div>
        <h2>Show Movies Details</h2>

        {shows && (
          <>
            <img src={shows.image.original} width="280" />
            <alt>'shows information'</alt>
            <h3>{shows.name}</h3>
            <p>{match.params.showId}</p>
            <p>User score: {shows.popularity}%</p>
            <p>Overview: {shows.overview}</p>
          </>
        )}
        <p>More iInformation</p>
        <ul>
          <li>
            <Link
              to={{
                pathname: `${match.url}/${routes.MOVIE_CAST_PAGE}`,
                state: { from: location },
              }}
            >
              CAST
            </Link>
          </li>
          <li>
            <Link
              to={{
                pathname: `${match.url}/${routes.MOVIE_REVIEWS_PAGE}`,
                state: { from: location },
              }}
            >
              REVIEWS
            </Link>
          </li>
        </ul>

        <Route
          path={`${match.path}/${routes.MOVIE_CAST_PAGE}`}
          component={Cast}
        />
        <Route
          path={`${match.path}/${routes.MOVIE_REVIEWS_PAGE}`}
          component={Reviews}
        />
      </div>
    );
  }
}
