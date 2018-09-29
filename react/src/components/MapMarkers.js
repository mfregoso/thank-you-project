import React, { Component } from "react";
import { withRouter } from "react-router";
import { Button, Popover, PopoverHeader, PopoverBody } from "reactstrap";
import "../css/custom.css";

class MapMarkers extends Component {
  state = {
    popoverOpen: false
  };

  toggle = () =>
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });

  toggle = this.toggle.bind(this);

  render() {
    const { story } = this.props;
    let copy = story;
    if (story.description.length > 60) {
      let description = story.description.substr(0, 60) + "...";
      copy = {
        ...story,
        description,
        tooLong: true
      };
    }
    return (
      <span>
        <Button
          className="mr-1"
          color="secondary"
          id={"Popover-" + copy.id}
          onClick={this.toggle}
        >
          {copy.thankeeName}
        </Button>
        <Popover
          placement={"auto"}
          isOpen={this.state.popoverOpen}
          target={"Popover-" + copy.id}
          toggle={this.toggle}
          style={{ width: "17em" }}
        >
          <PopoverHeader>
            {copy.dayOfStory}
            <span
              className="float-right popover-close-btn"
              onClick={this.toggle}
            >
              X
            </span>
          </PopoverHeader>
          <PopoverBody>
            <div className="font-weight-bold">Dear {copy.thankeeName},</div>
            <div
              style={{
                whiteSpace: "pre-wrap",
                width: "100%"
              }}
            >
              {copy.description}
            </div>
            <div className="font-weight-bold">- {copy.posterName}</div>
            <div className="text-center marker-spacer">
              <button
                className="btn btn-sm btn-block btn-success"
                onClick={() => this.props.history.push("/edit/" + copy.id)}
              >
                See More Details
              </button>
            </div>
          </PopoverBody>
        </Popover>
      </span>
    );
  }
}

export default withRouter(MapMarkers);
