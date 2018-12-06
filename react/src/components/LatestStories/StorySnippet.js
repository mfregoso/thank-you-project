import React from "react";
import getStoryUrl from "../../utilities/getViewUrl";

const StorySnippet = ({ story }) => {
  let url = getStoryUrl(story.thankeeName, story.id);
  return (
    <React.Fragment>
      <tr>
        <td>
          <div className="font-weight-bold">{story.thankeeName}</div>
          <div>{story.location}</div>
          <div className="font-weight-bold">
            <span className="font-italic">- {story.posterName}</span>
          </div>
        </td>
        <td className="align-middle">
          <a href={`${url}`} target="_blank" className="btn btn-sm btn-success">
            View
          </a>
        </td>
      </tr>
    </React.Fragment>
  );
};

export default StorySnippet;
