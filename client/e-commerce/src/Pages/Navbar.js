import React from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [cookie, setCookie] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("called");
    setCookie("access_token", "");
    window.localStorage.removeItem("userID");
    navigate("/Login");
  };

  return (
    <div
      className="navbar"
      style={{
        textDecoration: "none",
        display: "flex",
        justifyContent: "right",
        alignItems: "center",
        // background: "orange",
        height: "60px",
      }}
    >
      {cookie.access_token ? (
        <>
          {" "}
          <Link to="/">Home</Link>
         
        </>
      ) : null}
      {!cookie.access_token ? (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      ) : (
        <>
          <button className="btn btn-warning ms-5" onClick={handleLogout}>Logout</button>
        </>
      )}
      {/* <Link to="/login">Login</Link> */}
    </div>
  );
};

export default Navbar;
