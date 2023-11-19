const express = require('express') 
const teachers= require('../models/teachers')
const router=express.Router()
const { body, validationResult } = require('express-validator');
const admin = require('../models/admin');

router.post('/signup',(req,res)=>{
    const teacher=teachers(req.body)  
    teacher.save() 
    res.json(req.body)  
    
})   

router.post('/login',[
    body('email', "Enter a valid Email").isEmail()
 
],async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      } 
      const {email}=req.body
      try {
        const teacher= await teachers.findOne({ email})
        if(!teacher){
        return res.status(400).json({ error: 'Teacher not found' });
        }
        
        res.json({teacher ,"status":"Success"});
      } catch (error) {
        
        console.error(error);
        res.status(500).json({ error: 'Server error' })
      }   
   
})

router.post('/adminlogin',[
  body('email', "Enter a valid Email").isEmail()

],async (req,res)=>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } 
    const {department, email}=req.body
    try {
      const admins= await admin.findOne({department, email})
      if(!admins){
      return res.status(400).json({ error: 'Admin not found' });
      } 
      
      res.json({admins ,"status":"Success"});
    } catch (error) { 
      
      console.error(error);
      res.status(500).json({ error: 'Server error' })
    }  
 
})


 
module.exports=router                       