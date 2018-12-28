import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Nav,
  Navbar,
  Collapse,
  DropdownMenu,
  DropdownItem,
  NavbarToggler,
  DropdownToggle,
  UncontrolledDropdown,
} from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';
import Config from '../../constants/config';
import { SidebarNavItems } from './Sidebar';

class Header extends Component {
  static propTypes = {
    member: PropTypes.shape({
      firstName: PropTypes.string,
      email: PropTypes.string,
    }),
    logout: PropTypes.func.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
  }

  static defaultProps = {
    member: {},
  }

  constructor(props) {
    super(props);

    this.toggleDropDown = this.toggleDropDown.bind(this);
    this.state = { isOpen: false };
  }

  onLogout = () => {
    const { logout, history } = this.props;
    logout().then(() => history.push('/login'));
  }

  toggleDropDown = () => {
    const { isOpen } = this.state;
    this.setState({ isOpen: !isOpen });
  }

  render() {
    const { member } = this.props;
    const { isOpen } = this.state;
    const loggedIn = !!(member && member.email);

    return (
      <header>
        <Navbar dark color="primary" expand="sm" className="fixed-top">
          <Link to="/" className="navbar-brand" style={{ color: '#FFF' }}>
            {Config.appName}
            {/* Icon Designed by Alvaro_Cabrera / Freepik */}
            <svg width="30" height="30" viewBox="0 0 49 32" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet">
              <path d="M20.78 6.83l0.58 -1.97 -0.94 -0.27 -0.58 1.97 0.94 0.27zm9.31 1.77l0.82 -2.79 -6.56 -1.93 -1.32 4.5 -0.13 0.43c0,0 0,0 0,0l-0.19 0.66 6.55 1.93 0.2 -0.69 0.63 -2.11zm3.17 1.87l0.58 -1.96 -0.94 -0.28 -0.37 1.25 -0.21 0.72 0.94 0.27zm7.36 12.3c0.95,-1.15 1.33,-2.65 1.05,-4.12l-0.03 -0.19c-0.36,-1.85 -1.7,-3.33 -3.51,-3.86l-6.55 -1.91 -0.2 0.69c-0.1,0.33 -0.32,0.61 -0.62,0.77 -0.19,0.1 -0.41,0.16 -0.62,0.16 -0.12,0 -0.25,-0.02 -0.37,-0.06l-9.04 -2.66c-0.68,-0.2 -1.08,-0.92 -0.87,-1.61l0.19 -0.66 -6.42 -1.88c-0.47,-0.14 -0.95,-0.21 -1.42,-0.21 -1.28,0 -2.55,0.53 -3.49,1.45 -0.96,0.94 -1.49,2.2 -1.49,3.55l0 7.36c0,2.75 2.24,4.99 4.99,4.99l24.55 0c1.49,0 2.89,-0.66 3.85,-1.81zm3.57 2.96c1.84,-2.22 2.59,-5.12 2.05,-7.95l-0.04 -0.19c-0.68,-3.58 -3.27,-6.43 -6.77,-7.45l-3.11 -0.91 -0.58 1.97 3.12 0.91c2.75,0.8 4.79,3.05 5.32,5.86l0.04 0.2c0.43,2.23 -0.16,4.51 -1.61,6.25 -1.44,1.75 -3.57,2.75 -5.84,2.75l-24.55 0c-4.18,0 -7.58,-3.4 -7.58,-7.58l0 -7.36c0,-2.05 0.81,-3.97 2.27,-5.4 1.41,-1.39 3.34,-2.19 5.3,-2.19 0.71,0 1.44,0.11 2.14,0.32l3.01 0.87 0.58 -1.97 -3.01 -0.88c-0.9,-0.25 -1.81,-0.39 -2.72,-0.39 -5.31,0 -9.62,4.33 -9.62,9.64l0 7.36c0,5.31 4.32,9.63 9.63,9.63l24.55 0c2.88,0 5.59,-1.27 7.42,-3.49zm4.59 -8.43c0.69,3.59 -0.26,7.27 -2.59,10.08 -2.33,2.82 -5.76,4.43 -9.42,4.43l-24.55 0c-6.74,0 -12.22,-5.48 -12.22,-12.22l0 -7.36c0,-6.74 5.47,-12.23 12.21,-12.23 1.15,0 2.31,0.17 3.44,0.5l6.45 1.88 0.13 -0.47c0.1,-0.33 0.33,-0.61 0.63,-0.78 0.3,-0.16 0.65,-0.2 0.98,-0.1l9.04 2.66c0.69,0.2 1.08,0.92 0.88,1.61l-0.13 0.45 6.53 1.9c2.16,0.63 4.11,1.85 5.62,3.52 1.52,1.67 2.54,3.72 2.97,5.93l0.03 0.2z" fill="#fff" />
            </svg>
          </Link>
          <NavbarToggler onClick={this.toggleDropDown} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <div className="d-block d-sm-none">
                {SidebarNavItems()}
              </div>
              <UncontrolledDropdown nav>
                <DropdownToggle nav caret>
                  {loggedIn ? <i className="icon-user" /> : <i className="icon-user-unfollow" />}
                  {' '}
                  <span className="hide-desktop">Moje konto</span>
                </DropdownToggle>
                <DropdownMenu>
                  {!loggedIn
                    && (
                    <div>
                      <DropdownItem tag={Link} to="/login">
                        Zaloguj się
                      </DropdownItem>
                      <DropdownItem tag={Link} to="/sign-up">
                        Zarejestruj się
                      </DropdownItem>
                    </div>
                    )
                  }
                  {loggedIn
                    && (
                    <div>
                      <DropdownItem tag={Link} to="/update-profile">
                        Edytuj profil
                      </DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem tag="button" onClick={this.onLogout}>
                        Wyloguj się
                      </DropdownItem>
                    </div>
                    )
                  }
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </header>
    );
  }
}

export default withRouter(Header);
