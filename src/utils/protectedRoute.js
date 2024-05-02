import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = (props) => {
  const { Component } = props;
  const token = localStorage.getItem("token");

  return (
    <div>
      {token ? <Component /> : <Navigate to="/login" />}
    </div>
  );
};

export default ProtectedRoute;
