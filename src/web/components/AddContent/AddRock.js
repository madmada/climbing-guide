import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import update from 'react-addons-update';
import { Link, withRouter } from 'react-router-dom';
import {
  Row,
  Col,
  Card,
  Form,
  Label,
  Alert,
  Input,
  InputGroup,
  InputGroupAddon,
  Button,
  CardBody,
  FormGroup,
  CardHeader,
  FormText,
  Modal,
  ModalHeader,
  Progress,
} from 'reactstrap';
import LocalizationPicker from '../LocalizationPicker';
import Loading from '../Loading';
import { scrollTop } from '../../../helpers';
import scale from '../../../constants/cracowScale';
import rockTypes from '../../../constants/rockTypes';

class AddRock extends React.Component {
  static propTypes = {
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    onFormSubmit: PropTypes.func.isRequired,
    onImageUpload: PropTypes.func.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    member: PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      email: PropTypes.string,
    }).isRequired,
  }

  static defaultProps = {
    error: null,
  }

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      rockType: '',
      author: props.member.email ? `${props.member.firstName} ${props.member.lastName}` : '',
      imageUploading: false,
      locationPick: false,
      imageUrl: '',
      location: {
        latitude: '',
        longitude: '',
        region: '',
        address: '',
      },
      routes: [{
        name: '',
        author: '',
        year: '',
        gradesum: '',
        votes: 1,
      }],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUploadFile = this.handleUploadFile.bind(this);
    this.handleLocationPick = this.handleLocationPick.bind(this);
    this.handleRouteChange = this.handleRouteChange.bind(this);
    this.handleAddNewRoute = this.handleAddNewRoute.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleRouteChange = (event) => {
    const grade = event.target.name === 'grade' && Object.values(scale).findIndex(value => value === event.target.value);
    if (grade) {
      this.setState({
        routes: update(this.state.routes, { [event.target.tabIndex]: { gradesum: { $set: grade } } }),
      });
    }
    else {
      this.setState({
        routes: update(this.state.routes, { [event.target.tabIndex]: { [event.target.name]: { $set: event.target.value } } }),
      });
    }
  }

  handleAddNewRoute = () => {
    const { routes } = this.state;
    const newRoute = {
      name: '',
      author: '',
      year: '',
      gradesum: '',
      votes: 1,
    };
    const newRoutes = routes;
    newRoutes.push(newRoute);
    this.setState({
      routes: newRoutes,
    });
  }

  handleRemoveRoute = (index) => {
    const { routes } = this.state;
    const newRoutes = routes;
    newRoutes.splice(index, 1);
    this.setState({
      routes: newRoutes,
    });
  }

  handleUploadFile = (event) => {
    if (event.target.files.length !== 0) {
      const { onImageUpload } = this.props;
      this.setState({
        imageUploading: true,
      });
      onImageUpload(event.target.files[0])
        .then((url) => {
          this.setState({ imageUploading: false, imageUrl: url });
          console.log('url zdjecia: ', url);
        })
        .catch(e => this.setState({ imageUploading: false }));
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { onFormSubmit, history } = this.props;
    const { name } = this.state;
    const id = _.kebabCase(name);
    onFormSubmit(this.state)
      .then(() => history.push(`/rock/${id}`))
      .catch((e) => {
        console.log(`Error: ${e}`);
        scrollTop();
      });
  }

  handleLocationPick(loc) {
    this.toggle();
    this.setState({
      location: loc,
    });
  }

  toggle() {
    this.setState({
      locationPick: !this.state.locationPick,
    });
  }

  render() {
    const { loading, error, member } = this.props;
    const {
      name,
      description,
      imageUploading,
      locationPick,
      location,
      routes,
    } = this.state;

    const loggedIn = !!(member && member.email);

    const renderScale = Object.values(scale).map(item => <option>{item}</option>);

    const LogInInfo = (
      <Alert color="danger">
        <h4 className="alert-heading">Uwaga!</h4>
        <p>
          Aby dodawać treści w naszym serwisie musisz być zalogowany.
        </p>
        <Link to="/login">
          <Button color="primary">
            Zaloguj się
          </Button>
        </Link>
        <hr />
        <p className="mb-0">
          Nie masz konta?
          {' '}
          <Link to="/sign-up">
            Zarejestruj&nbsp;się
          </Link>
        </p>
      </Alert>
    );

    const addRoutes = routes.map((item, index) => (
      <Fragment>
        <Row form key={index}>
          <Label for="rock-number" sm={1}>{index + 1}:</Label>
          <Col sm={3}>
            <FormGroup>
              <Input type="text" name="name" id={`name-${index}`} tabIndex={index} value={routes.name} placeholder="nazwa" onChange={this.handleRouteChange} />
            </FormGroup>
          </Col>
          <Col sm={3}>
            <FormGroup>
              <Input type="text" name="author" id={`author-${index}`} tabIndex={index} value={routes.author} placeholder="autor" onChange={this.handleRouteChange} />
            </FormGroup>
          </Col>
          <Col xs={6} sm={2}>
            <FormGroup>
              <Input type="select" name="grade" id={`grade-${index}`} tabIndex={index} onChange={this.handleRouteChange} defaultValue="Wycena">
                <option disabled>Wycena</option>
                {renderScale}
              </Input>
            </FormGroup>
          </Col>
          <Col xs={4} sm={2}>
            <FormGroup>
              <Input type="number" name="year" id={`year-${index}`} tabIndex={index} value={routes.year} placeholder="rok" onChange={this.handleRouteChange} />
            </FormGroup>
          </Col>
          <Col xs={1} sm={1}>
            <Button onClick={() => this.handleRemoveRoute(index)}>
              <i className="fa fa-trash-o" aria-hidden="true" />
            </Button>
          </Col>
        </Row>
        <hr />
      </Fragment>
    ));

    // Loading
    if (loading) return <Loading />;

    if (!loggedIn) return LogInInfo;

    return (
      <div>
        <Row>
          <Col lg={{ size: 10, offset: 1 }}>
            <Card className="input-card" id="add-rock">
              <CardHeader>
                Dodaj nową skałę
              </CardHeader>
              <CardBody>
                {!!error && (
                  <Alert color="danger">
                    {error}
                  </Alert>
                )}
                <Form onSubmit={this.handleSubmit}>
                  <FormGroup>
                    <Label for="name">
                      Nazwa Skały
                    </Label>
                    <Input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Sarnia Skała"
                      value={name}
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="description">
                      Opis
                    </Label>
                    <Input
                      type="textarea"
                      name="description"
                      id="description"
                      placeholder="Wpisz dodatkowe informormacje o skale i drogach wspinaczkowych."
                      value={description}
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="rockType">Rodzaj skały</Label>
                    <Input type="select" name="rockType" id="rockType" onChange={this.handleChange} defaultValue="Wybierz rodzaj">
                      <option disabled>Wybierz rodzaj</option>
                      {rockTypes.map(item => <option>{item}</option>)}
                    </Input>
                  </FormGroup>
                  <FormGroup>
                    <Label for="image">Skałoplan</Label>
                    <Input
                      type="file"
                      name="image"
                      id="image"
                      accept="image/*"
                      onInput={this.handleUploadFile}
                    />
                    <Modal style={{ marginTop: '40vh' }} isOpen={imageUploading}>
                      <Progress bar animated value="100">
                        Prosimy zaczekać, trwa dodawanie zdjęcia...
                      </Progress>
                    </Modal>
                    <FormText color="muted">
                      Dodaj do bazy zdjęcie lub rysunek skały z naniesionymi drogami.
                    </FormText>
                  </FormGroup>
                  <FormGroup>
                    <Label for="image">Lokalizacja</Label>
                    <InputGroup>
                      <Input
                        type="text"
                        name="location"
                        id="location"
                        value={location.address ? location.address : 'Wybierz na mapie lokalizację skały'}
                        disabled
                      />
                      <InputGroupAddon addonType="append">
                        <Button onClick={this.toggle}>
                          <i className="icon-target" />
                          {' '}
                          Mapa
                        </Button>
                      </InputGroupAddon>
                    </InputGroup>
                    <Modal style={{ marginTop: '20vh' }} isOpen={locationPick} toggle={this.toggle}>
                      <ModalHeader toggle={this.toggle}>Wybierz lokalizację</ModalHeader>
                      <LocalizationPicker onSubmit={this.handleLocationPick} />
                    </Modal>
                  </FormGroup>
                  <FormGroup>
                    <Label for="routes">Drogi</Label>
                    <hr style={{ marginTop: '0' }} />
                    {addRoutes}
                    <FormText color="muted" onClick={this.handleAddNewRoute} style={{ cursor: 'pointer' }}>
                      <i className="fa fa-plus" aria-hidden="true" />
                      {' '}
                      Dodaj kolejną drogę
                    </FormText>
                  </FormGroup>
                  <Button color="primary">
                    Dodaj skałę!
                  </Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default withRouter(AddRock);
