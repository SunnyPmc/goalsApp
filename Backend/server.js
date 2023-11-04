const express = require('express')
const { errorHandler } = require('./middleware/errorMiddleware')
const dotenv = require('dotenv').config()
// const cors=require("cors")
const port = process.env.PORT || 8000;
const connectDB = require('./config/db');
// const allowedHosts=require("./config/allowedHost");



//func to allowed the host

// const controller=()=>{

// }


connectDB()
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/goals', require('./routes/goalRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

app.use(errorHandler)

app.listen(port, () => console.log(`Server listening on port ${port}`))