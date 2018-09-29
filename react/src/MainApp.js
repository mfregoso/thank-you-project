import React, { Component } from "react";
import { Switch, Route } from "react-router-dom"; // use Redirect?
import NavBar from "./components/TopNavBar";
import LandingPage from "./components/LandingPage";
import SubmitStory from "./components/SubmitStory";
import ViewStories from "./components/ViewStories";

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
          <Route path="/find" render={props => <ViewStories {...props} />} />
        </Switch>
      </div>
    );
  }
}

export default Routes;
