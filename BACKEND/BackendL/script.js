// const fs = require('fs');

// fs.writeFile("one.txt", "Radhe radhe", function (err) {
//     if (err) console.error(err);
//     else console.log("done");
// })

// fs.appendFile("one.txt", "\nRadheKrishn", function (err) {
//     if (err) console.error(err);
//     else console.log("successfully added.")
// })

// fs.rename("one.txt", "us.txt", function (err) {
//     if (err) console.error(err);
//     else console.log("Successfully name is changed.")
// })

// fs.copyFile("us.txt", "./Learn/myone.txt", function (err) {
//     if (err) console.error(err);
//     else console.log("Successfull.")
// })

// fs.unlink("us.txt", function (err) {
//     if (err) console.error(err);
//     else console.log("Successfull file is deleted.")
// })

// fs.rm("./Learn", { recursive: true }, function (err) {
//     if (err) console.error(err);
//     else console.log("removed");
// })

// ------------------------------------------------------------
//create a server
// const http = require('http');

// const server = http.createServer(function (req, res) {
//     res.end("radhe radhe  \n server is created")
// })



// server.listen(3000);


// ----------------------------------------------------------------------------

//Learning nExpress:

const express = require('express')
const app = express()

app.use(express.json());
app.use(express.urlencoded({extended: true}))
 
app.get('/', function (req, res) {
    res.send("Hello World.......$")
})

app.get('/myone', function (req, res) {
    res.send("My Profile is Fabolous.")
})

app.listen(3000)