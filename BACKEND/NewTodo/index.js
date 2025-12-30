const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes');
const app = express();
const port = 3000
const dotenv = require('dotenv');
dotenv.config();

app.use(express.json());
app.use("/v1",router); //v1-- means specify the versioning.

mongoose.connect(process.env.MONGOOSE_URL).then(()=>{
    console.log("connected to mongodb")
}).catch(()=>{console.log('Mongodb connections failed.')})


app.listen(port,(req,res)=>{
    console.log(`app is Listening Port: ${port}`)
})