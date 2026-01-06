import dotenv from "dotenv";
import app from "./app.js";
import ConnectDB from "./config/database.js";

dotenv.config({
    path: './.env'
})


const startServer = async () => {

    try {
        await ConnectDB();

        app.on("error", (error) => {
            console.log("sever error", error)
            throw error
        })

        const port = process.env.PORT;
        app.listen(port || 8000, () => {
            console.log(`server is listening at port: ${port}`)
        })
    } catch (error) {
        console.log(`MongoDB Connection nahi hua ji...||${error}`);
        process.exit(1);
    }
}

startServer();