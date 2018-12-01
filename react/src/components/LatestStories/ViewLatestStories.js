import React, { Component } from "react";
const $ = window.$;

class ViewLatestStories extends Component {
  componentDidMount() {
    this.signalR = $.connection.storyHub;
    this.signalR.client.usersMsgReceipt = message => {
      alert(message);
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
    return (
      <div
        className="col-xl-5 col-lg-6 col-md-7 col-sm-10 col-xs-12 mx-auto text-center"
        style={{ paddingBottom: "2em", marginTop: "-1em" }}
      >
        <h1 className="landing-page-spacer">Latest Thank You Stories</h1>
        <button
          className="btn btn-lg btn-block btn-success landing-btn-spacer"
          onClick={() => this.props.history.push("/share")}
        >
          Share Your Story
        </button>
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
