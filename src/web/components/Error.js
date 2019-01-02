import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

const Error = ({ title, content }) => (
  <Row>
    <Col lg="4">
      <h2>
        {title}
      </h2>
      <p>
        {content}
      </p>
      <p>
        <Link to="/" className="btn btn-primary">
          Powrót na właściwy szlak
        </Link>
      </p>
    </Col>
  </Row>
);

Error.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
};

Error.defaultProps = {
  title: 'Błąd!',
  content: 'Przepraszamy pojawił się nieznany błąd.',
};

export default Error;
