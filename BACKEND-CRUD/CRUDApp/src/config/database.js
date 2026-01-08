import mongoose from "mongoose";

const ConnectDB = async ()=>{

    try {
        const connectionInstance = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Message of connectionInstance: ${connectionInstance.connection.base}`)
        console.log(`MongoDB is connection successfull : ${connectionInstance.connection.host}`);
        
    } catch (error) {
        console.log(`MongoDB connetion failed. ${error}`)
        process.exit(1);
    }
}

export default ConnectDB;