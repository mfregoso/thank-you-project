import React, { Component } from "react";
import { withRouter } from "react-router";

class ResultRow extends Component {
  render() {
    const { story } = this.props;
    return (
      <React.Fragment>
        <tr>
          <td>
            <div className="font-weight-bold">{story.thankeeName}</div>
            <div>{story.dayOfStory}</div>
            <div>{story.location}</div>
            <div className="font-weight-bold">
              <span className="font-italic">- {story.posterName}</span>
            </div>
          </td>
          <td className="align-middle">
            <button
              className="btn btn-sm btn-info"
              onClick={() => this.props.history.push("/edit/" + story.id)}
            >
              View
            </button>
          </td>
        </tr>
      </React.Fragment>
    );
  }
}

export default withRouter(ResultRow);
