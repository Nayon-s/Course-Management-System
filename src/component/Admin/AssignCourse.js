import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { useParams } from 'react-router-dom';
import emailjs from 'emailjs-com';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AssignCourse = (props) => {
    const {departmentName} = useParams();
    document.title = `${departmentName}`;
    const [index,setIndex]=useState({
      first: "",
      second:""
      
    }) 
    const {setProgress}=props
  
    const {first,second}=index 
    const [course,setCourse]=useState([])
    const [applicants, setApplicants]=useState([])
    const courses= async ()=>{
      setProgress(50);

        const response = await fetch('http://localhost:5000/api/course/courselist', {
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({department: departmentName})
          });
          const json = await response.json();
          setCourse(json);
          setProgress(100);

    }
    
    const selectedCourse=async(id,y)=>{
      setIndex({
        first:id,
        second:y
            })
             
      
      const response = await fetch('http://localhost:5000/api/course/checkapplicantS', {
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({courseTitle: course[id].courseList[y].courseTitle})
          });
          const json = await response.json();
          console.log(json)
          setApplicants(json);
      console.log(applicants)
    }
    const removeApplicant=async(id,first,second)=>{
      const response = await fetch('http://localhost:5000/api/course/removeapplicant', {
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({name:applicants[id].name,email:applicants[id].email, department:departmentName, courseTitle: course[first].courseList[second].courseTitle})
          });
          const json = await response.json();
          const updatedApplicant= applicants.filter((index)=>{
            return index.name!==applicants[id].name
          })
          setApplicants(updatedApplicant)

          console.log(updatedApplicant)
      console.log(applicants[id]) 
      console.log(course[first].courseList[second].courseTitle)
    }

    const assign=async(id,first,second)=>{
      const response = await fetch('http://localhost:5000/api/course/assign', {
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({name: applicants[id].name, email: applicants[id].email, department: departmentName, courseDetails:{
              courseTitle: course[first].courseList[second].courseTitle,
          courseCode: course[first].courseList[second].courseCode,
          courseCredit: course[first].courseList[second].courseCredit
            }  })
          });
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
          const emailBody = `Congratulation, ${applicants[id].name}! You have been appointed as a course teacher of ${course[first].courseList[second].courseCode}  ${course[first].courseList[second].courseTitle}`;

          emailjs.send('service_q5exv6q', 'template_n9lgn2t', {
            to_email: applicants[id].email,
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
      setTimeout(() => {
       window.location.reload();

      }, 4000);
          }
          
        
          
    } 
    
    useEffect(()=>{
        
        courses()
    },[])
    console.log(index)
  return (
    <div>
      <Navbar />
      <div className="mt-5 container">
      <div className="alert alert-info alert-dismissible fade show fs-4 fw-semibold text-center mb-5" role="alert">
   {departmentName} 

</div>
      {
            course.map((index,id)=>{
              return( 
                
                <div className='mb-4'>
                  {index.courseList.length===0? <>  </>:  <> 
                  <h5 className='text-center fw-semibold'>{index.year} Year {index.semester} Semester</h5>
                  <div>
                                <table className="table table-sm  table-responsive-sm text-center fw-semibold" style={{ border: "2px solid" }}>
              <thead>
                <tr className="bg-light">
                  <th scope="col" >Course Title</th>
                  <th scope="col" >Course Code</th>
                  <th scope="col" >Course Credit</th>
                  <th scope="col" >Assign Teacher</th>

                </tr>
              </thead>
            
                    {
                      index.courseList.map((x,y)=>{
                        return(
             <tbody>
                    <tr className={`${y % 2 === 0 ? 'bg-dark text-light' : 'bg-light text-dark'}`} key={y}>
                      <td>{x.courseTitle}</td>
                      <td>{x.courseCode}</td>
                      <td>{x.courseCredit}</td>
                      <td style={{"cursor":"pointer"}} data-bs-toggle="modal" data-bs-target="#exampleModal"  onClick={() => selectedCourse(id,y)} > Assign Now </td>

                    </tr>
                    <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h2 className="modal-title fs-5 mx-2" id="exampleModalLabel">Assign Teacher</h2>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body"> 
        <h3>{first!==""&& second!=="" && course[first].courseList[second].courseTitle}</h3>
        {applicants.length===0? 
    <h3 className='alert alert-info mt-4'>No applicants yet</h3>  : 
        <table className="table table-sm mt-3 table-responsive-sm text-center fw-semibold" style={{ border: "2px solid" }}>
              <thead>
                <tr className="bg-light">
                  <th scope="col" >Applied Teachers</th>
                  <th scope="col" >Click here to Assign</th>
                </tr>
              </thead>

              
                    {applicants.map((index,id)=>{
            return(
              <tbody>
              <tr className={`${id % 2 === 0 ? 'bg-dark text-light' : 'bg-light text-dark'}`} key={y}>
                      <td>{index.name} </td> 
                      <div className="row">
                      <div className="col-3">
                    
                    </div>
                    <div className="col-6 text-center">
                      <td style={{"cursor":"pointer"}} data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => {
                      assign(id, first, second);
   }}
 > Assign Now </td>
 </div>
                      <div className="col-3">
                      <i style={{cursor:"pointer"}} onClick={()=>removeApplicant(id,first,second)} class="fa-solid fa-trash fs-5"></i>
                      </div>
                      </div>

                    </tr>
                    </tbody>
            )
            
          
          })}
             </table>  }   
    </div>

  </div>
</div>
      </div>

              </tbody>
               )
            
                       
                      })
                    }
                    </table>
                  </div> </> }
                </div>
              )
            })
          }
                <ToastContainer />

      </div>
    </div>
  )
}

export default AssignCourse
