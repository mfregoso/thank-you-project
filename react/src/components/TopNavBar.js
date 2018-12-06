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
          color="success"
          dark={true}
          expand="md"
          style={{ marginBottom: "3em" }}
        >
          <NavbarBrand
            href="#" //javascript:(0)
            onClick={() => this.props.history.push("/")}
          >
            TYP {/*  <small>by mfregoso</small> */}
          </NavbarBrand>
          <NavbarToggler onClick={this.toggleMenu} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink
                  href="#"
                  className="pointer"
                  active={location.pathname === "/discover"}
                  onClick={() => this.props.history.push("/discover")}
                >
                  Discover Stories
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  href="#"
                  active={location.pathname === "/share"}
                  onClick={() => this.props.history.push("/share")}
                >
                  Share a Story
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink
                  href="#"
                  active={location.pathname === "/latest"}
                  onClick={() => this.props.history.push("/latest")}
                >
                  Latest Stories
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink
                  href="#"
                  active={location.pathname === "/search"}
                  onClick={() => this.props.history.push("/search")}
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
