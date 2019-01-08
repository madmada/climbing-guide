import React from 'react';
import { Row, Col, Jumbotron, Button } from 'reactstrap';
import { Parallax } from 'react-parallax';
import { Link } from 'react-router-dom';


const image1 = 'https://images.pexels.com/photos/991422/pexels-photo-991422.jpeg';

const Home = ({ member }) => {
  const loggedIn = !!(member && member.email);

  return (
    <Parallax bgImage={image1} strength={500} className="content--fullfill parallax--home">
      <div style={{ height: '100vh' }}>
        <div className="article-title__wrapper">
          <h1 className="article-title mbr-bold">
            Witaj {loggedIn ? `${member.firstName}!` : 'Łojancie!'}
          </h1>
          {!loggedIn && (
          <Row className="pb-4" style={{ alignItems: 'center' }}>
            <Col xs="12" sm="5">
              <Link to="/login">
                <Button>
                  Zaloguj się
                </Button>
              </Link>
            </Col>
            <Col xs="12" sm="2">
              <span className="align-middle text-white">lub</span>
            </Col>
            <Col xs="12" sm="5">
              <Link to="/sign-up">
                <Button color="primary">
                  Zarejestruj
                </Button>
              </Link>
            </Col>
          </Row>
          )}
          <Row>
            <Col>
              <Link to="/search">
                <Button color="info">
                  Szukaj skał
                  {' '}
                  <i className="icon-magnifier" />
                </Button>
              </Link>
            </Col>
          </Row>
        </div>
      </div>
    </Parallax>
  )};

export default Home;
