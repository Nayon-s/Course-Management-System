const mongoose = require('mongoose');
  const { Schema } = mongoose;

const adminSchema=new Schema({
    name:{ 
        type: String, 
        required: true
    }, 
   
    email:{ 
        type: String,
        required: true,
        unique: true
    },
    mobileNo:{
        type: String,
        required: true
    }, 
    designation:{
        type: String,
        required: true
    },
    department:{
        type: String,
        required: true
    }
    
     
})
module.exports=mongoose.model('admin',adminSchema)