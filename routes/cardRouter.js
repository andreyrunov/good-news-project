const router = require('express').Router();
const { Category, Post } = require('../db/models');

router.route('/:id')
  .get(async (req, res) => {
    const { id } = req.params;
    const post = await Post.findOne({ where: { id }, raw: true });
    const categoryNames = await Category.findAll();
    const idUser = req.session.userid;
    console.log("----------->>>", idUser);
    
    res.render('card', { categoryNames, post });
  });

module.exports = router;
