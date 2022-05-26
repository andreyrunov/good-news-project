const router = require('express').Router();
const axios = require('axios');
const { parseString } = require('xml2js');
const { User, Category, Post } = require('../db/models');

router.route('/')
  .get(async (req, res) => {
    try {
      const id = 1;
      const userName = await User.findOne({ where: { id } });
      const categoryNames = await Category.findAll();
      const categoriesArr = categoryNames.map((el) => ({ id: el.dataValues.id, title: el.dataValues.title }));
      const getRiaNews = await axios.get('https://ria.ru/export/rss2/archive/index.xml');
      let news;
      parseString(getRiaNews.data, (err, result) => {
        news = result.rss.channel[0].item;
      });

      const newArr = news.map((el) => {
        if (el.enclosure?.[0].$.type === 'image/jpeg') {
          return {
            category: el.category[0], title: el.title[0], description: el.description[0], enclosure: el.enclosure?.[0].$.url,
          };
        }
      });

      newArr.forEach(async (el) => {
        categoriesArr.forEach(async (element) => {
          try {
            if (el !== undefined && element.title === el.category) {
              await Post.create({
                title: el.title, text: el.description, img: el.enclosure, category_id: element.id,
              });
            } else {
              await Category.create({
                title: el.category,
              });
              await Post.create({
                title: el.title, text: el.description, img: el.enclosure, category_id: element.id,
              });
            }
          } catch (err) {
            // console.log(err);
          }
        });
      });

      const posts = await Post.findAll();

      res.render('catalog', { userName, categoryNames, posts });
    } catch (err) {
      // console.error(err);
    }
  });

router.route('/:catId')
  .get(async (req, res) => {
    const { catId } = req.params;
    const posts = await Post.findAll({ where: { category_id: catId }, raw: true });
    const categoryNames = await Category.findAll();
    res.render('catalog', { categoryNames, posts });
  });

router.route('/:catId/:id')
  .get(async (req, res) => {
    const { id, catId } = req.params;
    const post = await Post.findOne({ where: { id }, raw: true });
    const categoryNames = await Category.findAll();
    res.render('card', { categoryNames, post });
  });

module.exports = router;
