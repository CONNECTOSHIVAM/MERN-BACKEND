import mongoose from "mongoose";

const connectDB = async()=>{

    try {
        const connectionInstance = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB connection successfull : ${connectionInstance.connection.host}`)

    } catch (error) {
        console.error("MONGODB Connection failed.",error);
        process.exit(1);
    }
}

