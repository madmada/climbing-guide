import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';
import Member from '../containers/Member';
import TopBar from './TopBar';
import Footer from './Footer';
import { Sidebar } from './Sidebar';

const Template = ({ children }) => (
  <div>
    <Member Layout={TopBar} />
    <Container fluid>
      <Row>
        <Sidebar />
        <Col md="10" sm="9" className="px-sm-5 py-4 ml-sm-auto">
          {children}
          <Footer />
        </Col>
      </Row>
    </Container>
  </div>
);

Template.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Template;
