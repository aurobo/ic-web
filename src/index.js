import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { HashRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { theme } from "./components/thematic";

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <HashRouter>
      <App />
    </HashRouter>
  </ThemeProvider>,
  document.getElementById("root")
);
registerServiceWorker();
