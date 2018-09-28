import React from "react";
import ReactDOM from "react-dom";
import MainApp from "./MainApp";
import registerServiceWorker from "./registerServiceWorker";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/siteSettings";
import "./css/custom.css";
import "bootstrap/dist/css/bootstrap.css";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <MainApp />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
