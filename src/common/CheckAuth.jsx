import React from "react";
import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isAuthenticated, user, children }) {
  let location = useLocation();

  
  if (
    !isAuthenticated &&
    location.pathname.includes("/admin")
  ) {
    return <Navigate to={"/"} />;
  }
  if (location.pathname==="/") {
    return <Navigate to={"/home"} />;
  }
  if (
    !isAuthenticated &&location.pathname.includes("/checkout")) {
    return <Navigate to={"/login"} />;
  }
  if (
    !isAuthenticated &&location.pathname.includes("user/orders")) {
    return <Navigate to={"/login"} />;
  }
  if (
    isAuthenticated &&
    user?.role !== "admin" &&
    location.pathname.includes("/admin")
  ) {
    return <Navigate to={"/"} />;
  }
  if (
    isAuthenticated &&
    (location.pathname.includes("/login") ||
      location.pathname.includes("/singup"))
  ) {
    if (user?.role === "admin") {
      return <Navigate to={"/admin/home"} />;
    } else {
      return <Navigate to={"/home"} />;
    }
  }

  return <>{children}</>;
}

export default CheckAuth;
