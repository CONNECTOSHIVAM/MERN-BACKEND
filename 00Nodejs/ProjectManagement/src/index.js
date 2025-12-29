import dotenv from 'dotenv'
import express from 'express'

// console.log(`Radhe radhe`);

dotenv.config({
    path: "./.env",
})

const app = express();
const port = process.env.PORT || 3000

app.get("/",(req,res)=>{
    res.send("Hello World");
})

app.get("/instagram",(req,res)=>{
    res.send("Now -- Time Invest Your Self.")
})


app.listen(port,()=>{
    console.log(`App is listening port on : ${port}`)
})


