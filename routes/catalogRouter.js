const router = require('express').Router();
const { User, Category } = require('../db/models');

router.route('/')
  .get(async (req, res) => {
    const id = 1;
    const userName = await User.findOne({ where: { id } });
    // console.log(userName);
    
    const categoryNames = await Category.findAll();
    console.log(categoryNames);
    
    res.render('catalog', { userName, categoryNames });
  });

module.exports = router;
