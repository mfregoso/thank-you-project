import React from "react";
import ReactDOM from "react-dom";
import Routes from "./Routes";
import registerServiceWorker from "./registerServiceWorker";
import "./custom.css";
import "bootstrap/dist/css/bootstrap.css";

ReactDOM.render(<Routes />, document.getElementById("root"));
registerServiceWorker();
