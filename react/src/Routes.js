import React, { Component } from "react";
import { Switch, Route } from "react-router-dom"; // use Redirect?
import NavBar from "./components/TopNavBar";
import LandingPage from "./components/LandingPage";
import SubmitStory from "./components/SubmitStory";

class Routes extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Switch>
          <Route exact path="/" render={props => <LandingPage {...props} />} />
          <Route
            exact
            path="/create"
            render={props => <SubmitStory {...props} />}
          />
        </Switch>
      </div>
    );
  }
}

export default Routes;
