import React, { useState } from "react";

const useHover = () => {
  const [hover, setHover] = useState(false);

  const handleHover = (state: boolean) => {
    return setHover(state);
  };

  return { handleHover, hover };
};

export default useHover;
