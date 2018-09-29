import React, { Component } from "react";
import GetUserLocation from "../services/googleGeolocate.service";
import { connect } from "react-redux";
import logo from "../img/typ-logo.png";
import "../css/custom.css";
//import { withRouter } from "react-router";

class LandingPage extends Component {
  componentDidMount() {
    if (!this.props.userLongitude && !this.props.userLatitude) {
      GetUserLocation().then(resp => {
        let { lat, lng } = resp.data.location;
        this.props.sendLatitude(lat);
        this.props.sendLongitude(lng);
      });
    } else {
      console.log(this.props.userLongitude + ", " + this.props.userLatitude);
    }
  }

  render() {
    return (
      <div
        className="col-xl-5 col-lg-6 col-md-7 col-sm-10 col-xs-12 mx-auto text-center"
        style={{ paddingBottom: "2em" }}
      >
        <img src={logo} style={{ maxWidth: "60%", paddingBottom: "2em" }} />
        <h1 className="landing-page-spacer">Thank You Project</h1>
        <button
          className="btn btn-lg btn-block btn-success landing-btn-spacer"
          onClick={() => this.props.history.push("/create")}
        >
          Share Your Story
        </button>
        <button
          className="btn btn-lg btn-block btn-secondary pointer"
          onClick={() => this.props.history.push("/view")}
        >
          Find Stories Near You
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    sendLatitude: setLatitude =>
      dispatch({ type: "SET_USER_LATITUDE", setLatitude }),
    sendLongitude: setLongitude =>
      dispatch({ type: "SET_USER_LONGITUDE", setLongitude })
  };
};

const mapStateToProps = state => {
  return {
    userLongitude: state.userLongitude,
    userLatitude: state.userLatitude
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LandingPage);
