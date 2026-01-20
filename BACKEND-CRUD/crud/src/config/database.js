import mongoose from "mongoose"
import { DB_NAME } from "./config.js"

const connectDB = async (req, res)=>{

    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}${DB_NAME}`)
        console.log(`MongoDB is successfully connected || host: ${connectionInstance.connection.host}`);
        
    } catch (error) {
        console.error(`MongoDB is connection falied. || ${error}`);
        process.exit(1);
    }
}

export {connectDB}