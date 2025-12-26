const userModel = require("../models/UserModel.js");

exports.createUser = async(req,res) => {
    const userData = req.body;
    if(!userData.name || !userData.age){
        res.json({message: 'Required fields are missing'})
        return
    }
    await userModel.collection.insertOne(userData);
    res.json({message: "user added successfully."})

}