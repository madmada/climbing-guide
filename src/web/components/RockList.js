import React from 'react';
import PropTypes from 'prop-types';
import FilterResults from 'react-filter-search';
import {
  Row,
  Col,
  Table,
  Form,
  FormGroup,
  Badge,
  Input,
  Popover,
  Button,
} from 'reactstrap';
import { Redirect } from 'react-router';
import rockTypes from '../../constants/rockTypes';
import regionTypes from '../../constants/regionTypes';
import { renderRatingStars, getRate, timestampToDate, scrollTop } from '../../helpers';
import Error from './Error';
import Loading from './Loading';

class RockListing extends React.Component {
  static propTypes = {
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    rocks: PropTypes.arrayOf(PropTypes.shape()),
    searchRocks: PropTypes.func.isRequired,
  }

  static defaultProps = {
    error: null,
    rocks: {},
  }

  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      link: '',
      name: '',
      region: '',
      rockType: '',
      sortBy: '',
      popoverOpen: false,
    };

    this.handleRowClick = this.handleRowClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (event) => {
    if (event.target.name === 'name') {
      const length = event.target.value.length;
      const open = length > 1;
      this.setState({
        [event.target.name]: event.target.value,
        popoverOpen: open,
      });
    } else {
      this.setState({
        [event.target.name]: event.target.value,
      });
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { searchRocks } = this.props;
    searchRocks(this.state);
  }

  handleRefresh = () => {
    const { searchRocks } = this.props;
    const clearData = {
      name: '',
      region: '',
      rockType: '',
      sortBy: '',
    };
    this.setState({
      name: '',
      region: '',
      rockType: '',
      sortBy: '',
      popoverOpen: false,
    });
    searchRocks(clearData);
  }

  handleRowClick = (id) => {
    this.setState({
      redirect: true,
      link: `/rock/${id}`,
    });
    scrollTop();
  }

  render() {
    const { error, loading, rocks } = this.props;
    const {
      redirect,
      name,
      region,
      rockType,
      sortBy,
      popoverOpen,
    } = this.state;

    // Redirect
    if (redirect) return <Redirect push to={this.state.link} />;

    // Page content loading
    if (loading) return <Loading />;

    // Error
    if (error) return <Error content={error} />;

    const row = rocks.slice(0, 15).map(item => (
      <tr key={item.name} onClick={() => this.handleRowClick(item.id)}>
        <th scope="row">{item.name}</th>
        <td className="hide-mobile">{item.location.region}</td>
        <td className="hide-mobile">{item.rockType}</td>
        <td className="hide-mobile">{timestampToDate(item.date)}</td>
        <td style={{ whiteSpace: 'nowrap' }}>{item.ratingsum === 0 || item.votes === 0 ? ('Brak ocen') : (renderRatingStars(getRate(item.ratingsum, item.votes)))}</td>
        <td className="hide-desktop"><i className="icon-arrow-right" /></td>
      </tr>
    ));

    return (
      <div>
        <Row>
          <Col sm="12">
            <h1>
              Szukaj skał
            </h1>
          </Col>
        </Row>
        <Form onSubmit={this.handleSubmit} onClick={() => this.setState({ popoverOpen: false })} acceptCharset="ISO-8859-1">
          <Row>
            <Col lg={3}>
              <FormGroup>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Wpisz nazwę"
                  value={name}
                  autoComplete="off"
                  onChange={this.handleChange}
                  pattern="[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ ]*"
                />
                <FilterResults
                  value={name}
                  data={rocks}
                  renderResults={results => (
                    <Popover placement="bottom" isOpen={popoverOpen} target="name" toggle={this.toggle}>
                      <Table style={{ margin: '0' }} hover>
                        <tbody>
                          {results.length > 0 ? results.slice(0, 4).map(el => (
                            <tr key={el.name} style={{ cursor: 'pointer', display: 'inline-block', width: '100%', textAlign: 'left' }} onClick={() => this.setState({ name: el.name, popoverOpen: false })}>
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
            <Col lg={3}>
              <FormGroup>
                <Input type="select" name="region" onChange={this.handleChange} value={region}>
                  <option value="" disabled>Województwo</option>
                  {regionTypes.map((item, index) => (
                    <option key={index}>{item}</option>
                  ))}
                </Input>
              </FormGroup>
            </Col>
            <Col lg={2}>
              <FormGroup>
                <Input type="select" name="rockType" onChange={this.handleChange} value={rockType}>
                  <option value="" disabled>Typ skały</option>
                  {rockTypes.map((item, index)  => (
                    <option key={index}>{item}</option>
                  ))}
                </Input>
              </FormGroup>
            </Col>
            <Col lg={3}>
              <FormGroup>
                <Input type="select" name="sortBy" onChange={this.handleChange} value={sortBy}>
                  <option value="" disabled>Sortuj według</option>
                  <option value="rate">Ocena - rosnąco</option>
                  <option value="rate-desc">Ocena - malejąco</option>
                  <option value="date">Data - od najstarszych</option>
                  <option value="date-desc">Data - od najnowszych</option>
                  <option value="name">Alfabetycznie</option>

                </Input>
              </FormGroup>
            </Col>
            <Col lg={1}>
              <Button style={{ width: '100%', marginBottom: '10px' }}><i className="icon-magnifier" /></Button>
            </Col>
          </Row>
          <Row>
            <Col lg={12}>
              <Badge
                color="info"
                style={{ fontSize: '1rem', width: '100%', marginTop: '10px', marginBottom: '20px', cursor: 'pointer' }}
                onClick={() => this.handleRefresh()}
              >
                <i className="icon-refresh" />
                {' '}
                Wyczyść filtry
              </Badge>
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
