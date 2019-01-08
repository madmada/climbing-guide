import React, { Fragment } from 'react';
import {
  Button,
  Row,
  Col,
} from 'reactstrap';
import StarRatings from 'react-star-ratings';

class Rating extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 0,
    };

    this.changeRating = this.changeRating.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  changeRating(newRating) {
    this.setState({
      rating: newRating,
    });
  }

  handleSubmit() {
    this.props.onSubmit(this.state.rating);
  }

  render() {
    return (
      <Fragment>
        <StarRatings
          rating={this.state.rating}
          starRatedColor="orange"
          changeRating={this.changeRating}
          numberOfStars={5}
          name="rating"
        />
        <Button className="my-4" color="info" onClick={this.handleSubmit}>Oceń</Button>
      </Fragment>
    );
  }
}

export default Rating;
