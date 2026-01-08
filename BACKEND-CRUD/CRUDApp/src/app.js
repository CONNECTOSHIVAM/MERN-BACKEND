import express from "express";

const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//import the routes
import userRouter from "./routes/user.routes.js";

//route declaration
app.use('/api/v1/users',userRouter);

export default app;