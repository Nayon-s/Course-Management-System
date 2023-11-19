const express = require('express') 
const courses= require('../models/courses')
const applicants= require('../models/applicants')
const teachers= require('../models/teachers')

const router=express.Router()
const { body, validationResult } = require('express-validator');
const courseHistory = require('../models/courseHistory');
const assigned = require('../models/assigned');
const courseDetails = require('../models/courseDetails');
 
router.post('/addcourses',(req,res)=>{
 
    const course=courses(req.body)  
    course.save() 
    res.json(req.body)  
    
})  
router.post('/courseDetails', async(req,res)=>{

  const course=await courseDetails.findOne({department:req.body.department,year:req.body.year,semester:req.body.semester})
  // console.log(course)
  // console.log(req.body)
  const check=await courses.findOne({department:req.body.department,year:req.body.year,semester:req.body.semester}) 
  if(check!==null){
      res.json({courses:course.courseList,"status":"yes"})

  }
  else{
    res.json({courses:course.courseList,"status":"no"})

  }

  
}) 
// router.post('/findcourses',async(req,res)=>{
//   const check=await courses.findOne({department:req.body.department,year:req.body.year,semester:req.body.semester}) 
//   if(course!==null){
//       res.json({"status":"yes"})

//   
//   }else{
//     res.json({"status":"no"})

//   }
// })
router.post('/removecourses',async(req,res)=>{
  const course=await courses.deleteOne({department:req.body.department,year:req.body.year,semester:req.body.semester}) 
  res.json(course)
})

router.post('/courselist', async(req,res)=>{
  const course= await courses.find({department:req.body.department})
const assign= await assigned.find({})
const common=assign.map((course)=>course.courseDetails.courseTitle)
  const filteredCommon =common.filter(title=>!title.toLowerCase().includes('lab'));

  //      console.log(common)  
  //  console.log(filteredCommon)
  const duplicate = common.filter((title, index) => {
    return common.indexOf(title) !== index;
  });
  
 const newFilteredCommon=filteredCommon.concat(duplicate)
      // console.log(newFilteredCommon); 

const filteredCourses = course.map((courseItem) => {
  return {

    ...courseItem.toObject(),
    courseList: courseItem.courseList.filter(
       (courseList)=>!newFilteredCommon.includes(courseList.courseTitle)
 
    )
  };
});
    // console.log(common) 
 
  res.json(filteredCourses) 
}) 

router.post('/allcourses', async (req, res)=>{
  const course=await courses.find({department: req.body.department });

  const history = await courseHistory.find({ teacherEmail: req.body.email });
  const commonCourseTitles = history.map((historyItem)=>historyItem.courseTitle);
 // console.log(commonCourseTitles)
  const filteredCourses=course.map((courseItem) => {
    return {

      ...courseItem.toObject(),
      courseList: courseItem.courseList.filter(
        (courseList) =>!commonCourseTitles.includes(courseList.courseTitle)
      )
    };
  });
  const applied= await applicants.find({email: req.body.email })
  
  const restCourses= applied.map((index,id)=>{
    return(
      index.courseList.map((x,y)=>{
        return(
          x.courseTitle
        )
      })
    )
  })
  //  console.log(restCourses)
  const final=filteredCourses.map((i,j)=>{
    return(
      i.courseList.map((k,l)=>{
        return(
          k.courseTitle 
        )
      })
    )
  })
  // console.log(final)

  const finalFlat = restCourses.flat();
// console.log(finalFlat)
 
  const filteredCourse=filteredCourses.map((courseItems) => {
    return {

      ...courseItems,
      courseList: courseItems.courseList.filter(
        (courseList) =>!finalFlat.includes(courseList.courseTitle)
      ) 
    };
  }); 
// console.log(filteredCourse)
      

  res.json(filteredCourse); 
});  



router.post('/addapplicants',async(req,res)=>{
    const email=req.body.email
    const search= await applicants.findOne({email}) 
    // console.log(req.body)
    if(search===null){
       const applicant=await applicants(req.body)  
    applicant.save() 
    res.json(req.body)  
    }
    else if(search.courseList.length>=6){
      res.json({"status":"error"})
    }
    else{
              const courseListObject = req.body.courseList; 
const courseListArray = [courseListObject]; 

const update = await applicants.updateOne(
  { email: email },
  {
    $set: {
      name: req.body.name,
      email: req.body.email,
      department: req.body.department,
    }, 
    $push:{
      courseList:{
        $each: courseListArray,   
      },
    },
  },
  {upsert:false}
);
const updatedApplicant = await applicants.findOne({ email });

// console.log(updatedApplicant)
              res.json(updatedApplicant)
    }  
        
    // console.log(search.courseList.length)
}) 



router.post('/checkapplicants', async (req, res) => {
  const search = await applicants.find({ 'courseList.courseTitle': req.body.courseTitle });

  const findTeacher = await assigned.find({ 'courseDetails.courseTitle': req.body.courseTitle });
  // console.log(findTeacher)

  if(findTeacher===null){
    const applicantInfo=search.map(applicant=>({
          name:applicant.name,
          email:applicant.email, 
        }));
        res.json(applicantInfo)
  }
  else{
    // const updatedApplicantInfo = search.filter((applicant) => {
    // return(
    //   applicant.name!==findTeacher.map((index)=>{
    //     return(
    //        index.name
    //     )
    //   })
    // )
  // }); 
  const updatedApplicantInfo = search.filter((applicant) => {
    return !findTeacher.map((index)=>index.name).includes(applicant.name);
  });
  
    // console.log(updatedApplicantInfo) 

  const applicantInfo = updatedApplicantInfo.map((applicant) => ({
    name: applicant.name,
    email: applicant.email,
  }));
  res.json(applicantInfo); 

  }

   

  // console.log(search);
  // console.log(findTeacher);
});
 
 
router.post('/assign',async(req,res)=>{
  const teacher =await assigned.find({email:req.body.email,name:req.body.name})
    // console.log(teacher)
    const designation= await teachers.findOne({email:req.body.email,name:req.body.name})
    // console.log(designation.designation)
  const credit=teacher.map((index)=>{
    return (
      index.courseDetails.courseCredit
    )
  })
let sum=parseFloat(req.body.courseDetails.courseCredit)
let numberCredit = credit.map(Number);

  numberCredit.forEach((index)=>{
    return(
      sum+=index
    )

  })
  
      // console.log(sum)
  // if(sum>12&&designation.designation==="Lecturer"){
       if(sum>12){
    res.json({"status":"failed"})
  }
  else{
     const assign=assigned(req.body)  
  assign.save() 
  res.json(req.body)  
  } 
  
    // console.log(teacher)

   
  
}) 

router.post('/appliedcourse', async(req,res)=>{ 
  const applied=await applicants.findOne({name:req.body.name,email:req.body.email,department:req.body.department})
  if(applied!==null)
  res.json(applied.courseList)

})  
router.post('/assignedcourse', async(req,res)=>{
  const assign=await assigned.find({name:req.body.name,email:req.body.email,department:req.body.department})
  const assignedCourses=assign.map((index)=>{
    return(
      index.courseDetails
    )
  })  
 
   if(assign!==null)
   res.json(assignedCourses) 
 
}) 
router.post('/removeApplicant',async(req,res)=>{
  const search=await applicants.findOne({name:req.body.name, email:req.body.email  })
  const course= search.courseList.filter((index)=>{
    return(
      index.courseTitle!==req.body.courseTitle
    )
  })
     
    const updated= await applicants.findOneAndUpdate({name:req.body.name, email:req.body.email},{
  $set:{
    name:req.body.name,
    email:req.body.email,
    department:req.body.department,
    courseList: search.courseList.filter((index)=>{
      return(
        index.courseTitle!==req.body.courseTitle
      )
    })

  }
})   
//  console.log(course)  
   res.json(updated)

})
router.post('/allassigned',async(req,res)=>{
  
  try {
    const search=await assigned.find({department:req.body.department  })
  res.json(search)
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }

})

router.post('/teacherinfo',async(req,res)=>{
  
  const uniques = [
    {
      $group: {
        _id: '$email',
        name: { $first: '$name' },
        email: { $first: '$email' },
        courses: {
          "$push": "$courseDetails"
        },
  
        totalCredit: {
          $sum: {
            $toDouble: '$courseDetails.courseCredit'
          }
        }
      }
    },
    {
      $sort: {
        totalCredit: -1
      }
    }
  ]
  
  const teacherInfo = await assigned.aggregate(uniques);
  res.json(teacherInfo);
  

})

router.post('/reassign',async(req,res)=>{
  
  const teacher =await assigned.find({email:req.body.email,name:req.body.name})
  // console.log(teacher)
  const designation= await teachers.findOne({email:req.body.email,name:req.body.name})
  // console.log(designation.designation)
const credit=teacher.map((index)=>{
  return (
    index.courseDetails.courseCredit
  )
})
let sum=parseFloat(req.body.courseDetails.courseCredit)
let numberCredit = credit.map(Number);

numberCredit.forEach((index)=>{
  return(
    sum+=index
  )
  })
//  console.log(req.body.previous)
 if(sum<12){
  const updatedTeacher =await assigned.updateOne({'courseDetails.courseTitle': req.body.courseDetails.courseTitle, email:req.body.previous},
  {$set: {name: req.body.name,
    email: req.body.email,
  }}, {upsert: false})
    res.json(updatedTeacher)
  } 
  else{
    res.json({"status":"failed"})

  }
  // console.log(req.body)

})
 


module.exports=router                           