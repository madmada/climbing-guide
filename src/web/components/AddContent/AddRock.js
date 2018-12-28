import React from 'react';
import PropTypes from 'prop-types';
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
import { Link, withRouter } from 'react-router-dom';
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
      imageUrl: '',

    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUploadFile = this.handleUploadFile.bind(this);
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

  toggle() {
    this.setState({
      imageUploading: !this.state.imageUploading,
    });
  }

  render() {
    const { loading, error } = this.props;
    const {
      name,
      description,
      imageUploading,
      progress,
    } = this.state;

    // Loading
    if (loading) return <Loading />;

    return (
      <div>
        <Row>
          <Col lg={{ size: 6, offset: 3 }}>
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
                      placeholder="Wpisz dodatkowe informormacje o skale"
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
                    <Modal style={{ marginTop: '40vh' }} isOpen={imageUploading} toggle={this.toggle}>
                      <Progress bar animated value="100">
                        Prosimy poczekać, trwa dodawanie zdjęcia...
                      </Progress>
                    </Modal>
                    <FormText color="muted">
                      Dodaj do bazy zdjęcie skały z naniesionymi drogami.
                    </FormText>
                  </FormGroup>
                  <Button color="primary">
                    Dodaj skałę!
                  </Button>
                </Form>

                {/* <hr />

                <Row>
                  <Col sm="12">
                    Posiadasz już konto?
                    {' '}
                    <Link to="/login">
                      Zaloguj się
                    </Link>
                  </Col>
                </Row> */}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default withRouter(AddRock);
