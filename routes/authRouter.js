const router = require('express').Router();
const {User} = require('../db/models/');
const bcrypt = require('bcrypt');
const { checkLogin } = require('../middleWares/middleWare');
// const { user } = require('../sessions/1OI6d6P3Sa2UomOn1zgVCCsX_KUEkI0I.json');
// {user}
// && await bcrypt.compare(pass, userIn.pass)

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
      const userIn = await User.findOne({ where: { mail }, raw: true});

      console.log('----->>', userIn)
      if (userIn) {
        console.log('------ЮЮ Защед')
        req.session.userid = userIn.id;
        req.session.userName = userIn.name;
        req.session.userEmail = userIn.mail;
        console.log('zapisalos')
        return res.sendStatus(200);
      }
      console.log('---here')
      return res.sendStatus(401);
    }
    return res.sendStatus(404);
  });

module.exports = router;

