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

class TopNavBar extends Component {
  state = {
    isOpen: false
  };

  toggleMenu = () => this.setState({ isOpen: !this.state.isOpen });

  render() {
    const { location } = this.props;
    return (
      <React.Fragment>
        <Navbar
          color="dark"
          dark={true}
          expand="md"
          style={{ marginBottom: "4em" }}
        >
          <NavbarBrand
            href="javascript:(0)"
            onClick={() => this.props.history.push("/")}
          >
            TYProject
          </NavbarBrand>
          <NavbarToggler onClick={this.toggleMenu} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink
                  href="javascript:(0)"
                  className="pointer"
                  active={location.pathname === "/view"}
                  onClick={() => this.props.history.push("/view")}
                >
                  View Stories
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  href="javascript:(0)"
                  active={location.pathname === "/create"}
                  onClick={() => this.props.history.push("/create")}
                >
                  Post a Story
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink href="javascript:(0)">My Account</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </React.Fragment>
    );
  }
}

export default withRouter(TopNavBar);
