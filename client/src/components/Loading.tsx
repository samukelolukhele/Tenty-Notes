import React from "react";
import "/src/styles/components/Loading/Loading.css";

const Loading = () => {
  return (
    <div className="spinner">
      <span className="spinner-inner-1"></span>
      <span className="spinner-inner-2"></span>
      <span className="spinner-inner-3"></span>
    </div>
  );
};

export default Loading;
