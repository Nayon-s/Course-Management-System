import React from 'react'
import {
  Link,useNavigate
} from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const logout=()=>{
    localStorage.removeItem('teacherState')
    navigate('/')
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary " data-bs-theme="dark" >
  <div className="container-fluid">
    <Link className="navbar-brand mx-5 fw-semibold fs-3" to="/teacher/home"><i className="fa-sharp fa-solid fa-graduation-cap"></i> CMS </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
      <ul className="navbar-nav">
      <li className="nav-item">
          <Link  className="nav-link fw-bold active mx-2 fs-5" aria-current="page" to="/teacher/apply">Apply for Courses</Link>
        </li>
        
       
        <li className="nav-item">
          <Link onClick={logout} className="nav-link fw-bold active mx-2 fs-5" aria-current="page" to="/">LogOut</Link>
        </li>

        
      </ul>
      
    </div>
  </div>
</nav>

    </div>
  )
}

export default Navbar
