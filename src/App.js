import './App.css';
import Login from './component/Login';
import {
  BrowserRouter,
  Route,
  Routes
  
} from "react-router-dom";
import Profile from './component/Teacher/Profile';
import Signup from './component/Teacher/Signup';
import AdminLogin from './component/Admin/AdminLogin';
import Home from './component/Admin/Home';
import SetCourses from './component/Admin/SetCourses';
import AssignCourse from './component/Admin/AssignCourse';
import AllAssigned from './component/Admin/AllAssigned';
import LoadingBar from 'react-top-loading-bar'
import { useState } from 'react';
import TeacherInfo from './component/Admin/TeacherInfo';
import Apply from './component/Teacher/Apply';

function App() {
  const [progress,setProgress]=useState(0)

  return (
    <div className="">
  <BrowserRouter>
  <LoadingBar
        color='#f11946'
        height={3}
        progress={progress}
      />
  <Routes>
    <Route path='/' element={<Login />} />
    <Route path='/teacher/home' element={<Profile  setProgress={setProgress}/>} />
    <Route path='/teacher/signup' element={<Signup />} />
    <Route path='/teacher/apply' element={<Apply  setProgress={setProgress}/>} />

    <Route path='/admin/login' element={<AdminLogin />} />
    <Route path='/admin/home' element={<Home  setProgress={setProgress}/>} />
    <Route path='/admin/setcourses/:departmentName' element={<SetCourses  setProgress={setProgress}/>} />
    <Route path='/admin/assigncourses/:departmentName' element={<AssignCourse  setProgress={setProgress}/>} />
    <Route path='/admin/assignedteachers/:departmentName' element={<AllAssigned  setProgress={setProgress}/>} />
    <Route path='/admin/teacherinfo/:departmentName' element={<TeacherInfo  setProgress={setProgress}/>} />

  </Routes>
  
  </BrowserRouter>
      </div>
  );
}

export default App;
