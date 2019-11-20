import React, { Component } from 'react';
import tvApiService from '../../services/tv-api-service';
import styles from './Reviews.module.css';

export default class Reviews extends Component {
  state = {
    reviews: [],
  };

  componentDidMount() {
    this.fetchMovieReviewes();
  }

  fetchMovieReviewes = () => {
    const { movieId } = this.props.match.params;

    tvApiService.getMovieReviews(movieId).then(reviews => {
      this.setState({ reviews });
    });
  };

  render() {
    const { reviews } = this.state;

    return (
      <>
        {reviews && (
          <ul className={styles.discriptions}>
            {reviews.map(item => (
              <li key={item.id}>
                <h3>{item.author}</h3>
                <p>{item.content}</p>
              </li>
            ))}
          </ul>
        )}
      </>
    );
  }
}
