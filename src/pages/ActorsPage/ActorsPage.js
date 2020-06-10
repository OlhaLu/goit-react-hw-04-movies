import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import qs from 'qs';
import SearchMovies from '../../components/SearchMovies/SearchMovies';
import tvApiService from '../../services/tv-api-service';
import styles from './ActorsPage.module.css';

const getQueryPramsFromProps = props =>
  qs.parse(props.location.search.slice(1));

export default class ShowActorsPage extends Component {
  state = {
    value: [],
  };

  componentDidMount() {
    const queryParams = getQueryPramsFromProps(this.props);
    if (!queryParams.query) {
      return;
    }

    tvApiService.searchActors(queryParams.query).then(value => {
      this.setState({ value });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { query: prevQuery } = getQueryPramsFromProps(prevProps);
    const { query: nextQuery } = getQueryPramsFromProps(this.props);

    if (prevQuery === nextQuery) {
      return;
    }

    tvApiService.searchActors(nextQuery).then(value => {
      this.setState({ value });
    });
  }

  setSearchQuery = query => {
    this.props.history.push({
      ...this.props.location,
      search: `query=${query}`,
    });
  };

  render() {
    const { location, match } = this.props;

    return (
      <div>
        <h2 className={styles.header}>Actors</h2>
        <SearchMovies onSearch={this.setSearchQuery} />
        <ul className={styles.searchList}>
          {this.state.value.map(person => (
            <li key={person.id} className={styles.list}>
              <Link
                to={{
                  pathname: `${match.url}/${person.id}`,
                  state: { from: location },
                }}
              >
                {person.name ? person.name : person.title}
                <br />
                <img
                  src={`${
                    person.profile_path === null
                      ? 'http://placehold.it/150x200'
                      : 'https://image.tmdb.org/t/p/w300/' + person.profile_path
                  }`}
                  width="150"
                  alt={person.title}
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
