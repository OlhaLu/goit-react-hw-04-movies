import React, { Component } from 'react';

export default class SearchMovies extends Component {
  state = { value: '' };

  onChange = e => {
    this.setState({ value: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    this.props.onSearch(this.state.value);
    this.setState({ value: '' });
  };

  render() {
    const { value } = this.state;
    return (
      <form onSubmit={this.onSubmit} onSearch={this.setSearchQuery}>
        <input type="text" value={value} onChange={this.onChange} />
        <button type="submit">Search movies</button>
      </form>
    );
  }
}
