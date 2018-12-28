import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { addNewRock } from '../actions/rocks';
import { addRockImage } from '../actions/storage';

class AddRock extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    member: PropTypes.shape({}).isRequired,
    onFormSubmit: PropTypes.func.isRequired,
    onImageUpload: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
  }

  state = {
    errorMessage: null,
  }

  onFormSubmit = (data) => {
    const { onFormSubmit } = this.props;
    return onFormSubmit(data)
      .catch((err) => { this.setState({ errorMessage: err }); throw err; });
  }

  onImageUpload = (file) => {
    const { onImageUpload } = this.props;
    return onImageUpload(file)
      .catch((err) => { this.setState({ errorMessage: err }); throw err; });
  }

  render = () => {
    const {
      member,
      Layout,
      isLoading,
    } = this.props;

    const { errorMessage } = this.state;

    return (
      <Layout
        member={member}
        loading={isLoading}
        error={errorMessage}
        onFormSubmit={this.onFormSubmit}
        onImageUpload={this.onImageUpload}
      />
    );
  }
}

const mapStateToProps = state => ({
  member: state.member || {},
  isLoading: state.status.loading || false,
});

const mapDispatchToProps = {
  onFormSubmit: addNewRock,
  onImageUpload: addRockImage,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddRock);
