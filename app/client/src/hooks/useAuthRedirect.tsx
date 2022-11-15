import React from "react";
import { useNavigate } from "react-router-dom";

const useAuthRedirect = (to = "/login") => {
  const nav = useNavigate();
  if (!localStorage.getItem("token")) {
    nav(to);
  } else if (localStorage.getItem("token")) return;
};

export default useAuthRedirect;
