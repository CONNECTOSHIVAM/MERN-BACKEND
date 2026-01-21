import express from "express"

const app = express()

app.use(express.json())
app.use(express.urlencoded())

//import the routes
import userRouter from './routes/user.route.js'

// route declarations
app.use("/api/v1/users",userRouter)

export default app;