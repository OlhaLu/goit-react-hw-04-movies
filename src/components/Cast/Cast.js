import React, { Component } from 'react';
import tvApiService from '../../services/tv-api-service';
const uniqid = require('uniqid');

export default class Cast extends Component {
  state = {
    cast: [],
  };

  componentDidMount() {
    this.fetchMovieCast();
  }

  fetchMovieCast = () => {
    const { movieId } = this.props.match.params.movieId;

    tvApiService.getMovieCredits(movieId).then(cast => {
      this.setState({ cast });
    });
  };

  render() {
    const { cast } = this.state;

    return (
      <>
        {cast.length > 0 && (
          <ul>
            {cast.map(item => (
              <li key={uniqid()}>
                <img
                  src={`https://image.tmdb.org/t/p/w300/${item.profile_path}`}
                  alt="actor_profile"
                  width="100"
                />
                <h3>{item.name}</h3>
                <p>{item.character}</p>
              </li>
            ))}
          </ul>
        )}
      </>
    );
  }
}
