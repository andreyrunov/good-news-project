const router = require('express').Router();
const axios = require('axios');
const { parseString } = require('xml2js');
const { User, Category, Post } = require('../db/models');

// /catalog

router.route('/')
  .get(async (req, res) => {
    try {
      const id = 1;
      const userName = await User.findOne({ where: { id } });
      // console.log(userName);

      const categoryNames = await Category.findAll();
      // eslint-disable-next-line max-len
      const categoriesArr = categoryNames.map((el) => ({ id: el.dataValues.id, title: el.dataValues.title }));
      // setTimeout(console.log(categoryNames[0].title), 1000);
      // console.log(categoriesArr);

      const getRiaNews = await axios.get('https://ria.ru/export/rss2/archive/index.xml');
      let news;
      parseString(getRiaNews.data, (err, result) => {
        news = result.rss.channel[0].item;
      });

      /* console.log(news.map((el) => ({
        category: el.category[0], title: el.title[0], description: el.description[0], enclosure: el.enclosure?.[0].$.url,
      }))); */

      const newArr = news.map((el) => {
        if (el.enclosure?.[0].$.type === 'image/jpeg') {
          return {
            category: el.category[0], title: el.title[0], description: el.description[0], enclosure: el.enclosure?.[0].$.url,
          };
        }
      });

      // console.log(categoryNames);
      // const result = await Category.findOne({ where: { title: news[0].category[0] } });
      // news.forEach(async (el) => {
      //   if (result === null) {
      //     await Category.create({ title: el.category[0] });
      //   }
      //    console.log(result);

      // console.log(el.category[0]);
      // });

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


/*   // /catalog/:card
  router.route('/:card')
  .get(async (req, res) => {
    const  Names = await Category.findAll();

  }) */

  
module.exports = router;
