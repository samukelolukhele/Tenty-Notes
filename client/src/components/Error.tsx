import React from "react";

interface ErrorProps {
  message: string;
}

const Error = ({ message }: ErrorProps) => {
  console.log(message);
  return (
    <div className="error-message">
      <p>{message}</p>
    </div>
  );
};

export default Error;
