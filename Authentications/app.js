const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

app.use(cookieParser());

// -------------------------------- jwt [PART-3] ---------------------------

app.get('/',(req,res)=>{
   let token = jwt.sign({email: 'shivam@mom'},"secret");
   res.cookie("token",token)
   res.send("Mai Yahi pe hu.")
})





//-------------------- password encryption[PART - 2] ---------------------
// app.get('/',(req,res)=>{
//    bcrypt.genSalt(10, function(err, salt) {
//       bcrypt.hash("hello%sajni", salt, function(err, hash) {
//         console.log(hash)
//       });
//    });
// })

//------------------------password decryption[PART-2.1]----------------------------

// app.get('/',(req,res)=>{
//    bcrypt.compare('hello%sajni', '$2b$10$yg6qmymnpRF.Vc5eQL0ClOQg9bSc41qj.6LxQKM/azOYNozCJv.Fy', function(err, result) {
//      console.log(result);
//    });
// })

// -------------------------------set the cookies[PART -- 1]-----------------------

// app.get('/',(req,res)=>{
//    res.cookie("name","harsh");
//    res.send("done");
// })

// app.get('/read', function(req,res){             
//    console.log(req.cookies);
//    res.send("read page");
// })

app.listen(3000,()=>{
    console.log("port is running at 3000");
})