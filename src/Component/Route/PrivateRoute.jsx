import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
const PrivatetRoute = ({isAdmin}) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  return (
    <>
      {loading === false && isAuthenticated ? (
        isAdmin ? (
          loading === false && user.user.role === "admin" ? (
            <Outlet />
          ) : (
           <Navigate to="/default/request/unknown" />
          )
        ) : (
          <Outlet />
        )
      ) : (
        !loading && isAuthenticated === false && <Navigate to="/access" />
      )}
      {/* {!loading && isAuthenticated ?  <Outlet/> : (!loading && isAuthenticated === false && <Navigate to="/access" />)} */}
    </>
  );
};

export default PrivatetRoute;
