import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const SetCourses = (props) => {
  const {departmentName} = useParams();
  document.title = `${departmentName}`;
 
     const [courses, setCourses] = useState([]);
     const {setProgress}=props
    const [available,setAvailable]=useState()
   const [coursesDetails, setCoursesDetails] = useState({
    department: departmentName,
    year: "",
    semester: "",
    courseList: [],
  });
 const {year,semester,courseList}=coursesDetails
 const [text, setText] = useState({
  courseTitle: "", 
      courseCode: "",
      courseCredit:""
});
const{courseTitle,courseCode,courseCredit}=text
const changes = (e) => {
  setText({
    ...text, 
    [e.target.id]: e.target.value
  });
};
  

const addCourse = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/course/coursedetails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(coursesDetails),
    });

    const json = await response.json();

    // setCourses(prevCourses=>[...prevCourses,...json.courses]);
    setCourses(json.courses);

    console.log(json);
    setCoursesDetails({ 
      ...coursesDetails,
      // courseList: [...courses, ...json.courses],
      courseList: [...json.courses]
    });
    setAvailable(json.status)
   


    console.log(courses);
  } catch (error) {
    console.error('Failed to add course:', error);
  }
};
const addMoreCourse =async () => {
  const updatedCourses = [...courses, text];
  setCourses(updatedCourses)
  setCoursesDetails({
    ...coursesDetails,
    courseList:updatedCourses,
  });
  console.log(courses);
};

  const handleChanges = (e) => {
    setCoursesDetails({
      ...coursesDetails, 
      [e.target.id]: e.target.value,
    });
  };

 
 
  const allInfo = async (e) => {
    e.preventDefault();
    const initialCoursesDetails = {
      department: departmentName,
      year: "",
      semester: "",
      courseList: []
    };
        setProgress(50);

    console.log(coursesDetails)
    const response = await fetch('http://localhost:5000/api/course/addcourses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(coursesDetails),
    });
    const json = await response.json();
    console.log(json)
     setCoursesDetails(initialCoursesDetails);
    setProgress(100);

   

   
setCourses([])
    toast.success('Courses are Added!', {
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

    }, 1000);

  };
  const removeCourse=(id)=>{
    console.log(courses[id])
    const updatedCourse= courses.filter((index,value)=>{
      return(
        id!==value
      )
    })
    console.log(updatedCourse)
    setCourses(updatedCourse)
    setCoursesDetails({ 
      ...coursesDetails,
      courseList: updatedCourse,
    });
  }
  const deleteAllCourses=async()=>{
    const response = await fetch('http://localhost:5000/api/course/removecourses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({department:departmentName,year:year,semester:semester})

    });
    const json = await response.json();
    console.log(json)
    setProgress(100);
    toast.success('Successfully Deleted!', {
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

}, 1000);
  }
 
  return (
    <>
      <Navbar />
      <div className='container mt-3'>
      <div className="alert alert-info alert-dismissible fade show fs-4 fw-semibold text-center" role="alert">
   {departmentName} 

</div>
        <div className="row">
        <div className="col-lg-1 col-md- col-sm-12 mb-4">
          </div>
          <div className="col-lg-4 col-md- col-sm-12 mb-4 ">
          <div className="card" style={{width: "22 rem"}}>
  <img src="https://img.freepik.com/free-vector/empty-school-class-background-video-conferencing_23-2148691702.jpg?size=626&ext=jpg&ga=GA1.2.1311701072.1691690137&semt=ais" className="card-img-top" alt="..."/>
  <div className="card-body">
  <ul class="list-group list-group-flush mt-2"> 
    <li class="list-group-item fs-5"> 
              <label for="coursespleFormControlInput1" className="form-label fw-semibold fs-5">Year:&nbsp;&nbsp; </label>
              <input type="radio" onChange={handleChanges} id="year" name="year" value="1st"/>&nbsp;
<label for="1st" >1st&nbsp;&nbsp;</label> 
 <input type="radio" id="year" onChange={handleChanges}  name="year" value="2nd"/>&nbsp;
<label for="2nd"  >2nd&nbsp;&nbsp;</label> 
<input type="radio" id="year" name="year" onChange={handleChanges}  value="3rd"/>&nbsp;
<label for="3rd"  >3rd&nbsp;&nbsp;</label>
<input type="radio" id="year" name="year" onChange={handleChanges}  value="4th"/>&nbsp;
<label for="4th">4th&nbsp;&nbsp;</label>

 </li>
    <li class="list-group-item fs-5"> <label for="coursespleFormControlInput1" className="form-label fw-semibold ">Semester:&nbsp;&nbsp; </label>
              <input type="radio" onChange={handleChanges} id="semester" name="semester" value="1st"/>&nbsp;
<label for="1st">1st&nbsp;&nbsp;</label>
 <input type="radio" id="semester" onChange={handleChanges}  name="semester" value="2nd"/>&nbsp;
<label for="2nd">2nd&nbsp;&nbsp;</label>  </li>
    <button disabled={year==="" }  className="btn btn-dark w-100 mb-3"  onClick={addCourse}>Check Courses</button> 
  </ul>      
  <div className="d-flex">
      <button  disabled={year==="" || courses.length===0 || available==="yes"} className="btn mb-3 btn-dark d-block m-auto" onClick={allInfo}>Add Courses</button>

      <button disabled={year===""|| courses.length===0||available==="no"}  className="btn btn-dark mb-3 d-block m-auto"  onClick={deleteAllCourses}>Delete Courses</button> 

  </div>

                     
              {/* <form onSubmit={allInfo}>
             
               
                <button type="submit" disabled={year==="" ||semester===""|| courses.length===0} className="btn mt-2 mb-3 btn-dark d-block m-auto">Submit Details</button>
              </form> */}
            </div>
          </div>

         
</div>
<div className="col-lg-1 col-md- col-sm-12 mb-4">
          </div>
           
          <div className="col-lg-5 col-md- col-sm-12 mb-4 mt-3 text-center">
           
            <h2>Course Lists</h2>
            <table className="table table-sm  mb-5 table-responsive-sm text-center fw-semibold" style={{ border: "2px solid" }}>
              <thead> 
                <tr className="bg-light">
                  <th scope="col" >Course Title</th>
                  <th scope="col" >Course Code</th>
                  <th scope="col" >Course Credit</th>

                </tr>
              </thead>
              <tbody>
                {courses.map((index, id) => {
                  return (
                    <tr className={`${id % 2 === 0 ? 'bg-dark text-light' : 'bg-light text-dark'}`} key={id}>
                      <td>{index.courseTitle}</td>
                       <td>{index.courseCode}</td>
                      <div className="row">
                      <div className="col-4">
                    
                    </div>
                      <div className="col-4 text-center">
                      <td>{index.courseCredit}</td>
                      </div>
                      <div className="col-4">
                      <i style={{cursor:"pointer"}} onClick={()=>removeCourse(id)} class="fa-solid fa-trash fs-5"></i>
                      </div>
                      </div>
                     
                      
                       
                    </tr>
                  )
                })}
              </tbody>
            </table>

            <h2 className='text-center'>Add More Courses</h2>
            <input type="text" required className="form-control inputs mt-3 mb-2" id="courseTitle" placeholder='Course Title' value={courseTitle} onChange={changes} />
              <input type="text" required className="form-control inputs mb-2" value={courseCode} placeholder='Course Code' onChange={changes} id="courseCode" />
              <input type="text" required className="form-control inputs" value={courseCredit} placeholder='Course Credit' onChange={changes} id="courseCredit" />

              <button disabled={courseTitle===""||courseCode===""||courseCredit===""} className="btn btn-dark mt-3 mb-3" onClick={addMoreCourse}>Add Course</button>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  )
}

export default SetCourses




