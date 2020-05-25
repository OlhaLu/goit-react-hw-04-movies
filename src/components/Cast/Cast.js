import React, { Component } from 'react';
import tvApiService from '../../services/tv-api-service';
import styles from './Cast.module.css';
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

    tvApiService.getMovieCredits(movieId).then(cast => {
      this.setState({ cast });
    });
  };

  render() {
    const { cast } = this.state;

    return (
      <section className={styles.cast}>
        {cast && (
          <ul className={styles.list}>
            {cast.map(item => (
              <li className={styles.item} key={uniqid()}>
                <p>
                  ACTOR
                  <br />
                  {item.name}
                </p>
                <p>Movie character __ {item.character}</p>
                <img
                  src={`${
                    item.profile_path === null
                      ? 'http://placehold.it/150x100'
                      : 'https://image.tmdb.org/t/p/w300/' + item.profile_path
                  }`}
                  alt="actor_profile"
                  width="100"
                />
              </li>
            ))}
          </ul>
        )}
      </section>
    );
  }
}
