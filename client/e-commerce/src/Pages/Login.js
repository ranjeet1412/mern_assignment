import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const Login = (name) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //   console.log(username , password)
  // console.log("12", name);
  const [cookie, setCookie] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email == "" && password == "") {
      alert("please enter email and password");
    } else {
      try {
        const response = await axios.post("http://localhost:3001/auth/login", {
          email,
          password,
        });
        console.log("responce", response.data);
        if (response.data.message == "User Does not exist!") {
          alert("user not exist");
        } else if (response.data.message == "Password is incorrect!!") {
          alert("Please enter valid password");
        } else {
          setCookie("access_token", response.data.token);
          window.localStorage.setItem("userID", response.data.userID);
          window.localStorage.setItem("role", response.data.role);
          window.localStorage.setItem("firstname", response.data.firstname);
          if (response.data.role === "admin") {
            navigate("/");
          } else {
            navigate("/userpage");
          }
        }
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div
          className="col-lg-4 offset-4 mt-5"
          style={{
            border: "2px solid black",
            borderRadius: "20px",
            padding: "50px",
          }}
        >
          <h1 className="text-center"> Login Here</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group mt-3">
              <lable className="form-input">Email</lable>
              <input
                placeholder="Email"
                type="email"
                name="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mt-3">
              <lable className="form-lebal">Password</lable>
              <input
                type="password"
                className="form-control"
                placeholder="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="text-center mt-4">
              <button className="btn btn-primary">Login</button>
            </div>
            <div className="mt-2">
              <span className="text-center">
                If you are New User then{" "}
                <Link to="/register">Click here to Register</Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
