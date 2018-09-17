import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "mobx-react";
import rootstore from "./store/rootStore";
import Container from "./components/Container";
import styles from "./styles/app.css";
import "./styles/search.css";

// Define stores to use in our application
const stores = {
  rootstore: rootstore
};

ReactDOM.render(
  <div className={styles.main}>
    {/* Use Provide from mobx to provide data from store */}
    <Provider {...stores}>
      <Container />
    </Provider>
  </div>,
  document.getElementById("index")
);
