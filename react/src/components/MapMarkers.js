import React, { Component } from "react";
import { Button, Popover, PopoverHeader, PopoverBody } from "reactstrap";

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
    return (
      <span>
        <Button
          className="mr-1"
          color="secondary"
          id={"Popover-" + this.props.id}
          onClick={this.toggle}
        >
          {this.props.story.thankeeName}
        </Button>
        <Popover
          placement={"auto"}
          isOpen={this.state.popoverOpen}
          target={"Popover-" + this.props.id}
          toggle={this.toggle}
        >
          <PopoverHeader>Popover Title</PopoverHeader>
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
