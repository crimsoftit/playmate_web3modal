import React from "react";
import { createRoot } from "react-dom/client";

import { App } from "./App";


//window.Buffer = require('buffer/').Buffer;

createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
