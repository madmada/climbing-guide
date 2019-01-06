import React from 'react';
import PropTypes from 'prop-types';
import {
  Row,
  Col,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
} from 'reactstrap';
import { Parallax } from 'react-parallax';
import { Link } from 'react-router-dom';
import Error from './Error';

const image1 = 'https://images.pexels.com/photos/889968/pexels-photo-889968.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';

const ArticleListing = ({ error, loading, rocks }) => {

  if (error) return <Error content={error} />;

  const cards = rocks.map(item => (
    <Card key={`${item.id}`}>
      <Link to={`/rock/${item.id}`}>
        <CardImg top src={item.imageUrl} alt={item.title} />
      </Link>
      <CardBody>
        <CardTitle>
          {item.name}
        </CardTitle>
        <CardText className="artice-card__description">
          {item.description}
        </CardText>
        <Link className="btn btn-primary" to={`/rock/${item.id}`}>
          Otwórz
          {' '}
          <i className="icon-arrow-right" />
        </Link>
      </CardBody>
    </Card>
  ));

  return (
    <div>
      <Parallax bgImage={image1} strength={500} className="content--fullfill parallax--articles">
        <div style={{ height: 250 }}>
          <div className="article-title__wrapper">
            <h1 className="article-title mbr-bold">
              Artykuły
            </h1>
            <h3 className="font-weight-light" style={{ color: '#adadad' }}>
              Przeglądaj nasze najnowsze skały
            </h3>
          </div>
        </div>
      </Parallax>
      <Row className={loading ? 'content-loading' : ''}>
        <Col sm="12" className="card-columns mt-3">
          {cards}
        </Col>
      </Row>
    </div>
  );
};

ArticleListing.propTypes = {
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  rocks: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

ArticleListing.defaultProps = {
  error: null,
};

export default ArticleListing;
