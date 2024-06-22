const mongoose = require('mongoose');

async function connection() {
  await mongoose.connect('mongodb+srv://nayon49:smith49@cluster0.yl2sw9b.mongodb.net/courses?retryWrites=true&w=majority&appName=Cluster0'); 
    console.log("database connected")
}

module.exports=connection
