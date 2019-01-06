import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Row,
  Col,
  Card,
  Button,
  CardText,
  CardTitle,
  CardBody,
  CardHeader,
  ListGroup,
  ListGroupItem,
  Form,
  FormGroup,
  Input,
  Modal,
} from 'reactstrap';
import { Parallax } from 'react-parallax';
import ErrorMessages from '../../constants/errors';
import Loading from './Loading';
import Error from './Error';
import GoogleMap from './GoogleMap';
import { renderRatingStars, getRate, getGrade, compareNames } from '../../helpers';
import scale from '../../constants/cracowScale';
import Rating from './RatingStars';

const image1 = 'https://images.pexels.com/photos/303040/pexels-photo-303040.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';


class RockView extends React.Component {
  static propTypes = {
    member: PropTypes.shape({
      email: PropTypes.string,
      uid: PropTypes.string,
    }),
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    onFormSubmit: PropTypes.func.isRequired,
    rockId: PropTypes.string.isRequired,
    rocks: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  }

  static defaultProps = {
    error: null,
    member: {},
  }

  constructor(props) {
    super(props);
    this.state = {
      index: '',
      gradesum: '',
      votes: '',
      rock: this.props.rocks.find(item => item.id === this.props.rockId),
      ratingOpen: false,
      rating: '',
      comment: '',
      author: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCommentChange = this.handleCommentChange.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  handleChange = (event) => {
    const newGrade = event.target.name === 'grade' && Object.values(scale).findIndex(value => value === event.target.value);
    const routeIndex = event.target.tabIndex;
    const oldGrade = this.state.rock.routes[routeIndex].gradesum;
    const oldVotes = this.state.rock.routes[routeIndex].votes;
    const gradesum = newGrade + oldGrade;
    if (newGrade) {
      this.setState({
        index: routeIndex,
        gradesum: gradesum,
        votes: oldVotes + 1,
        rating: '',
      });
    }
  }

  handleCommentChange = (event) => {
    const { member } = this.props;
    this.setState({
      [event.target.name]: event.target.value,
      author: `${member.firstName} ${member.lastName}`,
      rating: '',
      gradesum: '',
    });
  }

  handleSubmit = (event) => {
    if (event) event.preventDefault();
    const { onFormSubmit } = this.props;
    onFormSubmit(this.state).then(() => this.setState({ comment: '' }));
  }

  async handleNewRating(newRate) {
    const { ratingsum, votes } = this.state.rock;
    const oldRate = ratingsum;
    const newRatingSum = oldRate + newRate;
    await this.setState({
      rating: newRatingSum,
      votes: votes + 1,
      gradesum: '',
      comment: '',
    });
    this.toggle();
    this.handleSubmit();
  }


  toggle() {
    this.setState({
      ratingOpen: !this.state.ratingOpen,
    });
  }

  render() {
    const { rock, ratingOpen, comment } = this.state;
    const {
      error,
      loading,
      member,
    } = this.props;

    const loggedIn = !!(member && member.email);

    const renderScale = Object.values(scale).map(item => <option key={item}>{item}</option>);

    // Loading
    if (loading) return <Loading />;

    // Error
    if (error) return <Error content={error} />;

    // Rock not found
    if (!rock) return <Error content={ErrorMessages.rock404} />;

    const comments = rock.comments ? rock.comments.map((item, index) => (
      <ListGroupItem key={`comment-${index}`}>
        <Row>
          <Col xs="2" sm="1" style={{ textAlign: 'end' }}>
            <Button color="success" disabled><i className="icon-user" /></Button>
          </Col>
          <Col style={{ alignSelf: 'center' }}>
            <strong>{item.author}</strong>
            {': '}
            {item.comment}
          </Col>
        </Row>
      </ListGroupItem>
    )) : <ListGroupItem>Brak komentarzy</ListGroupItem>;

    const routes = rock.routes.map((item, index) => (
      <ListGroupItem key={`${item.name}`}>
        <Card body outline color="primary">
          <CardTitle>{index + 1}{': '}{item.name}</CardTitle>
            <Row>
              <Col sm={4}>Trudność: {Object.values(scale)[getGrade(item.gradesum, item.votes)]}</Col>
              <Col sm={5}>Autor: {item.author}</Col>
              <Col sm={3}><p>Rok: {item.year}</p></Col>
            </Row>
          {loggedIn && (
            <Form onSubmit={this.handleSubmit}>
              <Row>
                <Col sm={4}>
                  Twoja wycena:
                </Col>
                {item.voters && item.voters.includes(member.uid) ? (
                  <p className="text-success">
                  Oceniono
                  {' '}
                    <i className="fa fa-check" aria-hidden="true" />
                  </p>
                ) : (
                  <Fragment>
                    <Col sm={4}>
                      <FormGroup>
                        <Input type="select" name="grade" id={`grade-${index}`} tabIndex={index} onChange={this.handleChange} defaultValue="Wycena">
                          <option disabled>Wycena</option>
                          {renderScale}
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col sm={4}>
                      <Button>Oceń</Button>
                    </Col>
                  </Fragment>
                )}
              </Row>
            </Form>
          )}
        </Card>
      </ListGroupItem>
    ));

    const gps = {
      lat: rock.location.gps.latitude,
      lng: rock.location.gps.longitude,
    };

    return (
      <div className="rock-view">
        <Parallax bgImage={image1} strength={500} className="content--fullfill parallax--rock">
          <div style={{ height: 250 }}>
            <div className="article-title__wrapper">
              <h1 className="article-title mbr-bold">
                {rock.name}
              </h1>
              <h3 className="font-weight-light" style={{ color: '#adadad' }}>
                {rock.rockType}
              </h3>
            </div>
          </div>
        </Parallax>
        <Row style={{ position: 'relative', top: '-30px' }}>
          <Col xs="6">
            <p className="text-white">
              autor:
              {' '}
              {rock.author}
            </p>
          </Col>
          <Col xs="6" style={{ textAlign: 'right' }}>
            <p className="text-white">
              ocena:
              {' '}
              {rock.ratingsum === 0 || rock.votes === 0 ? ('Brak ocen') : (renderRatingStars(getRate(rock.ratingsum, rock.votes)))}
            </p>
          </Col>
        </Row>
        <Row>
          <Col lg="6" className="pb-3" style={{ textAlign: 'center' }}>
            <img src={rock.imageUrl} alt={`${rock.name}-skałoplan`} style={{ width: '100%', maxWidth: '500px' }} />
          </Col>
          <Col lg="6" className="rock-view-card pb-3">
            <Card>
              <CardHeader>
                Drogi
              </CardHeader>
              <ListGroup className="list-group-flush">
                {routes}
              </ListGroup>
            </Card>
          </Col>
        </Row>
        <Row className="pt-2 pb-4">
          <Col lg="12" className="rock-view-card">
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
        </Row>
        <div className="content--fullwidth py-3" style={{ backgroundColor: '#242f3e' }}>
          <Row>
            <Col sm={{ size: 2, offset: 1 }} xs={{ size: 10, offset: 1 }}>
              <p className="text-white">Lokalizacja</p>
              <p className="font-weight-light">{rock.location.adress}</p>
              GPS:
              <p className="font-weight-light">Długość geograficzna: {parseFloat(gps.lat).toFixed(3)}</p>
              <p className="font-weight-light">Szerokość geograficzna: {parseFloat(gps.lng).toFixed(3)}</p>
            </Col>
            <Col sm={8}>
              <GoogleMap center={gps} lat={gps.lat} lng={gps.lng} />
            </Col>
          </Row>
        </div>
        <Row className="pt-4 pb-3">
          <Col className="rock-view-card">
            <Card>
              <CardHeader>
                Komentarze
              </CardHeader>
              <ListGroup className="list-group-flush">
                {comments}
              </ListGroup>
              <Row className="px-4 py-3">
                <Col>
                  <Form id="add-comment" onSubmit={this.handleSubmit}>
                    <FormGroup>
                      <Input
                        type="textarea"
                        name="comment"
                        id="comment"
                        placeholder="Dodaj swój komentarz."
                        value={comment}
                        onChange={this.handleCommentChange}
                      />
                    </FormGroup>
                    <Button color="info" disabled={!comment}>Skomentuj</Button>
                  </Form>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
        <Row style={{alignItems: 'center'}}>
          <Col className="py-3" sm="8">
            <Link className="btn btn-secondary" to="/search">
              <i className="icon-arrow-left" />
              {' '}
              Szukaj innych skał
            </Link>
          </Col>
          {!compareNames(member.firstName, member.lastName, rock.author) ? (loggedIn ? (
            <Col className="pt-3" sm="4" style={{ textAlign: 'center' }}>
              Oceń artykuł:
              {rock.voters && rock.voters.includes(member.uid) ? (
                <p className="text-success">
                  Oceniono
                  {' '}
                  <i className="fa fa-check" aria-hidden="true" />
                </p>
              ) : (
                <Fragment>
                  <Button outline className="ml-3" onClick={this.toggle}>
                    <i className="icon-star" />
                  </Button>
                  <Modal
                    className="rating-modal"
                    style={{ marginTop: '40vh' }}
                    isOpen={ratingOpen}
                    toggle={this.toggle}
                  >
                    <Rating onSubmit={rate => this.handleNewRating(rate)} />
                  </Modal>
                </Fragment>
              )}
            </Col>
          ) : (
            <Col className="pt-3" sm="4" style={{ textAlign: 'center' }}>
              <Link to="/login">
                Zaloguj się
              </Link>
              , aby ocenić artykuł
            </Col>
          )) : (<div></div>)}
        </Row>
      </div>
    );
  }
}

export default RockView;
