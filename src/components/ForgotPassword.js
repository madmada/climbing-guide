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

class ForgotPassword extends React.Component {
  static propTypes = {
    member: PropTypes.shape({
      email: PropTypes.string,
    }),
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    onFormSubmit: PropTypes.func.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
  }

  static defaultProps = {
    error: null,
    member: {},
  }

  constructor(props) {
    super(props);
    this.state = {
      email: (props.member && props.member.email) ? props.member.email : '',
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
    const { email } = this.state;

    // Loading
    if (loading) return <Loading />;

    return (
      <div>
        <Row>
          <Col lg={{ size: 6, offset: 3 }}>
            <Card className="input-card">
              <CardHeader>
                Resetowanie hasła
              </CardHeader>
              <CardBody>
                {!!error && (
                <Alert color="danger">
                  {error}
                </Alert>
                )}
                <Form onSubmit={this.handleSubmit}>
                  <FormGroup>
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
                  <Button color="primary">
                    Resetuj hasło
                  </Button>
                </Form>

                <hr />

                <Row>
                  <Col sm="7">
                    Nie masz konta?
                    {' '}
                    <Link to="/sign-up">
                      Zarejestruj się
                    </Link>
                  </Col>
                  <Col sm="5" className="text-right">
                  Powrót do {' '}
                    <Link to="/login">
                      Logowania
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

export default withRouter(ForgotPassword);
