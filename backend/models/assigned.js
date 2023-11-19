const mongoose = require('mongoose');
const { Schema } = mongoose;

const assignSchema=new Schema({
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
    courseDetails:
    { 
       type: {   
            courseTitle: String, 
            courseCode: String,
            courseCredit: String
        }, 
        required: true

    }
    
    
}) 
module.exports=mongoose.model('assign',assignSchema)