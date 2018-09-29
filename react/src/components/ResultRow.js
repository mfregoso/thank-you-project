import React from "react";

const ResultRow = story => {
  return (
    <tr key={story.id}>
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
  );
};

export default ResultRow;
