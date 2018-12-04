import React, { Component } from "react";
import {
  FormGroup,
  Label,
  Input,
  InputGroup,
  InputGroupAddon,
  Button,
  FormFeedback
} from "reactstrap";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";
import { connect } from "react-redux";
import moment from "moment";
import DatePicker from "react-datepicker";
import "../css/react-datepicker.css";
import onInputChange from "../utilities/onInputChange";
import validateEmail from "../utilities/validateEmail";
import {
  CreateStory,
  GetStoryById,
  UpdateStory,
  DeleteStory
} from "../services/story.service";
import SweetAlert from "react-bootstrap-sweetalert";

class SubmitStory extends Component {
  state = {
    inEditMode: false,
    menuOpen: false,
    deleteWarning: false,
    thankeeName: "",
    posterName: "",
    location: "",
    latitude: null,
    longitude: null,
    isGeocoding: false,
    description: "",
    thankeeEmail: "",
    storyId: null,
    disableAutocomplete: false,
    storyDate: moment().local(), // set moment("2018-08-16"),
    publishDate: moment().local(),
    notifyDate: moment().local(),
    notifyTime: moment()
      .local()
      .add(30, "minutes"), //new Date(new Date().setHours(new Date().getHours() + 2)))
    validation: {
      thankeeName: true,
      thankeeEmail: true,
      dateRange: true,
      posterName: true,
      location: true
    }
  };

  componentDidMount() {
    //const now = moment().local();
    //console.log(now.format("YYYY-MM-DD[T]HH:mm:ssZ"));

    const setFormValues = story => {
      if (story) {
        this.setState({
          //notifyDate: moment(this.state.timeBlock.notifyDate.substr(0, 10)),
          //notifyTime: moment(this.state.timeBlock.notifyTime, "HH:mm"),
          storyDate: moment(story.storyDate.substr(0, 10)),
          thankeeName: story.thankeeName,
          posterName: story.posterName,
          location: story.location || "",
          description: story.description || "",
          //thankeeEmail: story.thankeeEmail || "",
          publishDate: moment(story.publishDate.substr(0, 10)),
          latitude: story.latitude,
          longitude: story.longitude,
          storyId: story.id,
          inEditMode: true,
          disableAutocomplete: true
        });
      }
    };

    if (this.props.match.params.id) {
      let checkId = /^\d+$/;
      let tempId = this.props.match.params.id;
      if (checkId.test(tempId)) {
        let storyId = parseInt(tempId, 10);
        GetStoryById(storyId).then(resp => setFormValues(resp.data.item));
      }
    }
  } // END of DidMount

  componentDidUpdate(prevProps) {
    if (
      prevProps.location.pathname.startsWith("/edit") &&
      this.props.location.pathname === "/share"
    ) {
      this.setState({
        storyDate: moment().local(),
        thankeeName: "",
        posterName: "",
        location: "",
        description: "",
        thankeeEmail: "",
        publishDate: moment().local(),
        latitude: null,
        longitude: null,
        disableAutocomplete: false,
        storyId: null,
        inEditMode: false
      });
    }
  }

  getFormData = () => {
    // to-do? notificate date + time + validation?
    const formData = {
      thankeeName: this.state.thankeeName,
      location: this.state.location,
      latitude: this.state.latitude.toString(),
      longitude: this.state.longitude.toString(),
      description: this.state.description,
      posterName: this.state.posterName,
      storyDate: this.state.storyDate.format("YYYY-MM-DD"),
      publishDate: this.state.publishDate.format("YYYY-MM-DD")
    };
    if (this.state.inEditMode) {
      formData.id = this.state.storyId;
    } else {
      let { thankeeEmail } = this.state;
      if (thankeeEmail) formData.thankeeEmail = thankeeEmail;
    }
    return formData;
  };

  handleMapsAutocomplete = location => {
    let nameOnly = location.substr(0, location.indexOf(","));
    this.setState({ location: nameOnly, disableAutocomplete: true });
    geocodeByAddress(location)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        this.setState({
          latitude: latLng.lat,
          longitude: latLng.lng
        });
        if (!this.props.mapZoom) {
          this.props.sendLatitude(latLng.lat);
          this.props.sendLongitude(latLng.lng);
        }
      })
      .catch(error => console.error("Error", error));
  };

  autoCompleteChange = location => {
    this.setState({ location });
  };

  updateInputValue = onInputChange.bind(this);

  remainingCharacters = () =>
    `You have ${3000 - this.state.description.length} remaining characters`;

  handleSubmission = () => {
    if (this.state.inEditMode) {
      let data = this.getFormData();
      UpdateStory(this.state.storyId, data).then(resp =>
        console.log(resp.data)
      );
    } else {
      let data = this.getFormData();
      CreateStory(data)
        .then(resp => this.props.history.push("/discover"))
        .catch(err => console.log(err));
    }
  };

  resetLocation = () => {
    this.setState({
      location: "",
      latitude: null,
      longitude: null,
      isGeocoding: false,
      disableAutocomplete: false
    });
  };

  cancelSweetAlert = () => {
    this.setState({
      deleteWarning: false
    });
  };

  confirmedDeleteEvent = () => {
    this.setState({ deleteWarning: false });
    //alert("confirmed delete for " + this.state.storyId);
    if (this.state.storyId) {
      DeleteStory(this.state.storyId).then(
        this.props.history.push("/discover")
      );
    }
  };

  validateInputs = () => {
    const { thankeeName, thankeeEmail, validation } = this.state;
    //check thankeeName length
    thankeeName.length > 0
      ? (validation.thankeeName = true)
      : (validation.thankeeName = false);
    if (thankeeEmail) {
      validateEmail(thankeeEmail)
        ? (validation.thankeeEmail = true)
        : (validation.thankeeEmail = false);
    } else {
      validation.thankeeEmail = true;
    }
    this.setState({ validation });
  };

  allValid = () => {
    let storyDate = moment(this.state.storyDate).format("YYYY-MM-DD");
    let notifyDate = moment(this.state.notifyDate).format("YYYY-MM-DD");
    let notifyTime = moment(this.state.notifyTime).format("HH:mm");
    let start = new Date(`${storyDate}`);
    let end = new Date(`${notifyDate} ${notifyTime}`);
    let dateRange = false;
    if (start < end) {
      dateRange = true;
    }
    const { validation } = this.state;
    validation.dateRange = dateRange;
    if (
      validation.thankeeName &&
      validation.activity &&
      validation.thankeeEmail &&
      dateRange
    ) {
      return true;
    } else {
      return false;
    }
  };

  render() {
    return (
      <div
        className="col-xl-5 col-lg-6 col-md-7 col-sm-10 col-xs-12 mx-auto"
        style={{ paddingBottom: "2em" }}
      >
        <div
          className=""
          style={{
            position: "relative",
            top: "-1.2em",
            right: "-1.5em",
            float: "right",
            textAlign: "right",
            height: "0.1em"
          }}
        />
        <div className="mx-auto">
          <h1
            className="thankeeName text-center"
            style={{
              position: "relative",
              top: "-0.4em",
              marginBottom: "0.5em"
            }}
          >
            {(this.state.inEditMode && "Update Your Story") ||
              "Share Your Story"}
          </h1>
        </div>
        {this.state.inEditMode && <br />}
        <FormGroup>
          <Label>Person/Organization You Would Like To Thank</Label>
          <Input
            type="text"
            name="thankeeName"
            maxLength="100"
            value={this.state.thankeeName}
            onBlur={this.validateInputs}
            onChange={e => {
              this.setState({ [e.target.name]: e.target.value }, () => {
                if (!this.state.validation.thankeeName) {
                  this.validateInputs();
                }
              });
            }}
            //valid={this.state.validation.thankeeName}
            invalid={!this.state.validation.thankeeName}
            required
          />
          <FormFeedback valid />
          <FormFeedback>This field is required</FormFeedback>
        </FormGroup>
        <div className="form-group" style={{ minWidth: "22em" }}>
          <label>&nbsp;Date Of This Story</label>
          <div className="form-row">
            <div className="col" style={{ maxWidth: "28%", minWidth: "9em" }}>
              <DatePicker
                selected={this.state.storyDate}
                onChange={date =>
                  this.setState({
                    storyDate: date
                  })
                }
                className="form-control text-center"
                dateFormat="MMM D[,] YYYY"
                maxDate={moment().local()}
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
              />
            </div>
          </div>
        </div>
        <div className="form-group">
          <label>&nbsp;Location Of This Story</label>
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
                  {this.state.disableAutocomplete ? (
                    <Input
                      maxLength={100}
                      {...getInputProps({
                        placeholder: "Search for a Location"
                      })}
                      disabled
                    />
                  ) : (
                    <Input
                      maxLength={100}
                      {...getInputProps({
                        placeholder: "Search for a Location"
                      })}
                    />
                  )}
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
        <div className="form-group">
          <label>&nbsp;Your Thank You Story</label>
          <textarea
            className="form-control"
            name="description"
            maxLength="3000"
            value={this.state.description}
            onChange={this.updateInputValue}
            rows="10"
          />
          {this.state.description.length > 2500 && (
            <React.Fragment>
              <small>
                &nbsp;
                {this.remainingCharacters()}
              </small>
            </React.Fragment>
          )}
        </div>
        <FormGroup>
          <Label>Sincerely,</Label>
          <Input
            type="text"
            name="posterName"
            maxLength="100"
            placeholder="Your Name Here"
            value={this.state.posterName}
            onBlur={this.validateInputs}
            onChange={e => {
              this.setState({ [e.target.name]: e.target.value }, () => {
                if (!this.state.validation.thankeeName) {
                  this.validateInputs();
                }
              });
            }}
            //valid={this.state.validation.thankeeName}
            invalid={!this.state.validation.posterName}
            required
          />
          <FormFeedback valid />
          <FormFeedback>This field is required</FormFeedback>
        </FormGroup>
        <div className="form-group" style={{ minWidth: "22em" }}>
          <label>&nbsp;Publication Date</label>
          <div className="form-row">
            <div className="col" style={{ maxWidth: "28%", minWidth: "9em" }}>
              <DatePicker
                selected={this.state.publishDate}
                onChange={date =>
                  this.setState({
                    publishDate: date
                  })
                }
                className="form-control text-center"
                dateFormat="MMM D[,] YYYY"
                minDate={moment().local()}
                maxDate={moment().add(1, "years")}
              />
            </div>
          </div>
        </div>
        {!this.state.inEditMode && (
          <FormGroup>
            <Label>&nbsp;Notify The Recipient of This Story</Label>
            <Input
              type="text"
              name="thankeeEmail"
              placeholder="Email Address (NOT YET IMPLEMENTED)"
              maxLength="100"
              value={this.state.thankeeEmail}
              onChange={e => {
                this.setState({ [e.target.name]: e.target.value }, () => {
                  setTimeout(() => {
                    this.validateInputs();
                  }, 900);
                });
              }}
              invalid={!this.state.validation.thankeeEmail}
            />
            <FormFeedback valid />
            <FormFeedback>Invalid email address(es)</FormFeedback>
          </FormGroup>
        )}
        {/* <div className="form-group" style={{ minWidth: "22em" }}>
            <label>&nbsp;Select When to Send a Notification Email</label>
            <div className="form-row">
              <div className="col" style={{ maxWidth: "28%", minWidth: "9em" }}>
                <DatePicker
                  selected={this.state.notifyDate}
                  onChange={date => {
                    this.setState({
                      notifyDate: date
                    });
                  }}
                  className="form-control text-center"
                  dateFormat="MMM D[,] YYYY"
                  minDate={moment().local()}
                  maxDate={moment().add(1, "year")}
                />
              </div>
              <div className="col" style={{ maxWidth: "25%", minWidth: "8em" }}>
                <DatePicker
                  selected={this.state.notifyTime}
                  onChange={time => {
                    this.setState({
                      notifyTime: time
                    });
                  }}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  className="form-control text-center"
                  dateFormat="LT"
                />
              </div>
            </div>
            {!this.state.validation.dateRange && (
              <small className="text-red">Invalid start and end dates</small>
            )}
          </div> */}
        <div className="text-right">
          {/* <button
                      className="btn-lg btn-danger"
                      onClick={() => {
                        this.validateInputs();
                        if (this.allValid()) {
                          console.log("all valid");
                        } else {
                          console.log("not fully valid");
                        }
                      }}
                    >
                      Validate
                    </button> */}
          {this.state.inEditMode && (
            <button
              className="btn btn-danger float-left"
              onClick={() => this.setState({ deleteWarning: true })}
            >
              Delete
            </button>
          )}
          <button
            className="btn btn-muted"
            onClick={() => this.props.history.push("/discover")}
          >
            Cancel
          </button>
          &nbsp;&nbsp;
          <button
            className="btn btn-success"
            onClick={() => {
              this.handleSubmission();
              this.validateInputs();
              if (this.allValid()) {
                this.handleSubmission();
              }
            }}
          >
            {(this.state.inEditMode && "Update") || "Share"}
          </button>
        </div>
        <SweetAlert
          show={this.state.deleteWarning}
          warning
          showCancel
          confirmBtnText={"Yes, Delete"}
          confirmBtnBsStyle="danger"
          cancelBtnBsStyle="default"
          cancelBtnText={"No, Keep It"}
          title={`Delete your story about ${this.state.thankeeName}?`}
          onConfirm={this.confirmedDeleteEvent}
          onCancel={this.cancelSweetAlert}
        >
          <small>This cannot be undone!</small>
        </SweetAlert>
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
    mapZoom: state.mapZoom
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubmitStory);
