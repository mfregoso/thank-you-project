import React, { Component } from "react";
import { Button, Popover, PopoverHeader, PopoverBody } from "reactstrap";
import "../css/custom.css";

class MapMarkers extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      popoverOpen: false
    };
  }

  toggle() {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
  }

  render() {
    const { story } = this.props;
    return (
      <span>
        <Button
          className="mr-1"
          color="secondary"
          id={"Popover-" + story.id}
          onClick={this.toggle}
        >
          {story.thankeeName}
        </Button>
        <Popover
          placement={"auto"}
          isOpen={this.state.popoverOpen}
          target={"Popover-" + story.id}
          toggle={this.toggle}
        >
          <PopoverHeader>
            Popover Title
            <span
              className="float-right popover-close-btn"
              onClick={this.toggle}
            >
              X
            </span>
          </PopoverHeader>
          <PopoverBody>
            How long can this body text go How long can this body text goHow
            long can this body text go?
          </PopoverBody>
        </Popover>
      </span>
    );
  }
}

export default MapMarkers;
