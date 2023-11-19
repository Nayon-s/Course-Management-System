import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { useParams } from 'react-router-dom';
import emailjs from 'emailjs-com';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AllAssigned = (props) => {
    const [teachers, setTeachers]=useState(null)
    const {departmentName} = useParams();
    document.title = `${departmentName}`;
    const {setProgress}=props
    const [applicants, setApplicants]=useState([])
    const [indexes,setIndexes]=useState("")

    const assigned=async()=>{
        setProgress(50);
        const response=await fetch('http://localhost:5000/api/course/allassigned',
        {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({department: departmentName})
    
    }
        )
        const json= await response.json()
        // console.log(json)
        setProgress(100);
        setTeachers(json)
    }

    const selectedCourse=async(id)=>{
      const response=await fetch('http://localhost:5000/api/course/checkapplicants',
        {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({courseTitle: teachers[id].courseDetails.courseTitle})
    
    }
        )
        const json= await response.json()
        // console.log(json)
        setIndexes(id)
        setApplicants(json);

    }
    const reassign=async(y)=>{
      console.log(applicants[y])
      const response=await fetch('http://localhost:5000/api/course/reassign',
        {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({name:applicants[y].name, email: applicants[y].email,  courseDetails:{
              courseTitle: teachers[indexes].courseDetails.courseTitle,
          courseCode: teachers[indexes].courseDetails.courseCode,
          courseCredit: teachers[indexes].courseDetails.courseCredit
            }, previous:teachers[indexes].email})
    
    }
        )
        const json = await response.json();
        if(json.status==="failed")
        { 
          toast.error('Credit limit exceeded for this teacher!', {
            position: 'top-center',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          });
        }
        else{
          console.log(json)
        const emailBody = `Congratulation, ${applicants[y].name}! You have been appointed as a course teacher of ${teachers[indexes].courseDetails.courseCode}  ${teachers[indexes].courseDetails.courseTitle}`;

        emailjs.send('service_q5exv6q', 'template_n9lgn2t', {
          to_email: applicants[y].email,
          from_email: "nayonkarmoker3@gmail.com",
          subject: "Teacher Assign",
          message: emailBody,
        }, 'hEX8QDdIdlV8fShPe') 
        .then((response) => {
          if (response.status === 200) {
            toast.success('Confirmation Email Sent!!', {
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
        })
        .catch((error) => {
          console.error("Error sending email:", error);
        });
        }
        setTimeout(() => {
         window.location.reload();
  
        }, 4000);
                 
    }

    useEffect(()=>{
        assigned()
    },[])
  return (
    <div>
      <Navbar />
 
      <div className="container mt-5">
        
      <div className="alert alert-info alert-dismissible fade show fs-4 fw-semibold text-center mb-5" role="alert">
   {departmentName} 

</div>
      <table className="table table-sm  mb-5 table-responsive-sm text-center fw-semibold" style={{ border: "2px solid" }}>
              <thead> 
                <tr className="bg-light">
                <th scope="col" >Teacher Name</th>
                  <th scope="col" >Course Title</th>
                  <th scope="col" >Course Code</th>
                  <th scope="col" >Course Credit</th>
                  <th scope="col" >Change Teacher</th>

                </tr>
              </thead> 
              <tbody>
        {teachers && (
            teachers.map((index,id)=>{
                return(
                  <>
                    <tr className={`${id % 2 === 0 ? 'bg-dark text-light' : 'bg-light text-dark'}`} key={id}>
                         <td>{index.name}</td>
                    <td>{index.courseDetails.courseTitle}</td>
                     <td>{index.courseDetails.courseCode}</td>
                    <td>{index.courseDetails.courseCredit}</td>
                    <td style={{"cursor":"pointer"}} data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => selectedCourse(id)} >Assign Now</td>
                  </tr>
                  <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h2 className="modal-title fs-5 mx-2" id="exampleModalLabel">Assign Teacher</h2>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body"> 
      
      <h3>{indexes!==""&&teachers[indexes].courseDetails.courseTitle}</h3>
      {applicants.length===0? 
    <h3 className='alert alert-info mt-4'>No more applicants</h3>  : 
     <table className="table table-sm mt-3 table-responsive-sm text-center fw-semibold" style={{ border: "2px solid" }}>
              <thead>
                <tr className="bg-light">
                  <th scope="col" >Applied Teachers</th>
                  <th scope="col" >Click here to Assign</th>
                </tr>
              </thead>
              
              {applicants.map((x,y)=>{
            return(
              <tbody>
              <tr className={`${y % 2 === 0 ? 'bg-dark text-light' : 'bg-light text-dark'}`} key={y}>
                      <td>{x.name} </td> 
                      <td style={{"cursor":"pointer"}} data-bs-toggle="modal" data-bs-target="#exampleModal"onClick={() => {
                      reassign(y);}}> Assign Now </td>

                    </tr>
                    </tbody>
            )
            
          
          })}
              </table>
    }
       
      </div>

</div>
</div>
    </div>
</>
                )
            })
        )}
        </tbody>
        </table>
      </div>
      <ToastContainer />
    </div>
  )
}

export default AllAssigned
