const router = require('express').Router();
const axios = require('axios');
const { parseString } = require('xml2js');
const { User, Category } = require('../db/models');

router.route('/')
  .get(async (req, res) => {
    const id = 1;
    const userName = await User.findOne({ where: { id } });
    // console.log(userName);

    const categoryNames = await Category.findAll();
    // console.log(categoryNames);

    const getRiaNews = await axios.get('https://ria.ru/export/rss2/archive/index.xml');
    // const toJson = getRiaNews.json();
    // const newResult =  parseString(String(getRiaNews.data), (err, result) => result);
    // result.rss.channel[0].item
    // console.log(newResult);
    let news;
    parseString(getRiaNews.data, (err, result) => {
      news = result.rss.channel[0].item;
    });
    console.log(news.map((el) => ({ title: el.title, description: el.description, enclosure: el.enclosure?.[0].$ || null })));
    // console.log(Object.keys(getRiaNews));

    res.render('catalog', { userName, categoryNames });
  });

module.exports = router;
