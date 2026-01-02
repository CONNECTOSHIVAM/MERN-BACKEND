const express = require('express');
const dotenv = require('dotenv');

//load env variables.
dotenv.config()

const port = process.env.port
const app = express();

app.get('/',(req,res)=>{
    res.send("<h1>radhe radhe<h1>")
})

app.get('/suhi',(req,res)=>{
    res.send("Suhi is trillio dollor service organisations.")
})


app.listen(port,(req,res)=>{
    console.log(`port is listening at ${port}`)
})