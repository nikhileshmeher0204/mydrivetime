const express = require("express");
const router = express.Router();
const User = require("../models/userModel")
const jwt = require('jsonwebtoken');


router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username, password });
        if (user) {
            const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET);
            res.header('Authorization', token).send({ token, user });
        } else {
            return res.status(400).json('Invalid Credentials');
        }
    } catch (error) {
        console.error('Login route error:', error);
        return res.status(400).json('Something went wrong');
    }
});

router.post("/register", async(req, res) => {
    try {
        const newuser = new User(req.body)
        await newuser.save()
        res.send('User registered successfully')
    } catch (error) {
      return res.status(400).json(error);
    }
});


module.exports = router