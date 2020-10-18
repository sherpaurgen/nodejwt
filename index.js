const express = require('express');
const app = express()

const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')
const mongoose = require('mongoose')
dotenv.config();

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true }, () => console.log('Connected to db'))
mongoose.connection.once('open', () => console.log('mongo connected')).on('error', (error) => console.log("Error", error))

//middleware
app.use(express.json())

//import routes
const authRoute = require('./routes/auth');

//route middleware
app.use('/api/user', authRoute);



app.listen(3000, () => console.log('Server up and running port 3000...'))



