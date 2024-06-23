import React, { useState } from 'react'
import emailjs from 'emailjs-com';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Link
} from "react-router-dom";
import 'animate.css';


const AdminLogin = () => {
  const [credentials, setCredentials]=useState({
    email:'',
    department:''
  })
  const [adminInfo,setAdminInfo]=useState()

  const {email,department}=credentials
  const [otp, setOtp] = useState('');
  const navigate=useNavigate()

  const [showOTP, setShowOTP] = useState(false); 
  const otp_value = Math.floor(Math.random() * 100000).toString();
  const [code, setCode]=useState(otp_value)
const changes = (e) => {
setOtp(e.target.value);
};

  const handleChange=(e)=>{
    setCredentials({
      ...credentials,
      [e.target.id]:e.target.value
    })
  }
  const login=async(e)=>{
    toast.error('Director Not Found!', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light"
      });
    e.preventDefault();
    console.log(credentials)
    const response=await fetch('http://localhost:5000/api/authenticate/adminlogin', {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
       body: JSON.stringify({email:email, department:department})
  
    })
    const json=await response.json()
    console.log(json)
    if(json.status==='Success'){

      setCredentials({
        email:'',
        department:""
      })
      setShowOTP(true);
      setAdminInfo(json.admins)
      console.log(json.admins)

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
      toast.error('Admin Not Found!', {
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
       navigate('/admin/home',{state:{id:adminInfo}})
       localStorage.setItem('adminState',JSON.stringify({id:adminInfo}))

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
        
        <div className='d-none d-sm-block '>  <i class="fas fa-graduation-cap"></i>Welcome to CMS
          <i class="fas fa-university"></i>{" "}</div>
        </div>
    <div className="mb-5"></div>
    <div className='mt-5 back d-flex justify-content-center align-items-center vh-95 '>
      {!showOTP&& (
        <>
       <div class="card inputs mt-3 shadow-lg animate__animated animate__fadeInDown" style={{"width": "24rem", backgroundColor:"aliceblue"}}>
       <h3 className="card-title text-center mt-4 mb-2"> <i class="fa-solid fa-user-tie"></i> Director LogIn</h3>

  <div class="card-body">
  <div class="mb-3">
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
  <label for="exampleFormControlInput1" class="form-label fs-5 fw-semibold">Email address</label>
  <input type="email" class="form-control inputs"  id='email' value={email} onChange={handleChange}  placeholder="Enter your Email"/>
</div>
<button type="button" disabled={email===""||department===""} class="btn btn-dark mt-1 mb-3" onClick={login}>Sign In</button>

<p className="mt-3 fw-semibold">Not a Director? <Link className="fw-bold " aria-current="page" to="/">  LogIn Here</Link> </p>

   </div>
</div>
        </>
      )}

      {showOTP&& (
        <>
        <div class="card mt-3 fs-5" style={{"width": "24rem", backgroundColor:"aliceblue"}}>
        <h3 className="card-title text-center mt-4 mb-2"> <i class="fa-solid fa-user-tie"></i> Admin Login</h3>

  <div class="card-body">
  
<div className="mb-3">
  <label htmlFor="otp" className="form-label fw-semibold">Enter OTP</label>
    <input type="text" value={otp} onChange={changes} 
          placeholder="Enter OTP" className="form-control inputs" id="otp" />
  
  </div>    
     
        <button className="btn btn-dark mt-1 mb-3" disabled={otp===""} onClick={verify}>Verify OTP
        </button>

        
   </div>
</div> 
       
        </>
      )}
      <ToastContainer />
    </div></>
  )
}

export default AdminLogin

