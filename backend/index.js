const connection=require('./database.js')
connection()

  
const express = require('express') 

const app = express() 
const port = 5000

var cors = require('cors')
app.use(cors())
app.use(express.json())


const teachers = require('./models/teachers.js')
 
app.use('/api/authenticate',  require('./routes/authenticate.js'))
app.use('/api/course',  require('./routes/course.js'))



app.listen(port, () => { 
    console.log(`App listening on port ${port}`)
  }) 