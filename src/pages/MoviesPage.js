import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import tvApiService from '../services/tv-api-service';

export default class ShowMoviesPage extends Component {
  state = {
    value: [],
  };

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search).get('query');

    if (!query) {
      return;
    }

    tvApiService.searchMovies(query).then(value => {
      this.setState({ value });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = new URLSearchParams(prevProps.location.search).get(
      'query',
    );
    const nextQuery = new URLSearchParams(this.props.location.search).get(
      'query',
    );

    if (prevQuery === nextQuery) {
      return;
    }

    tvApiService.searchMovies(nextQuery).then(value => {
      this.setState({ value });
    });
  }

  setSearchQuery = query => {
    this.props.history.push({
      ...this.props.location,
      search: `query=${query}`,
    });
  };

  onChange = e => {
    this.setState({ value: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    this.props.onSearch(this.state.value);
    this.setState({ value: '' });
  };

  render() {
    const { match } = this.props;
    const { value } = this.state;
    return (
      <div>
        <h1>Movies Page</h1>
        <form onSubmit={this.onSubmit}>
          <input type="text" value={value} onChange={this.onChange} />
          <button type="submit">Search movies</button>
        </form>
        <ul>
          {this.state.shows.map(show => (
            <li key={show.id}>
              <Link to={`${match.url}/${show.id}`}>{show.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
