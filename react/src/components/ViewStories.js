import React, { Component } from "react";
import { connect } from "react-redux";
import { GetNearbyStories } from "../services/story.service";
import GoogleMapReact from "google-map-react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";
import { Input, InputGroup, InputGroupAddon, Button } from "reactstrap";
import MapMarkers from "./MapMarkers";
import moment from "moment";
import ResultRow from "./ResultRow";
import ViewStoryModal from "./ViewStoryModal";

class ViewStories extends Component {
  state = {
    stories: [],
    latitude: null,
    longitude: null,
    isGeocoding: false,
    location: "",
    filteredStories: null,
    storyModal: false,
    selectedStory: {},
    isLoading: false
  };

  GetStoriesByLocation = (lat, lng, radius) => {
    this.setState({ isLoading: true });
    GetNearbyStories(lat, lng, radius)
      .then(resp => {
        let stories = this.reformatStories(resp.data.items);
        this.setState({
          stories,
          isLoading: false,
          latitude: lat,
          longitude: lng
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({ isLoading: false });
      });
  };

  initializeStories = () =>
    this.GetStoriesByLocation(
      this.props.userLatitude,
      this.props.userLongitude
    );

  componentDidMount() {
    if (this.props.userLongitude && this.props.userLatitude) {
      this.initializeStories();
    }
  }

  componentWillUnmount() {
    let { latitude, longitude, zoomLevel } = this.state;
    this.props.sendMapZoom(zoomLevel);
    this.props.sendLatitude(latitude);
    this.props.sendLongitude(longitude);
  }

  componentDidUpdate(prevProps) {
    if (
      !prevProps.userLongitude &&
      this.props.userLongitude !== prevProps.userLongitude
    ) {
      this.initializeStories();
    }
  }

  setSelectedStory = idx => {
    const selectedStory = this.state.stories[idx];
    this.setState({ selectedStory, storyModal: true });
  };

  toggleModal = isOpen => {
    if (isOpen === false) {
      this.setState({
        storyModal: isOpen,
        selectedStory: {}
      });
    } else {
      this.setState({ storyModal: isOpen });
    }
  };

  handleMapsAutocomplete = location => {
    //let nameOnly = location.substr(0, location.indexOf(","));
    this.setState({ location });
    geocodeByAddress(location)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        this.setState({
          latitude: latLng.lat,
          longitude: latLng.lng,
          zoomLevel: 14
        });
        this.GetStoriesByLocation(latLng.lat, latLng.lng);
      })
      .catch(error => console.error("Error", error));
  };

  reformatStories = stories => {
    let reformatted = stories.map(story => {
      let dayOfStory = moment(story.storyDate, "YYYY-MM-DD").format(
        "dddd, MMMM D, YYYY"
      );
      return {
        ...story,
        dayOfStory
      };
    });
    return reformatted;
  };

  resetLocation = () => this.setState({ location: "" });

  autoCompleteChange = location => {
    this.setState({ location });
  };

  handleMapChanges = info => {
    let zoomLevel = info.zoom;
    let latitude = info.center.lat;
    let longitude = info.center.lng;
    // let ne = info.bounds.ne;
    // let nw = info.bounds.nw;
    // let se = info.bounds.se;
    // let sw = info.bounds.sw;
    // console.log(`${ne.lng} ${ne.lat}`);
    // console.log(`${nw.lng} ${nw.lat}`);
    // console.log(`${sw.lng} ${sw.lat}`);
    // console.log(`${se.lng} ${se.lat}`);
    // this.props.sendMapZoom(zoomLevel);
    // this.props.sendLatitude(latitude);
    // this.props.sendLongitude(longitude);
    this.setState({ latitude, longitude, zoomLevel });
  };

  render() {
    const mapOptions = {
      scrollwheel: true,
      minZoom: 12
      // hide: [
      //   {
      //     featureType: "all",
      //     elementType: "labels",
      //     stylers: [{ visibility: "off" }]
      //   }
      // ]
    };

    const noStoriesFound = () => {
      if (!this.state.isLoading && this.state.stories.length === 0) {
        return (
          <React.Fragment>
            <tr>
              <td>
                <div className="font-weight-bold">
                  This area doesn't have any stories yet.
                </div>
                <div className="font-weight-bold">
                  Would you like to{" "}
                  <a
                    href="javascript:(0)"
                    onClick={() => this.props.history.push("/share")}
                  >
                    Share a Story
                  </a>
                  ?
                </div>
              </td>
            </tr>
          </React.Fragment>
        );
      }
    };

    const loadingMessage = () => {
      return (
        <React.Fragment>
          <tr>
            <td>
              <div className="font-weight-bold">Searching for stories...</div>
            </td>
          </tr>
        </React.Fragment>
      );
    };

    return (
      <div className="container-fluid view-spacer">
        <div className="float-right col-xl-4 col-lg-4 col-md-12 col-xs-12">
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
          <div className="results-container">
            <table className="table table-light table-bordered table-striped">
              <tbody>
                {this.state.isLoading ? loadingMessage() : noStoriesFound()}
                {this.state.stories.map((story, index) => (
                  <ResultRow
                    key={story.id}
                    idx={index}
                    story={story}
                    selectStory={this.setSelectedStory}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div
          className="float-left col-xl-8 col-lg-8 col-md-12 col-xs-12"
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
              lat: this.state.latitude || this.props.userLatitude || 33.9860021,
              lng:
                this.state.longitude || this.props.userLongitude || -118.3966412
            }}
            defaultZoom={this.props.mapZoom || 13}
            //zoom={this.state.zoomLevel}
            options={mapOptions}
            onChange={this.handleMapChanges} // callback with all kinds of useful information
          >
            {(this.state.filteredStories || this.state.stories).map(
              (story, index) => {
                return (
                  <MapMarkers
                    key={story.id}
                    idx={index}
                    id={story.id}
                    lat={story.latitude}
                    lng={story.longitude}
                    story={story}
                    selectStory={this.setSelectedStory}
                  />
                );
              }
            )}
          </GoogleMapReact>
        </div>
        <ViewStoryModal
          showModal={this.state.storyModal}
          toggle={() => this.toggleModal(false)}
          story={this.state.selectedStory}
        />
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
    sendMapZoom: setZoom => dispatch({ type: "SET_MAP_ZOOM", setZoom }),
    sendLatitude: setLatitude =>
      dispatch({ type: "SET_USER_LATITUDE", setLatitude }),
    sendLongitude: setLongitude =>
      dispatch({ type: "SET_USER_LONGITUDE", setLongitude })
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
