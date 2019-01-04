import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getRocks, getFilteredRocks, addNewGrade } from '../actions/rocks';

class RockListing extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    member: PropTypes.shape({}).isRequired,
    rocks: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      error: PropTypes.string,
    }).isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({}),
    }),
    fetchRocks: PropTypes.func.isRequired,
  }

  static defaultProps = {
    match: null,
  }

  componentDidMount = () => this.fetchRocks();

  /**
    * Fetch Data from API, saving to Redux
    */
  fetchRocks = () => {
    const { fetchRocks } = this.props;
    fetchRocks();
  }

  searchRocks = (data) => {
    const { searchRocks } = this.props;
    return searchRocks(data);
  }

  onFormSubmit = (data) => {
    const { onFormSubmit } = this.props;
    return onFormSubmit(data);
  }

  render = () => {
    const { Layout, rocks, match, member } = this.props;
    const id = (match && match.params && match.params.id) ? match.params.id : null;

    return (
      <Layout
        rockId={id}
        member={member}
        error={rocks.error}
        loading={rocks.loading}
        rocks={rocks.rocks}
        reFetch={() => this.fetchRocks()}
        searchRocks={this.searchRocks}
        onFormSubmit={this.onFormSubmit}
      />
    );
  }
}

const mapStateToProps = state => ({
  member: state.member || {},
  rocks: state.rocks || {},
});

const mapDispatchToProps = {
  fetchRocks: getRocks,
  searchRocks: getFilteredRocks,
  onFormSubmit: addNewGrade,
};

export default connect(mapStateToProps, mapDispatchToProps)(RockListing);
