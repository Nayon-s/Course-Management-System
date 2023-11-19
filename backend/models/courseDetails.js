const mongoose = require('mongoose');
const { Schema } = mongoose;

const courseDetailsSchema=new Schema({
    department:{
        type: String,
        required:true
    }, 
    year:{ 
        type: String, 
        required: true
    }, 
   
    semester:{ 
        type: String,
        // required: true,
    },
    courseList:
    {
        type: 
        [
            {   
            courseTitle: String, 
            courseCode: String,
            courseCredit: String
            }
        ], 
        required: true

    }

    
    
})
module.exports=mongoose.model('courseDetails',courseDetailsSchema)