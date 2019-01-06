import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getRocks, getNewestRocks, getFilteredRocks, updateRock } from '../actions/rocks';
import ArticleListing from '../web/components/Articles';

class RockContainer extends Component {
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
    fetchNewestRocks: PropTypes.func.isRequired,
    searchRocks: PropTypes.func.isRequired,
    onFormSubmit: PropTypes.func.isRequired,
  }

  static defaultProps = {
    match: null,
  }

  // check if Layout has changed and refetch Rocks if so
  componentDidUpdate(prevProps) {
    if (this.props.Layout !== prevProps.Layout) {
      if (this.props.Layout === ArticleListing) {
        this.fetchNewestRocks();
      } else this.fetchRocks();
    }
  }

  componentDidMount = () => {
    if (this.props.Layout === ArticleListing) {
      this.fetchNewestRocks();
    } else this.fetchRocks();
  }

  /**
    * Fetch Data from API, saving to Redux
    */
  fetchRocks = () => {
    const { fetchRocks } = this.props;
    fetchRocks();
  }

  fetchNewestRocks = () => {
    const { fetchNewestRocks } = this.props;
    fetchNewestRocks();
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
  fetchNewestRocks: getNewestRocks,
  searchRocks: getFilteredRocks,
  onFormSubmit: updateRock,
};

export default connect(mapStateToProps, mapDispatchToProps)(RockContainer);
