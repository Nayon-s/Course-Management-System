import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const Apply = (props) => {
    const [teacherDetails, setTeacherDetails] = useState(null);
    useEffect(() => {
        const savedState = JSON.parse(localStorage.getItem("teacherState"));
        if (savedState && savedState.id) {
            setTeacherDetails(savedState.id);
        }
    }, []);
    const { setProgress } = props;
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        if (teacherDetails) {
            allCourses();
        }
    }, [teacherDetails]);
    const allCourses = async () => {
        setProgress(50);

        const response = await fetch(
            "http://localhost:5000/api/course/allcourses",
            {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(teacherDetails),
            }
        );
        const json = await response.json();
        setCourses(json);
        setProgress(100);
    };

    const [index, setIndex] = useState({
        first: "",
        second: "",
    });
    const { first, second } = index;

    const [isApplying, setIsApplying] = useState(false);
    const updatedIndex = async (id, y) => {
        setIndex({
            first: id,
            second: y,
        });
        // console.log(index)
    };

    const apply = async () => {
        if (isApplying) {
            return;
        }

        setIsApplying(true);

        try {
            const response = await fetch(
                "http://localhost:5000/api/course/addapplicants",
                {
                    method: "post",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: teacherDetails.name,
                        email: teacherDetails.email,
                        department: teacherDetails.department,
                        courseList: courses[first].courseList[second],
                    }),
                }
            );

            if (response.ok) {
                const json = await response.json();
                // console.log(json);
                if (json.status === "error") {
                    toast.error("You have already applied on 6 courses!", {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                } else {
                    toast.success("You have Applied Successfully!", {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    setTimeout(() => {
                        window.location.reload();
                    }, 2000);
                }
            } else {
                toast.error("Failed to apply. Please try again later.", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        } finally {
            setIsApplying(false);
        }
        
    };

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

                        <div >
                            <div className="row mt-5">

                                {courses.map((index, id) => {
                                    return (
                                        <div className="col-lg-6 col-md-6 col-sm-12 mb-4">
                                            {index.courseList.length === 0 ? (
                                                <></>
                                            ) : (
                                                <>
                                                    {" "}
                                                    <div className="alert text-center  fs-4 fw-semibold alert-primar" style={{backgroundColor:"azure"}}>

                                                        {index.year} Year {index.semester} Semester
                                                    </div>
                                                    <div>
                                                        <table
                                                            className="table table-sm  table-responsive-sm text-center fw-semibold"
                                                            style={{ border: "2px solid" }}
                                                        >
                                                            <thead>
                                                                <tr className="bg-light">
                                                                    <th scope="col">Course Title</th>
                                                                    <th scope="col">Course Code</th>
                                                                    <th scope="col">Course Credit</th>
                                                                    <th scope="col">Apply Here</th>
                                                                </tr>
                                                            </thead>

                                                            {index.courseList.map((x, y) => {
                                                                return (
                                                                    <tbody>
                                                                        <tr
                                                                            className={`${y % 2 === 0
                                                                                ? "bg-dark text-light"
                                                                                : "bg-light text-dark"
                                                                                }`}
                                                                            key={y}
                                                                        >
                                                                            <td>{x.courseTitle}</td>
                                                                            <td>{x.courseCode}</td>
                                                                            <td>{x.courseCredit}</td>
                                                                            <td className=""
                                                                                style={{ cursor: "pointer" }}
                                                                                data-bs-toggle="modal"
                                                                                data-bs-target="#exampleModal"
                                                                                onClick={() => updatedIndex(id, y)}
                                                                            >
                                                                                {" "}
                                                                                Apply Now{" "}
                                                                            </td>
                                                                        </tr>

                                                                        <div
                                                                            className="modal fade"
                                                                            id="exampleModal"
                                                                            tabindex="-1"
                                                                            aria-labelledby="exampleModalLabel"
                                                                            aria-hidden="true"
                                                                        >
                                                                            <div className="modal-dialog">
                                                                                <div className="modal-content">
                                                                                    <div className="modal-header">
                                                                                        <h2
                                                                                            className="modal-title fs-5 mx-2"
                                                                                            id="exampleModalLabel"
                                                                                        >
                                                                                            Apply Confirmation
                                                                                        </h2>
                                                                                        <button
                                                                                            type="button"
                                                                                            className="btn-close"
                                                                                            data-bs-dismiss="modal"
                                                                                            aria-label="Close"
                                                                                        ></button>
                                                                                    </div>
                                                                                    <div className="modal-body">
                                                                                        <h5>
                                                                                            Do you want apply to this course?
                                                                                        </h5>
                                                                                        <div className="modal-footer">
                                                                                            <button
                                                                                                type="button"
                                                                                                className="btn btn-dark"
                                                                                                data-bs-dismiss="modal"
                                                                                            >
                                                                                                Close
                                                                                            </button>
                                                                                            <button
                                                                                                data-bs-dismiss="modal"
                                                                                                className="btn btn-dark"
                                                                                                onClick={apply}
                                                                                            >
                                                                                                Apply Now
                                                                                            </button>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </tbody>
                                                                );
                                                            })}
                                                        </table>
                                                    </div>{" "}
                                                </>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <ToastContainer />
        </div>
    );
};


export default Apply
