import React from 'react';
import PropTypes from 'prop-types';
import {
  Row,
  Col,
  Table,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import Error from './Error';

const RockListing = ({ error, loading, rocks }) => {
  // Error
  if (error) return <Error content={error} />;

  // Build Cards for Listing
  const row = rocks.map(item => (

    // <Link to={`/rocks/${item.id}`}>
    <tr>
      <th scope="row">{item.name}</th>
      <td>{item.localization.region}</td>
      <td>{item.rocktype}</td>
      <td>{item.date}</td>
      <td>{item.ratingsum}</td>
    </tr>
    // </Link>
  ));

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
};

RockListing.propTypes = {
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  rocks: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

RockListing.defaultProps = {
  error: null,
};

export default RockListing;
