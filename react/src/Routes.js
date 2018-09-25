import React, { Component } from "react";
import { Route } from "react-router-dom";
import TopNavBar from "./components/TopNavBar";

class Routes extends Component {
  render() {
    return (
      <div>
        <TopNavBar />
        Hello
      </div>
    );
  }
}

export default Routes;
