import React from "preact/compat";
import { render } from "preact";
import { Router } from "./router.tsx";
import "./index.css";

render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>,
  document.getElementById("app")!
);
