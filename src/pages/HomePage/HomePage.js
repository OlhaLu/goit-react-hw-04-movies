import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../../routes';
import tvApiService from '../../services/tv-api-service';
import styles from './HomePage.module.css';

export default class HomePage extends Component {
  state = {
    shows: [],
  };

  componentDidMount() {
    this.fetchTrendingMovies();
  }

  fetchTrendingMovies = () => {
    const showTrendingMovies = this.props.match.params;

    tvApiService.getTrending(showTrendingMovies).then(shows => {
      this.setState({ shows });
    });
  };

  render() {
    const { shows } = this.state;
    const { location } = this.props;

    return (
      <>
        <h2 className={styles.header}>Trending Movies for a Week</h2>
        <ul>
          {shows.map(show => (
            <li key={show.id} className={styles.list}>
              <Link
                to={{
                  pathname: `${routes.MOVIES_PAGE}/${show.id}`,
                  state: { from: location },
                }}
              >
                {show.title ? show.title : show.name}
              </Link>
            </li>
          ))}
        </ul>
      </>
    );
  }
}
