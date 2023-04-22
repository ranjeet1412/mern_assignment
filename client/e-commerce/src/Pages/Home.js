import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const [userData, setUserData] = useState([]);
  const [limit, setLimit] = useState(5);
  const [pageCount, setPageCount] = useState(1);
  const navigate = useNavigate();
  const username = JSON.parse(localStorage.getItem("firstname"));
  const role = localStorage.getItem("role");

  // console.log("first" , role)

  const currentPage = useRef();

  //get all userdata
  const getUserData = async () => {
    const response = await axios.get("http://localhost:3001/auth/getAllUsers");
    console.log("123", response.data.data);
    setUserData(response.data.data);
  };

  //useeffect calling pagination data
  useEffect(() => {
    // getUserData();
    currentPage.current = 1;
    getPaginatedUser();
  }, []);

//for edit user
  const handleEdit = async (userID) => {
    // console.log(userID);
    navigate(`edituser/${userID}`);
  };
  //for add user
  const handleAdd = () =>{
    navigate('/adduser');

  }
  //for delete
  const handleDelete = async (userID, name) => {
    console.log("called", userID, name);
    if (window.confirm(`Are you sure want to delete ${name}`)) {
      try {
        const response = await axios.get(
          "http://localhost:3001/auth/deleteUsers",
          { userID }
        );
        console.log(response.data);
        getUserData();
      } catch (error) {
        console.log(error);
      }
    } else {
    }
  };
  //for page click
  const handlePageClick = async (e) => {
    console.log(e);
    currentPage.current = e.selected + 1;
    getPaginatedUser();
  };
  //for pagination
  const getPaginatedUser = async () => {
    const response = await axios.get(
      `http://localhost:3001/auth/paginatedUsers?page=${currentPage.current}&limit=${limit}`
    );
    // console.log(response.data);
    setPageCount(response.data.pageCount);
    setUserData(response.data.result);
  };

  return (
    <section className="vh-100 gradient-custom">
      <div className="container py-5 h-100">
        <div className="row justify-content-center align-items-center h-100">
          <div className="col-12 col-lg-9 col-xl-7 ">
         

            <div className="d-flex justify-content-between">
            <h2 className="text-center text-warning">Welcome {username}</h2>
              <button className="btn btn-primary mb-2" onClick={handleAdd}>Add User</button>
            </div>
            <table className="table table-bordered ">
              <thead>
                <tr>
                  <th>Sr</th>
                  <th>Firstname</th>
                  <th>Lastname</th>
                  <th>Email</th>
                  <th>Mobile No</th>
                  <th>Birth Date</th>
                  <th>Username</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              {userData.map((i, e) => (
                <tbody>
                  <tr>
                    <td>{Number(e + 1)}</td>

                    <td>{i.firstname}</td>
                    <td>{i.lastname}</td>
                    <td>{i.email}</td>
                    <td>{i.mobileno}</td>
                    <td>{i.birthdate}</td>
                    <td>{i.username}</td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleEdit(i._id)}
                      >
                        Edit
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(i._id, i.firstname)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
            <ReactPaginate
              breakLabel="..."
              nextLabel="next >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              pageCount={pageCount}
              previousLabel="< previous"
              renderOnZeroPageCount={null}
              marginPagesDisplayed={2}
              containerClassName="pagination justify-content-center"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              activeClassName="active"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
