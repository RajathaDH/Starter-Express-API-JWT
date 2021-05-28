const express = require('express');

const Post = require('../models/Post');
const { validateToken } = require('../config/auth');

const router = express.Router();

// get all posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();

        res.json({ status: 'success', posts });
    } catch (err) {
        console.log(err);
        res.json({ status: 'error', message: 'Internal error' });
    }
});

// get a single post by id
router.get('/:id', async (req, res) => {
    const postId = req.params.id;

    try {
        const post = await Post.findById(postId);

        res.json({ status: 'success', post });
    } catch (err) {
        console.log(err);
        res.json({ status: 'error', message: 'Internal error' });
    }
});

// add new post
router.post('/', async (req, res) => {
    const token = req.get('authorization');

    if (!token) return res.json({ status: 'error', message: 'No access' });

    const userData = validateToken(token, 'user');

    if (!userData) return res.json({ status: 'error', message: 'Invalid token' });

    const { title, description } = req.body;

    try {
        const post = new Post({
            title,
            description
        });

        const newPost = await post.save();

        res.json({ status: 'success', post: newPost });
    } catch (err) {
        console.log(err);
        res.json({ status: 'error', message: 'Internal error' });
    }
});

// edit post
router.put('/:id', async (req, res) => {
    const token = req.get('authorization');

    if (!token) return res.json({ status: 'error', message: 'No access' });

    const userData = validateToken(token, 'user');

    if (!userData) return res.json({ status: 'error', message: 'Invalid token' });

    const postId = req.params.id;
    const { title, description } = req.body;

    try {
        const updatedPost = await Post.findByIdAndUpdate(postId, { title, description });

        res.json({ status: 'success' });
    } catch (err) {
        console.log(err);
        res.json({ status: 'error', message: 'Internal error' });
    }
});

// delete post
router.delete('/:id', async (req, res) => {
    const token = req.get('authorization');

    if (!token) return res.json({ status: 'error', message: 'No access' });

    const adminData = validateToken(token, 'admin');

    if (!adminData) return res.json({ status: 'error', message: 'Invalid token' });

    const postId = req.params.id;

    try {
        const deletedPost = await Post.findByIdAndDelete(postId);

        res.json({ status: 'success' });
    } catch (err) {
        console.log(err);
        res.json({ status: 'error', message: 'Internal error' });
    }
});

module.exports = router;