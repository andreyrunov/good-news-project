const router = require('express').Router();
const { User, Category, Post } = require('../db/models');

router.route('/')
  .get(async (req, res) => {
    const id = 1;
    const idPost = 1111;
    const userName = await User.findOne({ where: { id } });
    const post = await Post.findOne({ where: { id: idPost } });
    const categoryNames = await Category.findAll();
    res.render('card', { categoryNames, userName, post });
  });

module.exports = router;
