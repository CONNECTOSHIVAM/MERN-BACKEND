const express = require('express');
const { createUser } = require('../controllers/UserController');
const router = express.Router();


router.get('/',(req,res)=>{
    res.send("hello from router")
})

router.post('/add-user',createUser)

module.exports = router;