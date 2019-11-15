import React, { Component } from 'react';
import tvApiService from '../services/tv-api-service';
const uniqid = require('uniqid');

export default class Cast extends Component {
  state = {
    cast: [],
  };

  componentDidMount() {
    this.fetchMovieCast();
  }

  fetchMovieCast = () => {
    const { movieId } = this.props.match.params;

    tvApiService.fetchMovieCast(movieId).then(cast => {
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
                  src={`https://image.tmdb.org/t/p/w138_and_h175_face/${item.profile_path}`}
                  alt="actor"
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
