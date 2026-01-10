import dotenv from "dotenv"
import connectDB from "./db/index.js"

dotenv.config({
    path: './.env'
})


connectDB()
  .then(()=>{
    console.l
  })
  .catch((error)=>{
    console.log(`MongoDB connection nahi hua hain ji ${error}`)
  })