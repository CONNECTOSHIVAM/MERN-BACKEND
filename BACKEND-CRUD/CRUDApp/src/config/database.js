import mongoose from "mongoose";

const ConnectDB = async () => {
    
    try {
        const connnectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`)
        console.log("MongoDB is connected successfull.",connnectionInstance.connection.host)
    } catch (error) {
        console.log(`MongoDB connection failed..||${error}`);
        process.exit(1);
    }
}

export default ConnectDB;