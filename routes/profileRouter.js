const router = require('express').Router();
const { Prefer, Notprefer, User } = require('../db/models')

router.route('/')
  .get(async (req, res) => {
    const id = 1;
    const currUser = await User.findOne({ where: { id } });
    const prefs = await Prefer.findAll({ where: { user_id: currUser.id } });
    const notprefs = await Notprefer.findAll({ where: { user_id: currUser.id } });
    res.render('profile', { prefs, notprefs });
  });

router.post('/newPref', async (req, res) => {
  const { textus } = req.body.textus;
  const newpref = await Prefer.create({
    text: textus,
  });
  res.render('profile');
});

router.post('/newNotpref', async (req, res) => {
  const { textus } = req.body.textus2;
  const newnotpref = await Notprefer.create({
    text: textus,
  });
  res.render('profile');
});

module.exports = router;
