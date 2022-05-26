const router = require('express').Router();
const {User} = require('../db/models/');
const bcrypt = require('bcrypt');
const { checkLogin } = require('../middleWares/middleWare');


router.get('/', async (req, res) => {
  res.render('auth')
} )

router.route('/auth')
  .get(checkLogin, (req, res) => {
    res.render('auth');
  })
  .post(async (req, res) => {
    const { mail, pass } = req.body;
    if ( mail && pass) {
      const userIn = await User.findOne({ where: { mail } });
      if (userIn && await bcrypt.compare(pass, userIn.pass)) {
        req.session.userid = userIn.id;
        req.session.userName = userIn.name;
        req.session.userEmail = userIn.mail;
        return res.redirect('/');
      }
      return res.redirect('/');
    }
    return res.redirect('/');
  });

module.exports = router;

