import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import {
  Row,
  Col,
  Card,
  Form,
  Label,
  Alert,
  Input,
  Button,
  CardBody,
  FormGroup,
  CardHeader,
  FormText,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Progress,
} from 'reactstrap';
import Config from '../../../constants/config';
import LocalizationPicker from '../LocalizationPicker';
import Loading from '../Loading';

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
      author: `${props.member.firstName} ${props.member.lastName}` || '',
      imageUploading: false,
      locationPick: false,
      imageUrl: '',
      location: {
        latitude: '',
        longitude: '',
        region: '',
        address: '',
      },

    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUploadFile = this.handleUploadFile.bind(this);
    this.handleLocationPick = this.handleLocationPick.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleUploadFile = (event) => {
    const { onImageUpload } = this.props;
    // const modal = event.target.files[0] !== 'undefined';
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

  handleSubmit = (event) => {
    event.preventDefault();
    const { onFormSubmit, history } = this.props;
    onFormSubmit(this.state)
      .then(() => history.push('/')) // href ----> nowej skały
      .catch(e => console.log(`Error: ${e}`));
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
    const { loading, error } = this.props;
    const {
      name,
      description,
      imageUploading,
      locationPick,
      location,
    } = this.state;

    // Loading
    if (loading) return <Loading />;

    return (
      <div>
        <Row>
          <Col lg={{ size: 8, offset: 2 }}>
            <Card className="input-card">
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
                    <Row>
                      <Col xs={9}>
                        <Input
                          type="text"
                          name="location"
                          id="location"
                          value={location.address ? location.address : 'Wybierz na mapie lokalizację skały'}
                          disabled
                        />
                      </Col>
                      <Col xs={2}>
                        <Button onClick={this.toggle} style={{ left: '-30px', position: 'relative' }}>
                          <i className="icon-target" />
                          {' '}
                          Mapa
                        </Button>
                      </Col>
                    </Row>
                    <Modal style={{ marginTop: '20vh' }} isOpen={locationPick} toggle={this.toggle}>
                      <ModalHeader toggle={this.toggle}>Wybierz lokalizację</ModalHeader>
                      <LocalizationPicker onSubmit={this.handleLocationPick} />
                    </Modal>
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
