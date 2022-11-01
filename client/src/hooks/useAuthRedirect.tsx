import React from "react";
import { useNavigate } from "react-router-dom";

const useAuthRedirect = (to = "/login") => {
  let redirect = false;
  if (!localStorage.getItem("token")) return (redirect = true);

  const nav = useNavigate();

  return redirect && nav(to);
};

export default useAuthRedirect;
