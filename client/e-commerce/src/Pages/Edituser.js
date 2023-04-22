import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
const Edituser = () => {
  const [editData, setEditData] = useState([]);
  

  const handleValueChange = (e) => {
    const {name, value} = e.target;
    setEditData({
      ...editData,
      [name]: value
    })
  }

  console.log(editData);
  useEffect(() => {
    getIndividualUserData();
  }, []);

  const userID = useParams();
  console.log("editData", editData);

  const getIndividualUserData = async () => {
    // console.log("uid", userID.id);
    const response = await axios.get(
      `http://localhost:3001/auth/individualUser/${userID.id}`
    );
    // console.log(response);
    setEditData(response.data.data);
  };
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.put(
      `http://localhost:3001/auth/update/${userID.id}`,editData
    );
    navigate("/")
    console.log(response);
  };
  return (
    <section className="vh-100 gradient-custom">
      <div className="container py-5 h-100">
        <div className="row justify-content-center align-items-center h-100">
          <div className="col-12 col-lg-9 col-xl-7">
            <div
              className="card shadow-2-strong card-registration"
              style={{ borderRadius: "15px" }}
            >
              <div className="card-body p-4 p-md-5">
                <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">Registration Form</h3>
                <form onSubmit={handleSubmit}>
                  {/* <h1 classNameName="text-center">Register Here</h1> */}
                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <lable className="form-label">firstname</lable>
                        <input
                          type="firstname"
                          placeholder="firstname"
                          name="firstname"
                          value={editData.firstname}
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
                          value={editData.lastname}
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
                          value={editData.username}
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
                          value={editData.email}
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
                          value={editData.birthdate}
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
                          value={editData.mobileno}
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
                          value={editData.role}
                        >
                          <option value="" disabled>
                            select role
                          </option>

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
                          disabled
                          name="password"
                          value={editData.password}
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default Edituser;
