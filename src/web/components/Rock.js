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
    rock = Object.values(rocks).find(item => item.id === rockId);
  }

  // Rock not found
  if (!rock) return <Error content={ErrorMessages.rock404} />;

  // Build Ingredients listing
  const comments = rock.comments ? rock.comments.map((item, index) => (
    <ListGroupItem key={`comment-${index}`}>
      {item.author}
      {': '}
      {item.comment}
    </ListGroupItem>
  )) : <ListGroupItem>Brak komentarzy</ListGroupItem>;

  const routes = rock.routes.map(item => (
    <ListGroupItem key={`${item.name}`}>
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
            autor:
            {' '}
            {rock.author}
          </p>
        </Col>
        <Col sm="12">
          <img src={rock.imageUrl} alt={`${rock.name}-skałoplan`} style={{ width: '100%', maxWidth: '500px' }} />
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
          <Link className="btn btn-secondary" to="/rocks">
            <i className="icon-arrow-left" />
            {' '}
            Powrót do szukania
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
  rocks: PropTypes.objectOf(PropTypes.shape()).isRequired,
};

RockView.defaultProps = {
  error: null,
};

export default RockView;
