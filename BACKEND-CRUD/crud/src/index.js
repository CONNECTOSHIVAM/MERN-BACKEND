import app from "./app.js"
import dotenv from "dotenv"
import { connectDB } from "./config/database.js"

dotenv.config({
    path: "./.env"
})

const startServer = async () => {

    try {
        await connectDB()

        app.get('/',(req,res)=>{
           res.send("MongoDB Successfully Connected.")
        })

        app.on("error",(error)=>{
            console.log(`Server connection error aaya ji || ${error}`);
            throw error
        })

        app.listen(process.env.PORT,()=>{
            console.log(`Server is listerning at ${process.env.PORT} || http://localhost:${process.env.PORT}`);
        })
        
    } catch (error) {
        console.log(`MongoDB connection tho nahi hua ji || ${error}`)
        process.exit(1);
    }
}

startServer()