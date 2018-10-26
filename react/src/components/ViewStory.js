import React, { Component } from "react";
import { GetStoryById } from "../services/story.service";
import moment from "moment";

class ViewStory extends Component {
  state = {
    thankeeName: "",
    posterName: "",
    location: "",
    dayOfStory: "",
    description: ""
  };

  componentDidMount() {
    if (this.props.match.params.slug) {
      let checkId = /^\d+$/;
      let tempId = this.props.match.params.slug.split("-").pop();
      if (checkId.test(tempId)) {
        let storyId = parseInt(tempId, 10);
        GetStoryById(storyId).then(resp => this.setFormValues(resp.data.item));
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
        longitude: story.longitude
      });
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

  render() {
    return (
      <div className="container-fluid view-spacer">
        <div className="mx-auto col-xl-6 col-lg-6 col-md-8 col-xs-12">
          <h3>Thank You, {this.state.thankeeName}</h3>
          <div
            className="marker-desc"
            style={{
              whiteSpace: "pre-wrap",
              width: "100%"
            }}
          >
            {this.state.description}
          </div>
          <div className="font-italic">
            <strong>Sincerely,</strong>
          </div>
          <div>
            <strong>- {this.state.posterName}</strong>
          </div>
          <br />
          This story happened on {this.state.dayOfStory} at{" "}
          {this.state.location}.
        </div>
      </div>
    );
  }
}

export default ViewStory;
