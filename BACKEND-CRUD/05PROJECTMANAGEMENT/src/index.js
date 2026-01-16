// console.log("radhe radhe");
import dotenv from "dotenv"
import app from "./app.js"


dotenv.config({
    path: "./.env",
})


const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`app are listening at http://localhost:${port}`);
})
