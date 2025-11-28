const express = require('express');
const app = express();
const path = require("path")
const userModel = require("./models/user")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')))
app.set("view engine", "ejs");

app.get('/', (req, res) => {
    res.render("index")
})

app.get('/read', (req, res) => {
    res.render("read")
})

app.post('/create', async (req, res) => {
    let { name, email, image } = req.body;

    let user = await userModel.create({
        name,
        email,
        image 

    })
    // console.log(user)
    res.send(user)
})

app.listen(3000, () => {
    console.log("Listening port at 3000")
})