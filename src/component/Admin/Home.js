import React, { useEffect, useState } from "react";
import Navbar from "../Admin/Navbar";
import departments from "./department";
import { useLocation } from "react-router-dom";

import { Link } from "react-router-dom";

const Home = (props) => {
  document.title = "Home";
  const location = useLocation();
  const [adminDetails, setAdminDetails] = useState(null);
  const {setProgress}=props
  setProgress(50);

  useEffect(() => {
    if (location.state && location.state.id) {
      setAdminDetails(location.state.id);
      localStorage.setItem(
        "adminState",
        JSON.stringify({ id: location.state.id })
      );
    } else {
      const savedState = JSON.parse(localStorage.getItem("adminState"));
      if (savedState && savedState.id) {
        setAdminDetails(savedState.id);
      }
    }
  }, [location.state]);
  setProgress(100);

  return (
    <div>
      <Navbar adminDetails={adminDetails}/>
      <div className="container mt-4">
        {adminDetails && (
          <>
            <div
              className="alert alert-info alert-dismissible fade show fs-4 mb-5 fw-semibold text-center"
              role="alert"
            >
              {adminDetails.department}
            </div>

            <div className="row">
              <div className="col-lg-1"></div>
              <div className="col-lg-5 col-md-6 col-sm-11 mb-4">
               <div
                  className="card teacherCard d-block m-auto mb-5 text-center "
                  style={{ width: "26rem" }}
                >
                  <img
                    src="https://img.freepik.com/free-vector/business-people-working-laptop-development_1262-18907.jpg?size=626&ext=jpg&ga=GA1.2.1311701072.1691690137&semt=ais"
                    className="card-img-top"
                    alt="..."
                  />
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBtgFFcGDOgUQGTC748i388C4EhfNCkX7rfg&s"
                    className="card-img-top img-fluid rounded-circle teacherProfile"
                    alt=""
                  />
                  <h5 className="card-title text-center fs-5 fw-semibold mt-1">Director Info</h5>

                  <div className="card-body fs-6">
                  <ul className="list-group list-group-flush">
                  <li className="list-group-item bg-light fs-5 fw-semibold">Name: {adminDetails.name}</li> 

    <li className="list-group-item bg-dark text-light">Department: {adminDetails.department}</li> 
    <li className="list-group-item bg-light">Designation: {adminDetails.designation}</li>
  </ul> 
                  </div>
                </div>
              </div>
              <div className="col-lg-1"></div>
              <div className="col-lg-5 col-md-6 col-sm-11 mb-4 mt-5">
                 <div className="card teacherCard" style={{ width: "26rem" }}>
                  <img
                    src="https://img.freepik.com/free-vector/hand-drawn-web-developers_23-2148819604.jpg?size=626&ext=jpg&ga=GA1.2.1311701072.1691690137&semt=ais"
                    className="card-img-top"
                    style={{ height: "250px" }}
                    alt="..."
                  />
                  <div className="card-body d-flex">
                    {/* <h5 className="card-title my-3"></h5> */}

                    <Link
                      className="btn btn-dark "
                      aria-current="page"
                      to={`/admin/setcourses/${adminDetails.department}`}
                    >
                      Set Courses
                    </Link>
                    <Link
                      className="btn btn-dark mx-3"
                      aria-current="page"
                      to={`/admin/assigncourses/${adminDetails.department}`}
                    >
                      Assign Courses
                    </Link>
                    <Link
                      className="btn btn-dark"
                      aria-current="page"
                      to={`/admin/assignedteachers/${adminDetails.department}`}
                    >
                      Assigned Teachers
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
