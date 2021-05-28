const express = require('express');

const usersRouter = require('./users');
const adminsRouter = require('./admins');
const postsRouter = require('./posts');

const router = express.Router();

router.get('/', (req, res) => {
    res.json({ message: 'Hello from the API' });
});

router.use('/users', usersRouter);
router.use('/admins', adminsRouter);
router.use('/posts', postsRouter);

module.exports = router;