const mongoose = require('mongoose');
const { Schema } = mongoose;

const historySchema=new Schema({
    courseTitle:{
        type: String,
        required:true
    }, 
     consecutive:
    {
        type: String,
        required: true

    },
    name:{ 
        type: String, 
        required: true
    }, 
   
    email:{ 
        type: String,
        required: true,
    } 
   
 
    
    
})
module.exports=mongoose.model('courseHistories',historySchema)