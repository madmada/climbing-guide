import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';
import Member from '../containers/Member';
import TopBar from './TopBar';

const Template = ({ children }) => (
  <Fragment>
    <Member Layout={TopBar} />
    <Container>
      <Row>
        <Col sm="12">
          {children}
        </Col>
      </Row>
    </Container>
  </Fragment>
);

Template.propTypes = { children: PropTypes.element.isRequired };

export default Template;
