import React from "react";
import { Route, Navigate } from "react-router-dom";

const PrivateRoute: React.FC<{
  component: React.ComponentType<any>;
}> = ({ component: RouteComponent }) => {
  return localStorage.getItem("token") ? (
    <RouteComponent />
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
