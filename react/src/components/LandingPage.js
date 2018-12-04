import React, { Component } from "react";
import logo from "../img/typ-logo.png";
import "../css/custom.css";

class LandingPage extends Component {
  render() {
    return (
      <div
        className="col-xl-5 col-lg-6 col-md-7 col-sm-10 col-xs-12 mx-auto text-center"
        style={{ paddingBottom: "2em", marginTop: "-1em" }}
      >
        <img
          src={logo}
          alt="Thank You Project logo"
          style={{ maxWidth: "55%", paddingBottom: "2em" }}
        />
        <h1 className="landing-page-spacer">Thank You Project</h1>
        <button
          className="btn btn-lg btn-block btn-success landing-btn-spacer"
          onClick={() => this.props.history.push("/share")}
        >
          Share Your Story
        </button>
        <button
          className="btn btn-lg btn-block btn-dark pointer"
          onClick={() => this.props.history.push("/discover")}
        >
          Discover Stories
        </button>
      </div>
    );
  }
}

export default LandingPage;
