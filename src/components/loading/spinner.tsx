import React from "react";
import "./spinner.css";
import { Typewriter } from "./initialLoading";

export const Spinner: React.FC = () => {
  return (
    <div className="spinner text-white">
      <Typewriter text={"..."} speed={300} loop={true} />
      <div className="spinner-sector spinner-sector-red"></div>
      <div className="spinner-sector spinner-sector-blue"></div>
      <div className="spinner-sector spinner-sector-green"></div>
    </div>
  );
};
