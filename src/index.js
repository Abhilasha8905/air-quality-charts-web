import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import AirQualityDashboard from "./Dashboard";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AirQualityDashboard />
  </React.StrictMode>
);
