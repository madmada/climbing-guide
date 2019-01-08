import React from 'react';
import { Row, Col } from 'reactstrap';

const Footer = () => (
  <footer className="mt-5">
    <Row>
      <Col sm="12" className="text-right pt-3">
        <p>
          Serwis realizowany w ramach pracy inżynierskiej.
          {' '}
          &nbsp; | &nbsp;
            Adam Pałka, 2018
        </p>
      </Col>
    </Row>
  </footer>
);

export default Footer;
