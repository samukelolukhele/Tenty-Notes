import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
    localStorage.removeItem("token");
    window.location.reload();
  };
  return <a onClick={handleClick}>Logout</a>;
};

export default Logout;
