import express from "express"

const app = express()

app.get('/',(req,res)=>{
    res.send("Hi ConnectoShivam!")
})

export default app;