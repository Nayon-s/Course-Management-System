

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Profile = (props) => {
  const location = useLocation();
  const [teacherDetails, setTeacherDetails] = useState(null);
  const [courses, setCourses] = useState([]);
  const { setProgress } = props;

  useEffect(() => {
    if (location.state && location.state.id) {
      setTeacherDetails(location.state.id);
      localStorage.setItem(
        "teacherState",
        JSON.stringify({ id: location.state.id })
      );
    } else {
      const savedState = JSON.parse(localStorage.getItem("teacherState"));
      if (savedState && savedState.id) {
        setTeacherDetails(savedState.id);
      }
    }
  }, [location.state]);
  const [appliedCourses, setAppliedCourses] = useState([]);

  const applied = async () => {
    setProgress(50)
    const response = await fetch(
      "http://localhost:5000/api/course/appliedcourse",
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: teacherDetails.name,
          email: teacherDetails.email,
          department: teacherDetails.department,
        }),
      }
    );
    const json = await response.json();
    console.log(json);
    setAppliedCourses(json);
    setProgress(100)
  };
  const [assignedCourses, setAssignedCourses] = useState([]);

  const assigned = async () => {
    
    const response = await fetch(
      "http://localhost:5000/api/course/assignedcourse",
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: teacherDetails.name,
          email: teacherDetails.email,
          department: teacherDetails.department,
        }),
      }
    );
    const json = await response.json();
    console.log(json);
    setAssignedCourses(json);
  };

  useEffect(() => {
    if (teacherDetails) {
       applied();
      assigned();
    }
  }, [teacherDetails]);

  setProgress(100);



  return (
    <div>
      <Navbar />
      {teacherDetails && (
        <div className="container mt-4">
          <div
            className="alert alert-info   fs-5 fw-semibold text-center"
            role="alert"
          >
            WELCOME, {teacherDetails.name}!
          </div>
          <div>
            <div className="row mt-5">
              {/* <div className="col-lg-1 col-md-2 col-sm-12"></div> */}

              {/* <div className="col-lg-1 "></div> */}

              <div className="col-lg-4 col-md-8 col-sm-12">
                <div
                  className="card teacherCard d-block mt-3 m-auto mb-5 text-center "
                  style={{ width: "26rem" }}
                >
                  <img
                    src="https://img.freepik.com/free-vector/illustration-social-media-concept_53876-18146.jpg?w=996&t=st=1700241345~exp=1700241945~hmac=78f947923985927a3e37a6e49a7a17580befde66fdadf0c04a88f9dac0e17096"
                    className="card-img-top"
                    alt="..."
                  />
                  <img
                    src="https://img.freepik.com/premium-vector/young-man-avatar-character-vector-illustration-design_24877-18514.jpg?w=2000"
                    className="card-img-top img-fluid rounded-circle teacherProfile"
                    alt=""
                  />
                                    <h5 className="card-title text-center fw-semibold fs-5 mt-2">Teacher Info</h5>


                                    <div className="card-body fs-6">
                  <ul className="list-group list-group-flush">
                  <li className="list-group-item bg-light fs-5 fw-semibold">
                        Name: {teacherDetails.name}
                      </li>
                      <li className="list-group-item bg-dark text-light">
                        Department: {teacherDetails.department}
                      </li>
                      <li className="list-group-item bg-light">
                        Designation: {teacherDetails.designation}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* <div></div> */}
              <div className="col-lg-4 col-md-6 col-sm-12 mt-3">
                <div
                  className="alert bg-dark mt-5 fs-3 fw-semibold text-center text-light" style={{backgroundColor:"black"}}
                  role="alert"
                >
                  Courses Applied
                </div>
                <table
                  className="table table-sm  table-responsive-sm text-center mb-3 fw-semibold"
                  style={{ width: "", border: "2px solid" }}
                >
                  <thead>
                    <tr className="bg-light">
                      <th scope="col">Course Title</th>
                      <th scope="col">Course Code</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appliedCourses.map((index, id) => {
                      return (
                        <tr
                          className={`${
                            id % 2 === 0
                              ? "bg-dark text-light"
                              : "bg-light text-dark"
                          }`}
                          key={id}
                        >
                          <td>{index.courseTitle}</td>
                          <td>{index.courseCode}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12 mt-3">
                <div
                  className="alert bg-dark text-light mt-5 fs-3 fw-semibold text-center"
                  role="alert"
                >
                  Courses Assigned
                </div>

                <table
                  className="table table-sm mb-5 table-responsive-sm text-center fw-semibold"
                  style={{ width: "", border: "2px solid" }}
                >
                  <thead>
                    <tr className="bg-light">
                      <th scope="col">Course Title</th>
                      <th scope="col">Course Code</th>
                    </tr>
                  </thead>
                  <tbody>
                    {assignedCourses.map((index, id) => {
                      return (
                        <tr
                          className={`${
                            id % 2 === 0
                              ? "bg-dark text-light"
                              : "bg-light text-dark"
                          }`}
                          key={id}
                        >
                          <td>{index.courseTitle}</td>
                          <td>{index.courseCode}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Profile;
