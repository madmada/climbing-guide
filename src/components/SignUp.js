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
} from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';
import Loading from './Loading';

class SignUp extends React.Component {
  static propTypes = {
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    onFormSubmit: PropTypes.func.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
  }

  static defaultProps = {
    error: null,
  }

  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      password2: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { onFormSubmit, history } = this.props;
    onFormSubmit(this.state)
      .then(() => history.push('/login'))
      .catch(e => console.log(`Error: ${e}`));
  }

  render() {
    const { loading, error } = this.props;
    const {
      firstName,
      lastName,
      email,
      password,
      password2,
    } = this.state;

    // Loading
    if (loading) return <Loading />;

    return (
      <div>
        <Row>
          <Col lg={{ size: 6, offset: 3 }}>
            <Card className="input-card">
              <CardHeader>
                Rejestracja
              </CardHeader>
              <CardBody>
                {!!error && (
                  <Alert color="danger">
                    {error}
                  </Alert>
                )}
                <Form onSubmit={this.handleSubmit}>
                  <FormGroup>
                    <Label for="firstName">
                      Imię
                    </Label>
                    <Input
                      type="text"
                      name="firstName"
                      id="firstName"
                      placeholder="Jan"
                      value={firstName}
                      onChange={this.handleChange}
                      pattern="[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]*"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="lastName">
                      Nazwisko
                    </Label>
                    <Input
                      type="text"
                      name="lastName"
                      id="lastName"
                      placeholder="Kowalski"
                      value={lastName}
                      onChange={this.handleChange}
                      pattern="[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ-]*"
                    />
                  </FormGroup>

                  <FormGroup style={{ marginTop: 40 }}>
                    <Label for="email">
                      Email
                    </Label>
                    <Input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="jan@kowalski.pl"
                      value={email}
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="password">
                      Hasło
                    </Label>
                    <Input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="password2">
                      Potwierdź hasło
                    </Label>
                    <Input
                      type="password"
                      name="password2"
                      id="password2"
                      placeholder="••••••••"
                      value={password2}
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                  <Button color="primary">
                    Zarejestruj się!
                  </Button>
                </Form>

                <hr />

                <Row>
                  <Col sm="12">
                    Posiadasz już konto?
                    {' '}
                    <Link to="/login">
                      Zaloguj się
                    </Link>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default withRouter(SignUp);
