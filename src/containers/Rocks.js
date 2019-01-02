import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getAllRocks } from '../actions/rocks';

class RockListing extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
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

  render = () => {
    const { Layout, rocks, match } = this.props;
    const id = (match && match.params && match.params.id) ? match.params.id : null;

    return (
      <Layout
        rockId={id}
        error={rocks.error}
        loading={rocks.loading}
        rocks={rocks.rocks}
        reFetch={() => this.fetchRocks()}
      />
    );
  }
}

const mapStateToProps = state => ({
  rocks: state.rocks || {},
});

const mapDispatchToProps = {
  fetchRocks: getAllRocks,
};

export default connect(mapStateToProps, mapDispatchToProps)(RockListing);
