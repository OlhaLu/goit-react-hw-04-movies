import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import qs from 'qs';
import SearchMovies from '../components/SearchMovies';
import routes from '../routes';
import tvApiService from '../services/tv-api-service';

const getQueryPramsFromProps = props =>
  qs.parse(props.location.search.slice(1));

export default class ShowMoviesPage extends Component {
  state = {
    value: [],
  };

  componentDidMount() {
    const queryParams = getQueryPramsFromProps(this.props);
    if (!queryParams.query) {
      return;
    }
  
    tvApiService.searchMovies(queryParams.query).then(value => {
      this.setState({ value });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { query: prevQuery } = getQueryPramsFromProps(prevProps);
    const { query: nextQuery } = getQueryPramsFromProps(this.props);

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
    const { location } = this.props;

    return (
      <div>
        <button type="button" onClick={this.handleGoHomePage}>
        <span> Go Home Page</span>
        </button>
        <h1>Movies Page</h1>
        <SearchMovies onSearch={this.setSearchQuery} />
        <ul>
          {this.state.value.map(show => (
            <li key={show.id}>
              <Link 
               to={{
                pathname: `${routes.MOVIES_PAGE}/${show.id}`,
                state: { from: location },
              }}
              >
              {show.name ? show.name : show.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
