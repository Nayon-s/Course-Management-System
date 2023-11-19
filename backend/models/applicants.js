const mongoose = require('mongoose');
const { Schema } = mongoose;

const applicantSchema=new Schema({
    name:{ 
        type: String, 
        required: true
    }, 
   
    email:{ 
        type: String,
        required: true
        },
    department:{
        type: String,
        required: true
    }
    ,
    courseList:
    {
        type: 
        
           [ {   
            courseTitle: String, 
            courseCode: String,
            courseCredit: String
            }],
        
        required: true

    }
    
    
})
module.exports=mongoose.model('applicants',applicantSchema)