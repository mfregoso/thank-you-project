import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { withRouter } from "react-router";
import "../css/custom.css";

class ViewStoryModal extends Component {
  render() {
    const { story } = this.props;
    const computeSlug = input =>
      input
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "-")
        .replace(/^-+|-+$/g, "");

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
            <div className="story-modal-container">
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
                  onClick={() =>
                    this.props.history.push(
                      `/view/thank-you-${computeSlug(story.thankeeName)}-${
                        story.id
                      }`
                    )
                  }
                >
                  Permalink
                </button>
                <strong>- {story.posterName}</strong>
              </div>
            </div>
          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}

export default withRouter(ViewStoryModal);
