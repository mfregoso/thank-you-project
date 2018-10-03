import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { withRouter } from "react-router";

class ViewStoryModal extends Component {
  render() {
    const { story } = this.props;
    return (
      <React.Fragment>
        <Modal
          isOpen={this.props.showModal}
          size="md"
          toggle={this.props.toggle}
          className={this.props.className}
        >
          <ModalHeader
            className="bg-success"
            toggle={this.toggle}
            style={{ color: "white", paddingLeft: "1.9em" }}
          >
            <big>&nbsp;Thank You, {story.thankeeName}</big>
          </ModalHeader>
          <ModalBody style={{ padding: "1.7em 2.4em 1.6em 2.4em" }}>
            On {story.dayOfStory} at {story.location},<br />
            <div
              className="marker-desc"
              style={{
                whiteSpace: "pre-wrap",
                width: "100%"
              }}
            >
              {story.description}
            </div>
            <div className="font-italic">Sincerely,</div>
            <div>
              <button
                className="float-right btn btn-sm btn-muted"
                style={{ position: "relative", top: "-0.5em" }}
                onClick={() => this.props.history.push("/edit/" + story.id)}
              >
                Edit
              </button>
              <strong>- {story.posterName}</strong>
            </div>
          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}

export default withRouter(ViewStoryModal);
