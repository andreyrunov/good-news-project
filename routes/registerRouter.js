const router = require('express').Router();
const {User} = require('../db/models/');
const bcrypt = require('bcrypt');

router.get('/', async (req, res) => {
  res.render('register')
} )


router.post('/', async (req, res) => {
  const {name, mail, pass} = req.body;
  console.log(req.body);
  
  if (name && mail && pass) {
    const userIn = await User.findOne({where: {mail}});
    if (userIn) {
      return res.send(401);
    } else {
      const pas = await bcrypt.hash(pass, 10)
      const userIn = await User.create({...req.body,});
        // req.session.userid = userIn.id;
        // req.session.userName = userIn.name;
        // req.session.userEmail = userIn.mail;
        console.log('hjgfghjgfhgfgh');
        
       res.sendStatus(200)
    }
  }
  return res.send(412);

} )



module.exports = router;
