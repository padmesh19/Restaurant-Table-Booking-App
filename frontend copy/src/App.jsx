import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import "./App.css";
import { Outlet } from "react-router";
import { useDispatch } from "react-redux";
import { fetchProfile } from "./redux/authSlice";

const isAuthenticated = () => !!localStorage.getItem("jwtToken");

function Root() {
  const dispatch = useDispatch();
  const [authChecked, setAuthChecked] = useState(false);

    useEffect(() => {
    if (isAuthenticated()) {
      dispatch(
        fetchProfile((error) => {
          if (error) {
            localStorage.removeItem("jwtToken");
          }
          setAuthChecked(true);
        })
      );
    } else {
      setAuthChecked(true);
    }
  }, []);


  if (!authChecked) {
    return <div>Loading...</div>; // global auth loading screen
  }

  return (
    <>
      <Helmet>
        <title>Dine Desk</title>
      </Helmet>
      <Outlet />
    </>
  );
}

export default Root;
