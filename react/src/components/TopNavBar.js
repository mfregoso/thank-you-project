import React, { Component } from "react";
import { withRouter } from "react-router";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";
import {getHref} from "../utilities";

class TopNavBar extends Component {
  state = {
    isOpen: false
  };

  toggleMenu = () => this.setState({ isOpen: !this.state.isOpen });

  handleNavClick = event => {
    const urlPath = getHref(event);
    this.props.history.push(urlPath);
  }

  render() {
    const { location } = this.props;
    return (
      <React.Fragment>
        <Navbar
          color="success"
          dark={true}
          expand="md"
          style={{ marginBottom: "3em" }}
        >
          <NavbarBrand
            href="/"
            onClick={this.handleNavClick}
          >
            TYP {/*  <small>by mfregoso</small> */}
          </NavbarBrand>
          <NavbarToggler onClick={this.toggleMenu} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink
                  href="/discover"
                  className="pointer"
                  active={location.pathname === "/discover"}
                  onClick={this.handleNavClick}
                >
                  Discover Stories
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  href="/share"
                  active={location.pathname === "/share"}
                  onClick={this.handleNavClick}
                >
                  Share a Story
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink
                  href="/latest"
                  active={location.pathname === "/latest"}
                  onClick={this.handleNavClick}
                >
                  Latest Stories
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink
                  href="/search"
                  active={location.pathname === "/search"}
                  onClick={this.handleNavClick}
                >
                  Search
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </React.Fragment>
    );
  }
}

export default withRouter(TopNavBar);
