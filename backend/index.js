const mongoose = require('mongoose');
const express = require('express');
var cors = require('cors')

// to establish connection between mongodb and node js first install express, mongoose then nodemon
//for validation install express-validator
//for adding salt in backend install bcryptjs
//install jsonwebtoken ---it is a method to verify a user

mongoose.connect("mongodb://127.0.0.1:27017/inotebook?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.10.6")
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB: ', err);
  });

 // from express.js starter template
const app = express()
const port = 5000

app.use(cors())
app.use(express.json())      //middleware between thunderclient and terminal

//Avalable routes

app.use('/api/auth', require('./routes/auth'))            //Use the middleware defined in the file located at './routes/auth'. Apply this middleware to any route that starts with '/api/auth'.
app.use('/api/notes', require('./routes/notes'))


app.listen(port, () => {
  console.log(`iNotebook backend listening on port ${port}`)
})
