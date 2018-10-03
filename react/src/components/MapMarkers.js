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
    let stry = { ...story };
    if (story.description.length > 60) {
      let description = story.description.substr(0, 60) + "...";
      stry = {
        ...story,
        description,
        tooLong: true
      };
    }
    return (
      <span>
        <button
          className="btn btn-sm btn-success marker-btn-circle"
          color="success"
          id={"Popover-" + stry.id}
          onClick={this.toggle}
        />
        <Popover
          placement={"auto"}
          isOpen={this.state.popoverOpen}
          target={"Popover-" + stry.id}
          toggle={this.toggle}
          style={{ width: "17em" }}
        >
          <PopoverHeader>
            <small>{stry.dayOfStory}</small>
            <span
              className="float-right popover-close-btn"
              onClick={this.toggle}
            >
              X
            </span>
          </PopoverHeader>
          <PopoverBody>
            <div className="font-weight-bold">
              <big>{stry.thankeeName}</big>,
            </div>
            <div
              className="marker-desc"
              style={{
                whiteSpace: "pre-wrap",
                width: "100%"
              }}
            >
              {stry.description}
            </div>
            <div className="font-weight-bold">- {stry.posterName}</div>
            <div className="text-center marker-spacer">
              <button
                className="btn btn-sm btn-block btn-success"
                //onClick={() => this.props.history.push("/edit/" + stry.id)}
                onClick={() => {
                  this.toggle();
                  this.props.selectStory(this.props.idx);
                }}
              >
                Read Full Story
              </button>
            </div>
          </PopoverBody>
        </Popover>
      </span>
    );
  }
}

export default withRouter(MapMarkers);
