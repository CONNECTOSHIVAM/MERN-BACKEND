//connect to mongoDB Atlas
import mongoose from "mongoose"
// import { DB_NAME } from "./constants.js";

const ConnectDB = async ()=>{
    try {
        const connnectionInstance = await mongoose.connect(`${process.env.MONGO_URI}`)
        console.log("MongoDB is connected..!",connnectionInstance.connection.host);
        
    } catch (error) {
        console.log("MongoDB connection Failed.||",error);
        process.exit(1)
        
    }
}

export default ConnectDB;