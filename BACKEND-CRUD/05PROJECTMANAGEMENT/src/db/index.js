import mongoose from "mongoose";

const connectDB = async ()=> {
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGODB_URI)
        console.log("Mongo DB is connected successfully.");
        
        console.log(connectionInstance.connection.host);
        
    } catch (error) {
        console.error("MongoDB connections is failed. ||",error);
        process.exit(1);
    }
}

export default connectDB;