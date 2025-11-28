const express = require("express");
const app = express();

const userModel = require('./usermodel')

app.get('/',(req,res)=>{
    res.send("chal raha hai")
})

app.get('/create',async (req,res)=>{
   let createdUser = await userModel.create({
      name: "harsh",
      username: "myharsh",
      email: "harsh@mymail.com"
   })
   res.send(createdUser);
})

app.get('/update',async(req,res)=>{
   let updatedUser = await userModel.findOneAndUpdate({username: "myharsh"},{name: "harsh sir"},{new:true});
   res.send(updatedUser);
})

app.get('/read',async(req,res)=>{
    let users = await userModel.find();
    res.send(users);
})

app.get('/delete',async(req,res)=>{
    let deletedUser = await userModel.findOneAndDelete({username: "myharsh"});
    res.send(deletedUser);
})


app.listen(3000,()=>{
    console.log("Port is listening at 3000 port")
})