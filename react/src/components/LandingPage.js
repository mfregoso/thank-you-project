import React, { Component } from "react";
import GetUserLocation from "../services/googleGeolocate.service";
import { connect } from "react-redux";
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
    return <div>Hello from the landing page!</div>;
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
