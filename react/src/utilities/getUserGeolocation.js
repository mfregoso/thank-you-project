import { Component } from "react";
import GetUserLocation from "../services/googleGeolocate.service";
import { connect } from "react-redux";
import { withRouter } from "react-router";

class GetGeoLocation extends Component {
  componentDidMount() {
    let url = this.props.location.pathname;
    if (!url.startsWith("/view")) {
      if (!this.props.userLongitude && !this.props.userLatitude) {
        GetUserLocation().then(resp => {
          let { lat, lng } = resp.data.location;
          this.props.sendLatitude(lat);
          this.props.sendLongitude(lng);
        });
      }
    }
  }

  render() {
    return null;
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
)(withRouter(GetGeoLocation));
