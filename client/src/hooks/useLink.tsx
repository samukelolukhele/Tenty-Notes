import React from "react";
import { useNavigate } from "react-router-dom";

const useLink = () => {
  const nav = useNavigate();

  const handleLinkId = async (route: string, id: string) => {
    return nav(`/${route}/?id=${id}`);
  };

  return handleLinkId;
};

export default useLink;
