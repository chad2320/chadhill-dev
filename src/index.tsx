import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { WindowSizeProvider } from "./utils/useWindowSize";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <WindowSizeProvider>
    <App />
  </WindowSizeProvider>
);
