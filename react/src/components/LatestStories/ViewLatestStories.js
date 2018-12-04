import React, { Component } from "react";
import StorySnippet from "./StorySnippet";
import { GetLatestStories } from "../../services/story.service";
const $ = window.$;

class ViewLatestStories extends Component {
  state = {
    isLoading: true,
    stories: []
  };

  GetNewestByPage = (index, pageSize) => {
    //this.setState({ isLoading: true });
    GetLatestStories(index, pageSize).then(resp => {
      let stories = resp.data.items;
      this.setState({ stories, isLoading: false });
    });
  };

  componentDidMount() {
    this.GetNewestByPage(0, 10);

    this.signalR = $.connection.storyHub;
    this.signalR.client.usersMsgReceipt = message => {
      alert(message);
    };
    this.signalR.client.updateFromServer = newStory => {
      this.setState({ stories: [newStory, ...this.state.stories] });
    };
    $.connection.hub
      .start()
      .done(() => {
        console.log("Now connected, connection ID= ", $.connection.hub.id);
      })
      .fail(function(err) {
        console.log(err);
      });
  }

  render() {
    const loadingMessage = () => {
      return (
        <React.Fragment>
          <tr>
            <td>
              <div className="font-weight-bold">Loading...</div>
            </td>
          </tr>
        </React.Fragment>
      );
    };

    return (
      <div
        className="col-xl-5 col-lg-6 col-md-7 col-sm-10 col-xs-12 mx-auto text-center"
        style={{ paddingBottom: "2em", marginTop: "-1em" }}
      >
        <h1 className="landing-page-spacer">Latest Stories</h1>

        <div className="results-container">
          <table className="table table-light table-bordered table-striped">
            <tbody>
              {this.state.isLoading && loadingMessage()}
              {this.state.stories.map(story => (
                <StorySnippet key={story.id} story={story} />
              ))}
            </tbody>
          </table>
        </div>

        <button
          className="btn btn-lg btn-block btn-dark pointer"
          onClick={() =>
            $.connection.storyHub.server.notifyAllUsers("Hi from signalR")
          }
        >
          Test SignalR
        </button>
      </div>
    );
  }
}

export default ViewLatestStories;
