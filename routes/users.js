const express = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

const router = express.Router();

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) return res.json({ status: 'error', message: 'Invalid email' });
        if (user.password !== password) return res.json({ status: 'error', message: 'Incorrect password' });

        const userData = {
            email: user.email
        };

        const token = jwt.sign(userData, process.env.JWT_SECRET_USER);

        res.json({ status: 'success', token });
    } catch (err) {
        console.log(err);
        res.json({ status: 'error', message: 'Internal error' });
    }
});

router.post('/register', async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) return res.json({ status: 'error', message: 'Email is already taken' });

        const user = new User({
            email,
            password
        });

        const newUser = await user.save();

        res.json({ status: 'success', user: newUser });
    } catch (err) {
        console.log(err);
        res.json({ status: 'error', message: 'Internal error' });
    }
});

module.exports = router;