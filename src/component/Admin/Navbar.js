import React, { useEffect, useState } from 'react'
import {
  Link, useNavigate
} from "react-router-dom";

const Navbar = (props) => {
  const navigate = useNavigate();

  const logout=()=>{
    localStorage.removeItem('adminState')
    navigate('/admin/login')
  }
  const [adminDetails, setAdminDetails] = useState(null);

  useEffect(() => {
    const savedState = JSON.parse(localStorage.getItem("adminState"));
    if (savedState && savedState.id) {
      setAdminDetails(savedState.id);
    }
  }, []);
  const department=adminDetails ? adminDetails.department : null;

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary " data-bs-theme="dark" >
  <div className="container-fluid">
    <Link className="navbar-brand mx-4 fs-3 fw-semibold" to="/admin/home"> <i class="fa-sharp fa-solid fa-graduation-cap"></i> CMS</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
      <ul className="navbar-nav fw-semibold">
        
        <li className="nav-item">
        <Link  className="nav-link active mx-2 fs-5" aria-current="page" to={`/admin/setcourses/${department}`}>Set Courses </Link>

        </li>

        <li className="nav-item">
          <Link  className="nav-link active mx-2 fs-5"  aria-current="page" to={`/admin/assigncourses/${department}`}>Assign Courses</Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link active mx-2 fs-5" aria-current="page" to={`/admin/teacherinfo/${department}`}>Teachers Info</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active mx-2 fs-5" aria-current="page" to={`/admin/assignedteachers/${department}`}>Assigned Teachers</Link>
        </li>
        
        <li className="nav-item">
          <Link  className="nav-link active mx-2 fs-5" onClick={logout} aria-current="page" to="/admin/login">LogOut</Link>
        </li>
      </ul>
      
    </div>
  </div>
</nav>
    </div>
  )
}

export default Navbar
