import React, { Component } from 'react';
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
          <div className={styles.detailsContainer}>
            <img
              className={styles.img}
              src={`https://image.tmdb.org/t/p/w300/${value.profile_path}`}
              width="300"
              alt={value.title}
            />
            <div className={styles.discriptions}>
              <h3>Popularity</h3>
              <p>{value.popularity}</p>
              <h3>Place of birth</h3>
              <p>{value.place_of_birth}</p>
              <h3>Birthday</h3>
              <p>{value.birthday}</p>
              <h3>Biography</h3>
              <p>{value.biography}</p>
              <p>{value.homepage}</p>
            </div>
          </div>
        )}
      </div>
    );
  }
}
