import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const AddUser = () => {
  const [userData, setUserData] = useState({});

 
  //handle change
    const handleValueChange = (e) => {
      const {name, value} = e.target;
      setUserData({
        ...userData,
        [name]: value
      })
    }
  
    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log("called", userData);
      if (
        userData.firstname == "" &&
        userData.lastname == "" &&
        userData.username == "" &&
        userData.role == "" &&
        userData.email == "" &&
        userData.password == "" &&
        userData.birthdate == "" &&
        userData.mobileno == ""
      ) {
        alert("please filled form");
      } else {
        try {
          const response = await axios.post(
            "http://localhost:3001/auth/register",
            
              userData
            
          );
          alert("User Added Successfully!");
  
          // console.log("responce", response);
          navigate("/");
        } catch (error) {
          console.log("error", error);
        }
        setUserData({})
      }
    };
  
  return (
    <section class="vh-100 gradient-custom">
    <div class="container py-5 h-100">
      <div class="row justify-content-center align-items-center h-100">
        <div class="col-12 col-lg-9 col-xl-7">
          <div
            class="card shadow-2-strong card-registration"
            style={{ borderRadius: "15px" }}
          >
            <div class="card-body p-4 p-md-5">
              <h3 class="mb-4 pb-2 pb-md-0 mb-md-5 text-center">Add User</h3>
              <form onSubmit={handleSubmit}>
                {/* <h1 className="text-center">Register Here</h1> */}
                <div class="row">
                  <div class="col-md-6 mb-4">
                    <div className="form-outline">
                      <lable className="form-label">firstname</lable>
                      <input
                        type="firstname"
                        placeholder="firstname"
                        name="firstname"
                        value={userData.firstname}
                        onChange={(e) => handleValueChange(e)}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div class="col-md-6 mb-4">
                    <div className="form-outline">
                      <lable className="form-label">lastname</lable>
                      <input
                        type="lastname"
                        placeholder="lastname"
                        name="lastname"
                        value={userData.lastname}
                        onChange={(e) => handleValueChange(e)}
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6 mb-4">
                    <div className="form-outline">
                      <lable className="form-label">Username</lable>
                      <input
                        placeholder="username"
                        name="username"
                        className="form-control"
                        value={userData.username}
                        onChange={(e) => handleValueChange(e)}
                      />
                    </div>
                  </div>
                  <div class="col-md-6 mb-4">
                    <div className="form-outline">
                      <lable className="form-label">Email</lable>
                      <input
                        type="email"
                        placeholder="email"
                        name="email"
                        value={userData.email}
                        onChange={(e) => handleValueChange(e)}
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6 mb-4">
                    <div className="form-outline">
                      <lable className="form-label">Birth Date</lable>
                      <input
                        placeholder="Birth date"
                        name="birthdate"
                        className="form-control"
                        value={userData.birthdate}
                        onChange={(e) => handleValueChange(e)}
                      />
                    </div>
                  </div>
                  <div class="col-md-6 mb-4">
                    <div className="form-outline">
                      <lable className="form-label">Mobile No</lable>
                      <input
                        type="number"
                        placeholder="Mobile number"
                        name="mobileno"
                        value={userData.mobileno}
                        onChange={(e) => handleValueChange(e)}
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6 mb-4">
                    <div className="form-outline">
                      <lable className="form-label">Role</lable>
                      <select
                        onChange={(e) => handleValueChange(e)}
                        className="form-select"
                        value={userData.role}
                        name="role"
                      >
                        <option value="" disabled>select role</option>

                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>
                  </div>
                  <div class="col-md-6 mb-4">
                    <div className="form-outline">
                      <lable className="form-label">Password</lable>
                      <input
                        type="password"
                        placeholder="password"
                        name="password"
                        value={userData.password}
                        onChange={(e) => handleValueChange(e)}
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-1 mt-3"></div>
                <div className="mb-1 mt-3"></div>
                <div className="text-center mt-3">
                  <button type="submit" className="btn btn-primary">
                    {" "}
                    Submit
                  </button>
                </div>
              </form>
            </div>

         
          </div>
          <div className="col-lg-3"></div>
        </div>
      </div>
    </div>
  </section>
  )
}

export default AddUser