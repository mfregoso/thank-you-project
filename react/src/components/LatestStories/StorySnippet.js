import React from "react";
import { withRouter } from "react-router";
import getStoryUrl from "../../utilities/getViewUrl";
import {getHref} from "../../utilities";

const StorySnippet = (props) => {
  const {story, history} = props;
  const url = getStoryUrl(story.thankeeName, story.id);

  const handleClick = event => {
    const urlPath = getHref(event);
    history.push(urlPath);
  };

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
          <a href={url} className="btn btn-sm btn-success" onClick={handleClick}>
            View
          </a>
        </td>
      </tr>
    </React.Fragment>
  );
};

export default withRouter(StorySnippet);
