const router = require('express').Router();
const axios = require('axios');
const { parseString } = require('xml2js');
const {
  User, Category, Post, Prefer, Notprefer,
} = require('../db/models');
const { checkSession } = require('../middleWares/middleWare');

router.route('/')
  .get(async (req, res) => {
    try {
      const id = req.session.userid;
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

      const getRbc = await axios.get('https://rssexport.rbc.ru/rbcnews/news/30/full.rss');

      let newsRbc;
      parseString(getRbc.data, (err, result) => {
        newsRbc = result.rss.channel[0].item;
      });

      const newArrRbc = newsRbc.map((el) => {
        if (el.enclosure?.[0].$.type === 'image/jpeg') {
          return {
            category: el.category[0], title: el.title[0], description: el.description[0], enclosure: el.enclosure?.[0].$.url,
          };
        }
      });
      // console.log(newArrRbc);

      newArrRbc.forEach(async (el) => {
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

      const posts = await Post.findAll({ raw: true });

      //  получаем списки предпочтений и не предпочтений
      const userId = req.session.userid;
      const prefers = await Prefer.findAll({ where: { user_id: userId }, raw: true });
      const notPrefers = await Notprefer.findAll({ where: { user_id: userId }, raw: true });

      const afterPref = [];
      posts.forEach((el) => prefers.forEach((elem) => {
        if (el.text.includes(elem.text) || el.title.includes(elem.text)) {
          afterPref.push(el);
        }
      }));

      const afterNotPref = [];
      afterPref.forEach((el) => notPrefers.forEach((elem) => {
        if (!el.text.includes(elem.text) && !el.title.includes(elem.text)) {
          afterNotPref.push(el);
        }
      }));
      // console.log(afterNotPref);

      let showPosts;
      if (prefers.length === 0) {
        showPosts = [...posts];
        // console.log('********* if');
      } else if (afterNotPref.length === 0) {
        showPosts = [...afterPref];
        // console.log('********* else');
      } else {
        showPosts = [...afterNotPref];
      }
      // console.log('^^^^^^^^^^^^^^^^^^^', req.session.userid);
      res.render('catalog', { userName, categoryNames, showPosts });
    } catch (err) {
      // console.error(err);
    }
  });

router.route('/:catId')
  .get(async (req, res) => {
    const { catId } = req.params;
    const posts = await Post.findAll({ where: { category_id: catId }, raw: true });
    const categoryNames = await Category.findAll();

    const userId = req.session.userid;
    const prefers = await Prefer.findAll({ where: { user_id: userId }, raw: true });
    // const notPrefers = await Notprefer.findAll({ where: { user_id: userId }, raw: true });

    const afterPref = [];
    posts.forEach((el) => prefers.forEach((elem) => {
      if (el.text.includes(elem.text) || el.title.includes(elem.text)) {
        afterPref.push(el);
      }
    }));

    let showPosts;
    if (prefers.length === 0) {
      showPosts = [...posts];
      // console.log('********* if');
    } else {
      showPosts = [...afterPref];
      // console.log('********* else');
    }

    res.render('catalog', { categoryNames, showPosts });
  });

router.route('/:catId/:id')
  .get(async (req, res) => {
    const { id } = req.params;
    const post = await Post.findOne({ where: { id }, raw: true });
    const categoryNames = await Category.findAll();
    res.render('card', { categoryNames, post });
  });

module.exports = router;
