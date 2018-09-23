import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "mobx-react";
import { stores } from "./store";
import "./styles/app.scss";
import Index from "./components";

ReactDOM.render(
  <Provider {...stores}>
    <Index />
  </Provider>,
  document.querySelector("div#index") || document.createElement("div") //For testing only
);
