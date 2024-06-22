import React, { useState } from 'react'
import emailjs from 'emailjs-com';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Link
} from "react-router-dom";
import 'animate.css';


const Login = () => {
  const [credentials, setCredentials]=useState({
    email:''
  })
  const {email}=credentials
  const [teacherInfo,setTeacherInfo]=useState()
  const [otp, setOtp] = useState('');
  const navigate=useNavigate()

  const [showOTP, setShowOTP] = useState(false); 
  const otp_value = Math.floor(Math.random() * 100000).toString();
  const [code, setCode]=useState(otp_value)
const changes = (e) => {
setOtp(e.target.value);
};

  const handleChange=(e)=>{
    if(e.target.id==='email'){
      setCredentials({
        email:e.target.value
      })
    }
  }
  const login=async(e)=>{
    e.preventDefault();
    console.log(credentials)
    const response=await fetch('http://localhost:5000/api/authenticate/login', {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
       body: JSON.stringify({email:email})
  
    }) 
    const json=await response.json()
    console.log(json)
    if(json.status==='Success'){
      setCredentials({
        email:''
      })
      setShowOTP(true); 

       setTeacherInfo(json.teacher)
      console.log(teacherInfo)
      const emailBody = `Your OTP: ${code}`;

      emailjs.send('service_q5exv6q', 'template_n9lgn2t', {
        to_email: email,
        from_email: "nayonkarmoker3@gmail.com",
        subject: "OTP Verification",
        message: emailBody,
      }, 'hEX8QDdIdlV8fShPe') 
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
    else{
      toast.error('Teacher Not Found!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
        });
    }
   
  
  }
    const verify=(e)=>{
      e.preventDefault()
      console.log(otp)
       if(otp===code){ 
       console.log(teacherInfo)
       navigate('/teacher/home',{state:{id:teacherInfo}})
       localStorage.setItem('teacherState',JSON.stringify({id:teacherInfo}))
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
    <>
    <div className="container text-center mt-5 mb-5 fs-2 text fw-semibold">
          <div className='d-none d-sm-block '>
            <i class="fas fa-graduation-cap"></i>Welcome to CMS
          <i class="fas fa-university"></i>{" "}
          </div>
          
        </div>
    <div className='back  d-flex justify-content-center align-items-center vh-80'>
      {!showOTP&& (
        <> 
       <div className="card mt-5 inputs shadow-lg animate__animated animate__fadeInDown" style={{"width": "24rem", backgroundColor:"aliceblue"}}>
       <h3 className="card-title text-center mt-4 mb-2"> <i className="fa-solid fa-user-tie"></i> Teacher LogIn</h3>

  <div className="card-body">
  <div className="mb-3">
  <label for="exampleFormControlInput1" className="form-label fs-5 fw-semibold">Email Address</label>
  <input type="email" className="form-control inputs"  id='email' value={email} onChange={handleChange}  placeholder="Enter your Email"/>
</div>
<button type="button" disabled={email===""} className="btn btn-dark mt-1 mb-3" onClick={login}>Sign In</button>
<p className="mt-3 fw-semibold">Are you a Director? <Link className="fw-bold " aria-current="page" to="/admin/login">  LogIn Here</Link> </p>
   </div>
</div>
        </>
      )}

      {showOTP&& (
        <>
        <div className="card mt-3 fs-5" style={{"width": "24rem", backgroundColor:"aliceblue"}}>
        <h3 className="card-title text-center mt-4 mb-2"> <i className="fa-solid fa-user-tie"></i> Teacher LogIn</h3>

  <div className="card-body">
  
<div className="mb-3">
  <label htmlFor="otp" className="form-label fw-semibold">Enter OTP</label>
    <input type="text" value={otp} onChange={changes} 
          placeholder="Enter OTP" className="form-control inputs" id="otp" />
  
  </div>    
     
        <button className="btn btn-dark mt-1 mb-3" disabled={otp===""} onClick={verify}>Verify otp
        </button>

        
   </div>
</div> 
       
        </>
      )}
      <ToastContainer />
    </div></>
  )
}

export default Login
