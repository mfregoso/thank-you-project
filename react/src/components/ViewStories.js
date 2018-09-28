import React, { Component } from "react";
import { connect } from "react-redux";
import { GetAllStories } from "../services/story.service";
import GoogleMapReact from "google-map-react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";
import { Input, InputGroup, InputGroupAddon, Button } from "reactstrap";

const AnyReactComponent = ({ text }) => (
  <div style={{ borderRadius: "20%", width: "4em", backgroundColor: "red" }}>
    {text}
  </div>
);

class ViewStories extends Component {
  state = {
    stories: [],
    latitude: null,
    longitude: null,
    isGeocoding: false,
    location: "",
    filteredStories: null
  };

  componentDidMount() {
    GetAllStories().then(resp => this.setState({ stories: resp.data.items }));
    if (this.props.userLongitude && this.props.userLatitude) {
      this.setState({
        latitude: this.props.userLatitude,
        longitude: this.props.userLongitude
      });
    }
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

  handleMapsAutocomplete = location => {
    //let nameOnly = location.substr(0, location.indexOf(","));
    this.setState({ location });
    geocodeByAddress(location)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        this.setState({
          latitude: latLng.lat,
          longitude: latLng.lng,
          zoomLevel: 13
        });
      })
      .catch(error => console.error("Error", error));
  };

  resetLocation = () => this.setState({ location: "" });

  autoCompleteChange = location => {
    this.setState({ location });
  };

  handleMapChanges = info => {
    let zoom = info.zoom;
    let mapLatitude = info.center.lat;
    let mapLongitude = info.center.lng;
    let ne = info.bounds.ne;
    let nw = info.bounds.nw;
    let se = info.bounds.se;
    let sw = info.bounds.sw;
    console.log(`${ne.lng} ${ne.lat}`);
    console.log(`${nw.lng} ${nw.lat}`);
    console.log(`${sw.lng} ${sw.lat}`);
    console.log(`${se.lng} ${se.lat}`);
    // this.props.sendMapZoom(zoom);
    // this.props.sendMapLatitude(mapLatitude);
    // this.props.sendMapLongitude(mapLongitude);
  };

  render() {
    const mapOptions = {
      scrollwheel: true,
      minZoom: 8
    };
    return (
      <div>
        <div className="container-fluid">
          <div className="float-right col-xl-3 col-lg-3 col-md-3 col-xs-12">
            <div className="form-group">
              <PlacesAutocomplete
                value={this.state.location}
                onChange={this.autoCompleteChange}
                onSelect={this.handleMapsAutocomplete}
              >
                {({
                  getInputProps,
                  suggestions,
                  getSuggestionItemProps,
                  loading
                }) => (
                  <div className="form-group">
                    <InputGroup>
                      {" "}
                      <Input
                        maxLength={100}
                        {...getInputProps({
                          placeholder: "Search Stories by Location"
                        })}
                      />
                      <InputGroupAddon addonType="append">
                        <Button color="danger" onClick={this.resetLocation}>
                          x
                        </Button>
                      </InputGroupAddon>
                    </InputGroup>
                    {suggestions.length > 0 && (
                      <div className="autocomplete-dropdown-container">
                        {loading && <div>Loading...</div>}
                        {suggestions.map(suggestion => {
                          const className = suggestion.active
                            ? "suggestion-item--active"
                            : "suggestion-item";
                          const style = suggestion.active
                            ? {
                                backgroundColor: "#e8e8e8",
                                cursor: "pointer",
                                margin: "0.3em"
                              }
                            : {
                                backgroundColor: "#ffffff",
                                cursor: "pointer",
                                margin: "0.3em"
                              };
                          return (
                            <div
                              {...getSuggestionItemProps(suggestion, {
                                className,
                                style
                              })}
                            >
                              <span>{suggestion.description}</span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </PlacesAutocomplete>
            </div>
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
              center={{
                lat: this.state.latitude || 33.9860021,
                lng: this.state.longitude || -118.3966412
              }}
              defaultZoom={12}
              zoom={this.state.zoomLevel || 12}
              options={mapOptions}
              //onChange={this.handleMapChanges} // callback with all kinds of useful information
            >
              {(this.state.filteredStories || this.state.stories).map(story => {
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
    sendMapLatitude: setLatitude =>
      dispatch({ type: "SET_MAP_LATITUDE", setLatitude }),
    sendMapLongitude: setLongitude =>
      dispatch({ type: "SET_MAP_LONGITUDE", setLongitude }),
    sendMapZoom: setZoom => dispatch({ type: "SET_MAP_ZOOM", setZoom })
  };
};

const mapStateToProps = state => {
  return {
    userLongitude: state.userLongitude,
    userLatitude: state.userLatitude,
    mapLatitude: state.mapLatitude,
    mapLongitude: state.mapLongitude,
    mapZoom: state.mapZoom
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewStories);
