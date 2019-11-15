import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import routes from '../routes';
import tvApiService from '../services/tv-api-service';

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

    return (
      <>
        <ul>
          <li>
            <NavLink exact to={routes.HOME_PAGE}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to={routes.MOVIES_PAGE}>Movies</NavLink>
          </li>
        </ul>

        <h2>Trending Movies for a Week</h2>
        <ul>
          {shows.map(show => (
            <li key={show.id}>
              <Link to={`${routes.MOVIES_PAGE}/${show.id}`}>
                {show.title ? show.title : show.name}
              </Link>
            </li>
          ))}
        </ul>
      </>
    );
  }
}
