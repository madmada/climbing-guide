/* global window */
import React from 'react';
import { Col, Nav, NavItem } from 'reactstrap';
import { Link } from 'react-router-dom';

const SidebarNavItems = () => (
  <div>
    <NavItem>
      <Link className={`nav-link ${window.location.pathname === '/' && 'active'}`} to="/">
        <i className="icon-home" />
        {' '}
        <span>
          Start
        </span>
      </Link>
    </NavItem>
    <NavItem>
      <Link className={`nav-link ${window.location.pathname.startsWith('/rock') && 'active'}`} to="/rocks">
        <i className="icon-magnifier" />
        {' '}
        <span>
          Szukaj skał
        </span>
      </Link>
    </NavItem>
    <NavItem>
      <Link className={`nav-link ${window.location.pathname === '/map' && 'active'}`} to="/map">
        <i className="icon-map" />
        {' '}
        <span>
          Mapa
        </span>
      </Link>
    </NavItem>
    <NavItem>
      <Link className={`nav-link ${window.location.pathname.startsWith('/recipe') && 'active'}`} to="/recipes">
        <i className="icon-directions" />
        {' '}
        <span>
          Artykuły
        </span>
      </Link>
    </NavItem>
    <NavItem>
      <Link className={`nav-link ${window.location.pathname === '/add' && 'active'}`} to="/add">
        <i className="icon-plus" />
        {' '}
        <span>
          Dodaj treści
        </span>
      </Link>
    </NavItem>
  </div>
);

const Sidebar = () => (
  <div>
    <Col sm="3" md="2" className="d-none d-sm-block sidebar">
      <Nav vertical>
        {SidebarNavItems()}
      </Nav>
    </Col>
  </div>
);

export { Sidebar, SidebarNavItems };
