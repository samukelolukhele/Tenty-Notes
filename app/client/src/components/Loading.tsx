import React from "react";
import "/src/styles/components/Loading/Loading.css";

interface LoadingTypes {
  type: "spinner" | "bar";
  bgColor?:
    | "primary"
    | "secondary"
    | "tetiary"
    | "primary-darken"
    | "secondary-darken"
    | "tetiary-darken"
    | undefined;
}

const Loading = ({ type, bgColor }: LoadingTypes) => {
  if (type == "spinner") {
    return (
      <div className={`spinner bg-${bgColor}`}>
        <span className="spinner-inner-1"></span>
        <span className="spinner-inner-2"></span>
        <span className="spinner-inner-3"></span>
      </div>
    );
  } else {
    return <div className={`bar bg-${bgColor}`}></div>;
  }
};

export default Loading;
