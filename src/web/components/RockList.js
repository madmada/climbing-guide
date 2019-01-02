import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import FilterResults from 'react-filter-search';
import {
  Row,
  Col,
  Table,
  Form,
  FormGroup,
  Label,
  Input,
  Popover,
  PopoverBody,
} from 'reactstrap';
import { Redirect } from 'react-router';
import rockTypes from '../../constants/rockTypes';
import regionTypes from '../../constants/regionTypes';
import { renderRatingStars, getRate, timestampToDate } from '../../helpers';
import Error from './Error';

class RockListing extends React.Component {
  static propTypes = {
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    rocks: PropTypes.objectOf(PropTypes.shape()).isRequired,
  }

  static defaultProps = {
    error: null,
  }

  constructor(props) {
    super(props);
    this.handleRowClick = this.handleRowClick.bind(this);
    this.state = {
      redirect: false,
      link: '',
      name: '',
      popoverOpen: false,
    };
  }

  handleChange = (event) => {
    if (event.target.name === 'name') {
      this.setState({
        [event.target.name]: event.target.value,
        popoverOpen: true,
      });
    } else {
      this.setState({
        [event.target.name]: event.target.value,
      });
    }
  }

  handleRowClick = (id) => {
    this.setState({
      redirect: true,
      link: `/rock/${id}`,
    });
  }

  render() {
    const { error, loading, rocks } = this.props;
    const {
      redirect,
      name,
      popoverOpen,
    } = this.state;

    if (redirect) return <Redirect push to={this.state.link} />;

    const row = Object.values(rocks).map(item => (

      <tr onClick={() => this.handleRowClick(item.id)}>
        <th scope="row">{item.name}</th>
        <td className="hide-mobile">{item.location.region}</td>
        <td className="hide-mobile">{item.rockType}</td>
        <td className="hide-mobile">{timestampToDate(item.date)}</td>
        <td style={{ whiteSpace: 'nowrap' }}>{item.ratingsum === 0 || item.votes === 0 ? ('Brak ocen') : (renderRatingStars(getRate(item.ratingsum, item.votes)))}</td>
        <td className="hide-desktop"><i className="icon-arrow-right" /></td>
      </tr>
    ));

    // Error
    if (error) return <Error content={error} />;

    return (
      <div>
        <Row>
          <Col sm="12">
            <h1>
              Szukaj skał
            </h1>
          </Col>
        </Row>
        <Form onSubmit={this.handleSubmit}>
          <Row>
            <Col sm={3}>
              <FormGroup>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Wpisz nazwę"
                  value={name}
                  autoComplete="off"
                  onChange={this.handleChange}
                />
                <FilterResults
                  value={name}
                  data={Object.values(rocks)}
                  renderResults={results => (
                    <Popover placement="bottom" isOpen={popoverOpen} target="name" toggle={this.toggle}>
                      <Table style={{ margin: '0' }} hover>
                        <tbody>
                          {results.length > 0 ? results.slice(0, 4).map(el => (
                            <tr style={{ cursor: 'pointer', display: 'inline-block', width: '100%', textAlign: 'left' }} onClick={() => this.setState({ name: el.name, popoverOpen: false })}>
                              <td style={{ display: 'inline-block', border: 'none' }}>
                                {el.name}
                              </td>
                            </tr>
                          )) : <tr><td>Brak Wyników</td></tr>}
                        </tbody>
                      </Table>
                    </Popover>
                  )}
                />
              </FormGroup>
            </Col>
            <Col sm={2}>
              <FormGroup>
                <Input type="select" name="regionType" onChange={this.handleChange} defaultValue="Województwo">
                  <option disabled>Województwo</option>
                  {regionTypes.map(item => (
                    <option>{item}</option>
                  ))}
                </Input>
              </FormGroup>
            </Col>
          </Row>
        </Form>
        <Row className={loading ? 'content-loading' : ''}>
          <Col sm={12}>
            <Table className="rock-list" responsive hover>
              <thead>
                <tr>
                  <th>Nazwa</th>
                  <th className="hide-mobile">Województwo</th>
                  <th className="hide-mobile">Typ skały</th>
                  <th className="hide-mobile">Dodano</th>
                  <th>Ocena</th>
                  <th className="hide-desktop" />
                </tr>
              </thead>
              <tbody>
                {row}
              </tbody>
            </Table>
          </Col>
        </Row>
      </div>
    );
  }
}

export default RockListing;
