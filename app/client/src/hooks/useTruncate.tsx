import React from "react";

const useTruncate = () => {
  return (text: string, length: number) => text.substring(0, length) + "...";
};

export default useTruncate;
