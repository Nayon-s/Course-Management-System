import React, { useState } from 'react'
import emailjs from 'emailjs-com';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    Link
  } from "react-router-dom";
  
const Signup = () => {
    const [credentials, setCredentials]=useState({
        name:"",
        email:'',
        mobileNo:"",
        designation:"",
        department:""

      })
      const {name, email,mobileNo,designation,department}=credentials
    //   const [teacherInfo,setTeacherInfo]=useState()
      const [otp, setOtp] = useState('');
      const navigate=useNavigate()
    
      const [showOTP, setShowOTP] = useState(false); 
      const otp_value = Math.floor(Math.random() * 100000).toString();
      const [code, setCode]=useState(otp_value)
    const changes=(e) => {
    setOtp(e.target.value);
    };
    
      const handleChange=(e)=>{
        if(e.target.id==='email'){
          setCredentials({name,
            email:e.target.value,mobileNo,
            designation,
            department
          })
        }
        else if(e.target.id==='name'){
            setCredentials({name:e.target.value,
              email,mobileNo,
              designation,
              department
            })
          }
          else if(e.target.id==='mobileNo'){
            setCredentials({name,
              email,mobileNo:e.target.value,
              designation,
              department
            })
          }
          else if(e.target.id==='designation'){
            setCredentials({name,
              email,mobileNo,
              designation:e.target.value,
              department
            })
          }
          else if(e.target.id==='department'){
            setCredentials({name, 
              email,mobileNo,
              designation,
              department:e.target.value
            })
          }
      }
      const signUp=async(e)=>{
        // e.preventDefault();
         console.log(credentials)
         setShowOTP(true);
        const emailBody = `Your OTP: ${code}`;
    
          emailjs.send('service_qye4pyj', 'template_1uhyyen', {
            to_email: email,
            from_email: "nayonkarmoker3@gmail.com",
            subject: "OTP Verification",
            message: emailBody,
          }, 'C3jZRuxcxkzM4MZTt') 
          .then((response) => {
            if (response.status === 200) {
              console.log(code)
              toast.success('OTP sent to your Email!', {
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
        const verify=async(e)=>{
          e.preventDefault()
          console.log(otp)
           if(otp===code){ 
            const response=await fetch('http://localhost:5000/api/authenticate/signup', {
          method: 'POST',
          headers:{
            'Content-Type': 'application/json'
          },
           body: JSON.stringify({name:name, email:email, mobileNo:mobileNo,designation:designation,department:department})
      
        })
        const json=await response.json()
         console.log(json)
        // setTeacherInfo(json.teacher)
        //    console.log(teacherInfo)
        //    navigate('/',{state:{id:teacherInfo}})
        //    localStorage.setItem('teacherState',JSON.stringify({id:teacherInfo}))
        toast.success('Sign Up Successful. LogIn Now!',{
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
        navigate('/')
         }
        else{
          toast.error('Invalid OTP!', {
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
    
      }
    
    
  return (
    <div>
      <div className='back d-flex justify-content-center align-items-center vh-100 '>
      {!showOTP&& (
        <>
       <div className="card mt-3 shadow-lg" style={{"width": "26rem", backgroundColor:"aliceblue"}}>
       <h3 className="card-title text-center mt-4 mb-2"> <i className="fa-solid fa-user-tie"></i> Teacher SignUp</h3>

  <div className="card-body">
  <div className="mb-2">
  <label for="exampleFormControlInput1" className="form-label fw-semibold">Name </label>
  <input type="text" className="form-control inputs"  id='name' value={name} onChange={handleChange}  placeholder="Enter your name"/>
</div>
<div className="mb-2">
  <label for="exampleFormControlInput1" className="form-label  fw-semibold">Email address</label>
  <input type="email" className="form-control inputs"  id='email' value={email} onChange={handleChange}  placeholder="Enter your Email"/>
</div>
<div className="mb-2">
  <label for="exampleFormControlInput1" className="form-label fw-semibold">Mobile No</label>
  <input type="text" className="form-control inputs"  id='mobileNo' value={mobileNo} onChange={handleChange}  placeholder="Enter your Mobile No"/>
</div>
<div className="mb-3">
                  <label htmlFor="department" className="form-label fw-semibold" >Department</label>
                  <select onChange={handleChange} className="form-control inputs" id="department" placeholder="Department" value={department} required>
                    <option>Select Department</option>
                    <option>Institute of Information Technology</option>
                    <option>Computer Science and Engineering</option>
                    <option>Department of Physics</option>
                    <option>Institute of Business Administration</option>
                  </select>
                </div>

<div className="mb-3">
                  <label htmlFor="designation" className="form-label fw-semibold" >Designation</label>
                  <select onChange={handleChange} className="form-control inputs" id="designation" placeholder="designation" value={designation} required>
                    <option>Select Designation</option>
                    <option>Professor</option>
                    <option>Associate Professor</option>
                    <option>Assistant Professor</option>
                    
                    <option>Lecturer</option>
                  </select>
                </div>
<button type="button" disabled={name===""||email===""||mobileNo===""||designation===""} className="btn btn-dark mt-1 mb-3" onClick={signUp}>Sign Up</button>
<p className="mt-3 fw-semibold">Already have an account? <Link className="fw-bold " aria-current="page" to="/">  LogIn Now</Link> </p>

   </div>
</div>

        </>
      )}

      {showOTP&& (
        <>
        <div className="card mt-3 fs-5" style={{"width": "24rem", backgroundColor:"aliceblue"}}>
        <h3 className="card-title text-center mt-4 mb-2"> <i className="fa-solid fa-user-tie"></i> Teacher signUp</h3>

  <div className="card-body">
  
<div className="mb-3">
  <label htmlFor="otp" className="form-label fw-semibold">Enter OTP</label>
    <input type="text" value={otp} onChange={changes} 
          placeholder="Enter OTP" className="form-control" id="otp" />
  
  </div>    
     
        <button className="btn btn-dark mt-1 mb-3" disabled={otp===""} onClick={verify}>Verify otp
        </button>

   </div>
</div>
       
        </>
      )}
      <ToastContainer />
    </div>
    </div>
  )
}

export default Signup
