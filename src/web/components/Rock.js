import React from 'react';
import PropTypes from 'prop-types';
import {
  Row,
  Col,
  Card,
  CardText,
  CardBody,
  CardHeader,
  ListGroup,
  ListGroupItem,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import ErrorMessages from '../../constants/errors';
import Loading from './Loading';
import Error from './Error';

const RockView = ({
  error,
  loading,
  rocks,
  rockId,
}) => {
  // Loading
  if (loading) return <Loading />;

  // Error
  if (error) return <Error content={error} />;

  // Get this Rock from all rocks
  let rock = null;
  if (rockId && rocks) {
    rock = rocks.find(item => parseInt(item.id, 10) === parseInt(rockId, 10));
  }

  // Rock not found
  if (!rock) return <Error content={ErrorMessages.recipe404} />;

  // Build Ingredients listing
  const comments = rock.comments.map(item => (
    <ListGroupItem key={`${item}`}>
      {item.author}
      {': '}
      {item.comment}
    </ListGroupItem>
  ));

  const routes = rock.routes.map(item => (
    <ListGroupItem key={`${item}`}>
      {item.name}
    </ListGroupItem>
  ));

  return (
    <div>
      <Row>
        <Col sm="12">
          <h1>
            {rock.name}
          </h1>
          <p>
            by
            {' '}
            {rock.author}
          </p>
        </Col>
        <Col sm="12">
          <img src={rock.image} alt={`${rock.name}-skałoplan`} style={{ width: '100%', 'max-width': '500px' }} />
        </Col>
      </Row>
      <Row>
        <Col lg="4" className="recipe-view-card">
          <Card>
            <CardHeader>
              Opis
            </CardHeader>
            <CardBody>
              <CardText>
                {rock.description}
              </CardText>
            </CardBody>
          </Card>
        </Col>
        <Col lg="4" className="recipe-view-card">
          <Card>
            <CardHeader>
              Drogi
            </CardHeader>
            <ListGroup className="list-group-flush">
              {routes}
            </ListGroup>
          </Card>
        </Col>
        <Col lg="4" className="recipe-view-card">
          <Card>
            <CardHeader>
              Komentarze
            </CardHeader>
            <ListGroup className="list-group-flush">
              {comments}
            </ListGroup>
          </Card>
        </Col>
      </Row>
      <Row className="pb-3">
        <Col sm="12">
          <Link className="btn btn-secondary" to="/search">
            <i className="icon-arrow-left" />
            {' '}
            Powrót
          </Link>
        </Col>
      </Row>
    </div>
  );
};

RockView.propTypes = {
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  rockId: PropTypes.string.isRequired,
  rocks: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

RockView.defaultProps = {
  error: null,
};

export default RockView;
