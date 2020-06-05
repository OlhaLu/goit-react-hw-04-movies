import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import tvApiService from '../../services/tv-api-service';
import styles from './ActorDetailPage.module.css';

export default class ActorDetailPage extends Component {
  state = {
    value: null,
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
    const actorId = this.props.match.params.actorId;

    tvApiService.getActorDetails(actorId).then(value => {
      this.setState({ value });
    });
  };

  render() {
    const { value } = this.state;

    return (
      <div>
        <h2 className={styles.title}>More Information about Actor</h2>
        {value && (
          <>
            <img
              src={`https://image.tmdb.org/t/p/w300/${value.profile_path}`}
              width="250"
              alt={value.title}
            />
            <h3>Popularity</h3>
            <p>{value.popularity}</p>
            <h3>From</h3>
            <p>{value.place_of_birth}</p>
            <h3>{value.biography}</h3>
          </>
        )}
      </div>
    );
  }
}
