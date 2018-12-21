import React from 'react';
import PropTypes from 'prop-types';
import {
  Row,
  Col,
  Table,
} from 'reactstrap';
import { Redirect } from 'react-router';
import rockTypes from '../../constants/rockTypes';
import regionTypes from '../../constants/regionTypes';
import { renderRatingStars, getRate, timestampToDate } from '../../helpers';
import Error from './Error';

class RockListing extends React.Component {
  static propTypes = {
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    rocks: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  }

  static defaultProps = {
    error: null,
  }

  constructor(props) {
    super(props);
    this.handleRowClick = this.handleRowClick.bind(this);
    this.state = {
      redirect: false,
      link: '',
    };
  }

  handleRowClick = (id) => {
    console.log('klikłem się');
    this.setState({
      redirect: true,
      link: `/rock/${id}`,
    });
  }

  render() {
    const { error, loading, rocks  } = this.props;

    if (this.state.redirect) return <Redirect push to={this.state.link} />;

    const row = rocks.map(item => (

      <tr onClick={() => this.handleRowClick(item.id)}>
        <th scope="row">{item.name}</th>
        <td>{regionTypes[item.localization.region]}</td>
        <td>{rockTypes[item.rocktype]}</td>
        <td>{timestampToDate(item.date)}</td>
        <td>{item.ratingsum === 0 ? ('Brak ocen') : (renderRatingStars(getRate(item.ratingsum, item.votes)))}</td>
      </tr>
    ));

    // Error
    if (error) return <Error content={error} />;

    // Show Listing
    return (
      <div>
        <Row>
          <Col sm="12">
            <h1>
              Skały
            </h1>
            <p>
              Tutaj będzie search bar i filtry.
            </p>
          </Col>
        </Row>
        <Row className={loading ? 'content-loading' : ''}>
          <Table className="rock-list" responsive hover>
            <thead>
              <tr>
                <th>Nazwa</th>
                <th>Województwo</th>
                <th>Typ skały</th>
                <th>Dodano</th>
                <th>Ocena</th>
              </tr>
            </thead>
            <tbody>
              {row}
            </tbody>
          </Table>
        </Row>
      </div>
    );
  }
}

export default RockListing;
