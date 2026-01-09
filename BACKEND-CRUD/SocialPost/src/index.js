import dotenv from "dotenv"
import connectDB from "./cofig/database.js"
import app from "./app.js"

dotenv.config({
    path: './.env'
})

const startServer = async ()=>{

    try {
        await connectDB();

        app.on("error",(error)=>{
            console.log(`server connections issue: ${error}`)
            throw error
        })

        app.listen(process.env.PORT,()=>{
            console.log(`Server is running at port ${process.env.PORT} `)
        })
    } catch (error) {
        console.error("MongoDB Connection nahi hua ji..:",error);
        process.exit(1);
    }
}

startServer()