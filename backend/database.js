const mongoose = require('mongoose');

async function connection() {
  await mongoose.connect('mongodb://127.0.0.1:27017/courses');
    console.log("database connected")
}

module.exports=connection
