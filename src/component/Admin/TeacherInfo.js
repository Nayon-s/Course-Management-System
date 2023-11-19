import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { useParams } from 'react-router-dom';

const TeacherInfo = (props) => {
    const [teachers, setTeachers]=useState(null)
    const {departmentName} = useParams();
    document.title = `${departmentName}`;
    const {setProgress}=props

    const teacherInfo=async()=>{
        setProgress(50);
        const response=await fetch('http://localhost:5000/api/course/teacherinfo',
        {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
              }
    
    }
        )
        const json= await response.json()
        console.log(json)
        setProgress(100);
        setTeachers(json)
    }
    useEffect(()=>{
        teacherInfo()
    },[])
    
  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        
      <div className="alert alert-info alert-dismissible fade show fs-4 fw-semibold text-center mb-5" role="alert">
   {departmentName} 

</div>
<div className="row">
<div className="col-2"></div>
<div className="col-8">
      <table className="table table-sm  mb-5 table-responsive-sm text-center fw-semibold" style={{ border: "2px solid" }}>
              <thead> 
                <tr className="bg-light">
                <th scope="col" >Teacher Name</th>
                <th scope="col" > Total Courses</th>

                  <th scope="col" >Total Credit Taken</th>
                  

                </tr>
              </thead>
              <tbody>
        {teachers && (
            teachers.map((index,id)=>{
                return(
                    <tr className={`${id % 2 === 0 ? 'bg-dark text-light' : 'bg-light text-dark'}`} key={id}>
                         <td>{index.name}</td>
                     <td>0{index.courses.length}</td>
                     <td>{index.totalCredit}</td>

                   </tr>

                )
            })
        )}
        </tbody>
        </table>
        </div>
        <div className="col-2"></div>

        </div>

      </div>
    </div>
   )
}

export default TeacherInfo
