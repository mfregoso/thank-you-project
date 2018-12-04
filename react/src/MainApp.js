import React, { Component } from "react";
import { Switch, Route } from "react-router-dom"; // use Redirect?
import NavBar from "./components/TopNavBar";
import LandingPage from "./components/LandingPage";
import SubmitStory from "./components/SubmitStory";
import ViewStories from "./components/ViewStories";
import ViewStory from "./components/ViewStory";
import ViewLatestStories from "./components/LatestStories/ViewLatestStories";
import GetGeolocation from "./utilities/getUserGeolocation";

class Routes extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Switch>
          <Route exact path="/" render={props => <LandingPage {...props} />} />
          <Route path="/share" render={props => <SubmitStory {...props} />} />
          <Route
            exact
            path="/edit/:id"
            render={props => <SubmitStory {...props} />}
          />
          <Route
            exact
            path="/view/:slug"
            render={props => <ViewStory {...props} />}
          />
          <Route
            path="/discover"
            render={props => <ViewStories {...props} />}
          />
          <Route
            path="/latest"
            render={props => <ViewLatestStories {...props} />}
          />
        </Switch>
        <GetGeolocation />
      </div>
    );
  }
}

export default Routes;
