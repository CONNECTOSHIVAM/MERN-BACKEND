// console.log("radhe radhe");
import dotenv from "dotenv"
import app from "./app.js"
import connectDB from "./db/index.js"


dotenv.config({
    path: "./.env",
})


const port = process.env.PORT || 3000

connectDB()
  .then(()=>{
     app.listen(port,()=>{
        console.log(`App is at the http://localhost:${port}`);
        
     })
  })
  .catch((err)=>{
    console.error(`MongoDB connections nahi hua ji || error: ${err}`)
  })
