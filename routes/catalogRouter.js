const router = require('express').Router();
const axios = require('axios');
const { parseString } = require('xml2js');
const { User, Category, Post } = require('../db/models');

router.route('/')
  .get(async (req, res) => {
    try {
      const id = 1;
      const userName = await User.findOne({ where: { id } });
      // console.log(userName);

      const categoryNames = await Category.findAll();

      const getRiaNews = await axios.get('https://ria.ru/export/rss2/archive/index.xml');
      // const toJson = getRiaNews.json();
      // const newResult =  parseString(String(getRiaNews.data), (err, result) => result);
      // result.rss.channel[0].item
      // console.log(newResult);
      let news;
      parseString(getRiaNews.data, (err, result) => {
        news = result.rss.channel[0].item;
      });
      // console.log(news);

      console.log(news.map((el) => ({
        category: el.category[0], title: el.title[0], description: el.description[0], enclosure: el.enclosure?.[0].$ || null,
      })));
      // console.log(categoryNames);
      // const result = await Category.findOne({ where: { title: news[0].category[0] } });
      // news.forEach(async (el) => {
      //   if (result === null) {
      //     await Category.create({ title: el.category[0] });
      //   }
      //    console.log(result);
        
        // console.log(el.category[0]);
      //});
      news.forEach(async (el) => (
        await Category.findOrCreate({
          where: { title: el.category[0] },
          defaults: { title: el.category[0] },
        })
      ));

      // добавление новостей в бд
      /* news.forEach(async (el) => (
        await Post.findOrCreate({
          where: {
            title: el.title,
            text: el.description,
            category_id: 2,
            img: el.enclosure?.[0].$ || null,
          },
        })
      )); */

      // console.log(Object.keys(getRiaNews));
      res.render('catalog', { userName, categoryNames });
    } catch (err) {
      console.error(err);
    }
  });

module.exports = router;
