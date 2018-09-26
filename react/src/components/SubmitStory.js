import React, { Component } from "react";
import {
  DropdownToggle,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  FormGroup,
  Label,
  Input,
  FormFeedback
} from "reactstrap";
import { withRouter } from "react-router-dom";
import moment from "moment";
import DatePicker from "react-datepicker";
import "../css/react-datepicker.css";
import onInputChange from "../utilities/onInputChange";
import validateEmail from "../utilities/validateEmail";
//import queryString from "querystring";

class CreateTimeBlock extends Component {
  state = {
    inEditMode: false,
    menuOpen: false,
    deleteWarning: false,
    activityTypeId: "",
    title: "",
    location: "",
    description: "",
    guestName: "",
    guestEmail: "",
    startDate: moment().local(), // set moment("2018-08-16"),
    startTime: moment("08:00", "HH:mm"), //new Date(new Date().setHours(new Date().getHours() + 1))), //set 24 HR moment("20:00:00.00000", "HH:mm")
    endDate: moment().local(),
    endTime: moment()
      .local()
      .add(30, "minutes"), //new Date(new Date().setHours(new Date().getHours() + 2)))
    validation: {
      title: true,
      activity: true,
      guestEmail: true,
      dateRange: true
    }
  };

  componentDidMount() {
    // get all activities

    const setFormValues = () => {
      let inLeadMode = false;
      if (this.state.timeBlock.leadId) {
        inLeadMode = true;
      }
      this.setState({
        startDate: moment(this.state.timeBlock.startDate.substr(0, 10)),
        startTime: moment(this.state.timeBlock.startTime, "HH:mm"),
        endDate: moment(this.state.timeBlock.endDate.substr(0, 10)),
        endTime: moment(this.state.timeBlock.endTime, "HH:mm"),
        title: this.state.timeBlock.title,
        location: this.state.timeBlock.location || "",
        description: this.state.timeBlock.description || "",
        leadId: this.state.timeBlock.leadId || "",
        guestName: this.state.timeBlock.guestName || "",
        guestEmail: this.state.timeBlock.guestEmail || "",
        isAllDay: this.state.timeBlock.allDay,
        isCanceled: this.state.timeBlock.canceled,
        activityTypeId: this.state.timeBlock.activityTypeId,
        inLeadMode
      });
    };

    if (this.props.match.params.id) {
      let idParam = parseInt(this.props.match.params.id);
      if (Number.isInteger(idParam)) {
        console.log(idParam);
      }
    }
  } // END of DidMount

  getFormData = () => {
    let EndDate = moment(this.state.endDate).format("YYYY-MM-DD");
    if (this.state.isAllDay) {
      if (this.state.startDate !== this.state.endDate) {
        EndDate = moment(this.state.endDate)
          .add(1, "days")
          .format("YYYY-MM-DD");
      }
    }
    const timeBlockData = {
      Title: this.state.title,
      Location: this.state.location,
      Description: this.state.description,
      GuestName: this.state.guestName,
      GuestEmail: this.state.guestEmail,
      activityTypeId: this.state.activityTypeId,
      StartDate: moment(this.state.startDate).format("YYYY-MM-DD"),
      StartTime: moment(this.state.startTime).format("HH:mm"),
      EndDate, // needed for unique all day events
      EndTime: moment(this.state.endTime).format("HH:mm"),
      AllDay: this.state.isAllDay,
      Canceled: this.state.isCanceled,
      ActivityCategory: this.getActivityCategory()
    };
    if (this.state.inEditMode) {
      timeBlockData.id = this.state.timeBlock.id;
    }
    if (this.state.leadId) {
      timeBlockData.LeadId = parseInt(this.state.leadId);
    } else {
      timeBlockData.LeadId = this.state.timeBlock.leadId;
    }
    //console.log(this.getActivityCategory());

    return timeBlockData;
  };

  updateInputValue = onInputChange.bind(this);

  insertEditMenuButton = () => {
    return (
      <div className="pull-right text-right">
        <Dropdown
          isOpen={this.state.menuOpen}
          direction={"left"}
          toggle={() => this.setState({ menuOpen: !this.state.menuOpen })}
        >
          <DropdownToggle tag="span">
            <span className="icon-btn text-grey pointer">
              <i className="zmdi zmdi-more-vert zmdi-hc-lg" />
            </span>
          </DropdownToggle>
          <DropdownMenu className="text-center">
            <DropdownItem
              onClick={() => {
                this.setState({ isCanceled: !this.state.isCanceled });
              }}
              // disabled={this.state.isCanceled} // remove ability to unmark as canceled?
            >
              {(this.state.isCanceled && "Unmark as ") || "Mark as "}
              Canceled
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem
              onClick={() => {
                this.setState({ deleteWarning: true });
              }}
              className="text-danger"
            >
              Delete This Event
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    );
  };

  handleSubmission = () => {
    if (this.state.inEditMode) {
      //edit mode
    } else {
      // new creation
    }
  };

  confirmedDeleteEvent = () => {
    //alert("confirmed delete for " + this.state.timeBlock.id);
    // delete, remove warning, then forward user
  };

  cancelSweetAlert = () => {
    this.setState({
      deleteWarning: false
    });
  };

  populateActivityBox = activity => {
    return (
      <option key={activity.id} value={activity.id}>
        {activity.name}
      </option>
    );
  };

  validateInputs = () => {
    const { title, activityTypeId, guestEmail, validation } = this.state;
    //check title length
    title.length > 0 ? (validation.title = true) : (validation.title = false);
    //check selected activity
    Number.isInteger(parseInt(activityTypeId))
      ? (validation.activity = true)
      : (validation.activity = false);
    if (guestEmail) {
      validateEmail(guestEmail)
        ? (validation.guestEmail = true)
        : (validation.guestEmail = false);
    }
    this.setState({ validation });
  };

  allValid = () => {
    let startDate = moment(this.state.startDate).format("YYYY-MM-DD");
    let startTime = moment(this.state.startTime).format("HH:mm");
    let endDate = moment(this.state.endDate).format("YYYY-MM-DD");
    let endTime = moment(this.state.endTime).format("HH:mm");
    let start = new Date(`${startDate} ${startTime}`);
    let end = new Date(`${endDate} ${endTime}`);
    let dateRange = false;
    if (this.state.isAllDay) {
      if (this.state.startDate <= this.state.endDate) {
        dateRange = true;
      }
    } else {
      if (start < end) {
        dateRange = true;
      }
    }
    if (start < end) {
      dateRange = true;
    }
    const { validation } = this.state;
    validation.dateRange = dateRange;
    if (
      validation.title &&
      validation.activity &&
      validation.guestEmail &&
      dateRange
    ) {
      return true;
    } else {
      return false;
    }
    this.setState({ validation });
  };

  render() {
    return (
      <div className="col-xl-5 col-lg-6 col-md-7 col-sm-10 col-xs-12 mx-auto">
        <div className="jr-entry-header">{/*adds padding to title*/}</div>
        <div className="jr-card">
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
          >
            {this.state.inEditMode && this.insertEditMenuButton()}
          </div>
          {/* <div className="mx-auto">
                  <h1
                    className="title text-center"
                    style={{
                      position: "relative",
                      top: "0.4em",
                      marginBottom: "-0.1em"
                    }}
                  >
                    {(this.state.inEditMode && "Update Event") ||
                      "Create Event"}
                  </h1>
                </div> */}
          {this.state.inEditMode && <br />}
          <FormGroup>
            <Label>Person/Organization You Would Like to Thank</Label>
            <Input
              type="text"
              name="title"
              maxLength="100"
              value={this.state.title}
              disabled={this.state.isCanceled}
              onBlur={this.validateInputs}
              onChange={e => {
                this.setState({ [e.target.name]: e.target.value }, () => {
                  if (!this.state.validation.title) {
                    this.validateInputs();
                  }
                });
              }}
              //valid={this.state.validation.title}
              invalid={!this.state.validation.title}
              required
            />
            <FormFeedback valid />
            <FormFeedback>This field is required</FormFeedback>
          </FormGroup>
          <div className="form-group">
            <label>&nbsp;Location Where This Took Place</label>
            <input
              className="form-control"
              name="location"
              maxLength="100"
              value={this.state.location}
              onChange={this.updateInputValue}
              disabled={this.state.isCanceled}
            />
          </div>
          {/* <FormGroup>
                    <Label>Activity</Label>
                    <Input
                      type="select"
                      name="activityTypeId"
                      value={this.state.activityTypeId}
                      disabled={this.state.isCanceled}
                      onChange={e => {
                        this.setState({ [e.target.name]: e.target.value }, () =>
                          this.validateInputs()
                        );
                      }}
                      disabled={this.state.isCanceled}
                      //valid={this.state.validation.activity}
                      invalid={!this.state.validation.activity}
                    >
                      <option>Select an Activity</option>
                      {(
                        (this.state.inLeadMode &&
                          this.state.leadActivitiesOnly) ||
                        this.state.activityTypes ||
                        []
                      ).map(activity => this.populateActivityBox(activity))}
                    </Input>
                    <FormFeedback valid />
                    <FormFeedback>This field is required</FormFeedback>
                  </FormGroup> */}
          <div className="form-group" style={{ minWidth: "22em" }}>
            <label>&nbsp;Date When This Took Place</label>
            <div className="form-row">
              <div className="col" style={{ maxWidth: "28%", minWidth: "9em" }}>
                <DatePicker
                  selected={this.state.startDate}
                  onChange={date => {
                    if (date > this.state.endDate) {
                      this.setState({
                        startDate: date,
                        endDate: date
                      });
                    } else {
                      this.setState({
                        startDate: date
                      });
                    }
                  }}
                  className="form-control text-center"
                  dateFormat="MMM D[,] YYYY"
                  disabled={this.state.isCanceled}
                  maxDate={moment().local()}
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                />
              </div>
            </div>
          </div>
          <div className="form-group">
            <label>&nbsp;Description</label>
            <textarea
              className="form-control"
              name="description"
              maxLength="500"
              value={this.state.description}
              onChange={this.updateInputValue}
              rows="3"
              disabled={this.state.isCanceled}
            />
          </div>
          {/* <div className="form-group">
                    <label>&nbsp;Guest Name</label>
                    <input
                      className="form-control"
                      name="guestName"
                      maxLength="151"
                      value={this.state.guestName}
                      onChange={this.updateInputValue}
                      disabled={this.state.isCanceled}
                    />
                  </div> */}
          <FormGroup>
            <Label>&nbsp;Notify The Recipient of This Story</Label>
            <Input
              type="text"
              name="guestEmail"
              placeholder="Email Address (optional)"
              maxLength="100"
              value={this.state.guestEmail}
              disabled={this.state.isCanceled}
              onChange={e => {
                this.setState({ [e.target.name]: e.target.value }, () => {
                  setTimeout(() => {
                    this.validateInputs();
                  }, 900);
                });
              }}
              invalid={!this.state.validation.guestEmail}
            />
            <FormFeedback valid />
            <FormFeedback>Invalid email address(es)</FormFeedback>
          </FormGroup>
          <div className="form-group" style={{ minWidth: "22em" }}>
            <label>&nbsp;Select When to Send a Notification Email</label>
            <div className="form-row">
              <div className="col" style={{ maxWidth: "28%", minWidth: "9em" }}>
                <DatePicker
                  selected={this.state.endDate}
                  onChange={date => {
                    this.setState({
                      endDate: date
                    });
                  }}
                  className="form-control text-center"
                  dateFormat="MMM D[,] YYYY"
                  disabled={this.state.isCanceled}
                  minDate={moment().local()}
                  maxDate={moment().add(1, "year")}
                />
              </div>
              <div className="col" style={{ maxWidth: "25%", minWidth: "8em" }}>
                <DatePicker
                  selected={this.state.endTime}
                  onChange={time => {
                    this.setState({
                      endTime: time
                    });
                  }}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  className="form-control text-center"
                  dateFormat="LT"
                  disabled={this.state.isCanceled || this.state.isAllDay}
                />
              </div>
            </div>
            {!this.state.validation.dateRange && (
              <small className="text-red">Invalid start and end dates</small>
            )}
          </div>
          <div className="text-center">
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
            <button
              className="btn-lg btn-muted"
              onClick={() => this.props.history.push("/view")}
            >
              Cancel
            </button>
            &nbsp;&nbsp;
            <button
              className="btn-lg btn-primary"
              onClick={() => {
                this.validateInputs();
                if (this.allValid()) {
                  this.handleSubmission();
                }
              }}
            >
              {(this.state.inEditMode && "Update") || "Submit"}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(CreateTimeBlock);
