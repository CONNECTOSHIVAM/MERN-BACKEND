// console.log("radhe radhe")

import dotenv from "dotenv"
import connectDB from "./db/index.js"

dotenv.config({
    path : './env'
})

connectDB()
 .then(()=>{
    app.on("error",(error)=>{
        console.error("error in connection to express",error)
    })
    
    const port = process.env.PORT
    app.listen(port || 3000,()=>{
        console.log(`App is listening on port: ${port}`)
    })
 })
 .catch((error)=>{
    console.log(`MongoDB connection falied --`,error)
 })

