import React, { Component } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button
} from "reactstrap";

class TopNavBar extends Component {
  state = {
    isOpen: false
  };

  toggleMenu = () => this.setState({ isOpen: !this.state.isOpen });

  render() {
    return (
      <React.Fragment>
        <Navbar color="dark" dark={true} expand="md">
          <NavbarBrand href="/">TYProject</NavbarBrand>
          <NavbarToggler onClick={this.toggleMenu} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/view">View Stories</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/create">Post a Story</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/myaccount">My Account</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </React.Fragment>
    );
  }
}

export default TopNavBar;
