import React, { Component } from "react";
import { GetStoryById } from "../services/story.service";
import moment from "moment";
import logo from "../img/typ-logo.png";
import {getHref} from "../utilities";

class ViewStory extends Component {
  state = {
    thankeeName: "",
    posterName: "",
    location: "",
    dayOfStory: "",
    description: "",
    isLoading: false
  };

  componentDidMount() {
    if (this.props.match.params.slug) {
      let checkId = /^\d+$/;
      let tempId = this.props.match.params.slug.split("-").pop();
      if (checkId.test(tempId)) {
        this.setState({ isLoading: true });
        let storyId = parseInt(tempId, 10);
        GetStoryById(storyId)
          .then(resp => this.setFormValues(resp.data.item))
          .catch(err => {
            console.log(err);
            this.setState({ isLoading: false });
          });
      }
    }
  }

  setFormValues = stry => {
    if (stry) {
      let story = this.reformatStory(stry);
      this.setState({
        dayOfStory: story.dayOfStory,
        thankeeName: story.thankeeName,
        posterName: story.posterName,
        location: story.location || "",
        description: story.description || "",
        latitude: story.latitude,
        longitude: story.longitude,
        isLoading: false
      });
    } else {
      this.setState({ isLoading: false });
    }
  };

  reformatStory = story => {
    let dayOfStory = moment(story.storyDate, "YYYY-MM-DD").format(
      "dddd, MMMM D, YYYY"
    );
    return {
      ...story,
      dayOfStory
    };
  };

  handleLinkClick = event => {
    const href = getHref(event);
    this.props.history.push(href);
  }

  render() {
    const {
      thankeeName,
      description,
      posterName,
      isLoading,
      dayOfStory,
      location,
      latitude,
      longitude
    } = this.state;

    const showStory = () => {
      if (!thankeeName && isLoading) {
        return <h3 className="text-center">Loading...</h3>;
      } else if (!thankeeName) {
        return (
          <div className="mx-auto text-center">
            <h3 className="font-weight-bold">
              It looks like this story doesn't exist :/
            </h3>
            <br />
            <h3>
              Would you like to{" "}
              <a
                href="/share"
                onClick={this.handleLinkClick}
              >
                Share a Thank You Story
              </a>
              ?
            </h3>
            <img
              src={logo}
              alt="Thank You Project logo"
              style={{ maxWidth: "55%", paddingTop: "2em" }}
            />
          </div>
        );
      } else if (thankeeName && !isLoading) {
        return (
          <React.Fragment>
            <h3>Thank You, {thankeeName}</h3>
            <div
              className="marker-desc"
              style={{
                whiteSpace: "pre-wrap",
                width: "100%"
              }}
            >
              {description}
            </div>
            <div className="font-italic">
              <strong>Sincerely,</strong>
            </div>
            <div>
              <strong>- {posterName}</strong>
            </div>
            <br />
            <div>
              <p>
                This story happened on {dayOfStory} at {location}.
              </p>
            </div>
            <div className="text-center mx-auto">
              <embed
                width="370"
                height="190"
                frameBorder="0"
                style={{ border: 0 }}
                src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBcBHH4tjzT73Zms3uDoCun9GaNy-Ue5QQ&q=${latitude},${longitude}&maptype=roadmap&zoom=17`}
              />
              {/* Visual improvement needed here */}
            </div>
            <br />
          </React.Fragment>
        );
      }
    };

    return (
      <div className="container-fluid view-spacer">
        <div className="mx-auto col-xl-6 col-lg-6 col-md-8 col-xs-12">
          {showStory()}
        </div>
      </div>
    );
  }
}

export default ViewStory;
