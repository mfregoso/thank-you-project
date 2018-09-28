import React, { Component } from "react";
import { connect } from "react-redux";
import GetUserLocation from "../services/googleGeolocate.service";
import { GetAllStories } from "../services/story.service";
//import { Container, Row, Col } from "reactstrap";
import GoogleMapReact from "google-map-react";

const AnyReactComponent = ({ text }) => (
  <div style={{ borderRadius: "20%", width: "4em", backgroundColor: "red" }}>
    {text}
  </div>
);

class ViewStories extends Component {
  state = {
    stories: []
  };

  componentDidMount() {
    GetAllStories().then(resp => this.setState({ stories: resp.data.items }));
    if (!this.props.userLongitude && !this.props.userLatitude) {
      //this.props.history.push("/");
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.userLatitude !== prevProps.userLatitude) {
      // catch Location Change => re-render map & maybe get new data from server
      console.log(this.props.userLatitude + ", " + this.props.userLongitude);
    }
  }

  render() {
    return (
      <div>
        <div className="container-fluid">
          <div className="float-right col-xl-3 col-lg-3 col-md-3 col-xs-12">
            filter/results box
          </div>
          <div
            className="float-left col-xl-9 col-lg-9 col-md-9 col-xs-12"
            style={{ height: "90vh" }}
          >
            <GoogleMapReact
              bootstrapURLKeys={{
                key: "AIzaSyBcBHH4tjzT73Zms3uDoCun9GaNy-Ue5QQ"
              }}
              defaultCenter={{
                lat: this.props.userLatitude || 33.9860021,
                lng: this.props.userLongitude || -118.3966412
              }}
              defaultZoom={12} // use REDUX to keep track of zoom level?
            >
              {this.state.stories.map(story => {
                return (
                  <AnyReactComponent
                    key={story.id}
                    lat={story.latitude}
                    lng={story.longitude}
                    text={story.thankeeName}
                  />
                );
              })}
            </GoogleMapReact>
          </div>
        </div>
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
)(ViewStories);
