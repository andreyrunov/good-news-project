const router = require('express').Router();
const { Prefer, Notprefer, User } = require('../db/models')

router.route('/')
  .get(async (req, res) => {
    const id = req.session.userid;
    const currUser = await User.findOne({ where: { id } });
    const imya = currUser.name;
    const pochta = currUser.mail;
    const prefs = await Prefer.findAll({ where: { user_id: currUser.id } });
    const notprefs = await Notprefer.findAll({ where: { user_id: currUser.id } });

    res.render('profile', { prefs, notprefs, imya, pochta });
  });

router.post('/newPref', async (req, res) => {
  const { textus } = req.body;
  const newpref = await Prefer.create({
    text: textus,
    user_id: req.session.userid,
  });

  res.redirect('/profile');
});

router.post('/newNotpref', async (req, res) => {
  const { textus2 } = req.body;
  const newnotpref = await Notprefer.create({
    text: textus2,
    user_id: req.session.userid,
  });
  res.redirect('/profile')
});

router.post('/deleteNP/:id', async (req, res) => {
  await Notprefer.destroy({ where: { id: req.params.id } });
  res.redirect('/profile');
});

router.post('/deleteP/:id', async (req, res) => {
  await Prefer.destroy({ where: { id: req.params.id } });
  res.redirect('/profile');
});

module.exports = router;
