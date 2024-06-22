// const mongoose = require('mongoose');

// async function connection() {
//   await mongoose.connect('mongodb+srv://nayon49:smith49@cluster0.yl2sw9b.mongodb.net/courses?retryWrites=true&w=majority&appName=Cluster0'); 
//     console.log("database connected")
// }

// module.exports=connection
const mongoose = require('mongoose');

async function connection() {
  try {
    await mongoose.connect('mongodb+srv://nayon49:smith49@cluster0.yl2sw9b.mongodb.net/courses?retryWrites=true&w=majority&ssl=true', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    if (err.cause) {
      console.error("Cause:", err.cause);
    }
  }
}

module.exports = connection;
