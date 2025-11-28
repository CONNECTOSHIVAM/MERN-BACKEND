const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Home page → show all files
app.get('/', (req, res) => {
    fs.readdir('./files', (err, files) => {
        if (err) files = [];
        res.render("index", { files: files });
    });
});

// View file
app.get('/file/:filename', (req, res) => {
    fs.readFile(`./files/${req.params.filename}`, 'utf-8', (err, data) => {
        if (err) data = "Error reading file.";
        res.render("show", { filename: req.params.filename, filedata: data });
    });
});

// Edit file - show form
app.get('/edit/:filename', (req, res) => {
    res.render('edit', { filename: req.params.filename });
});

// Handle rename
app.post('/edit', (req, res) => {
    const oldname = req.body.previous;
    const newname = req.body.new.trim().split(" ").join("") + ".txt";

    fs.rename(`./files/${oldname}`, `./files/${newname}`, (err) => {
        res.redirect("/");
    });
});

// Create new file
app.post("/create", (req, res) => {
    const filename = req.body.title.trim().split(" ").join("") + ".txt";

    fs.writeFile(`./files/${filename}`, req.body.details, (err) => {
        res.redirect('/');
    });
});

// Start server
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
