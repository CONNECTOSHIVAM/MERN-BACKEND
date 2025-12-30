import dotenv from 'dotenv'
import app from './app.js'

// console.log(`Radhe radhe`);

dotenv.config({
    path: "./.env",
})

const app = express();
const port = process.env.PORT || 3000

app.listen(port,()=>{
    console.log(`App is listening port on : ${port}`)
})


