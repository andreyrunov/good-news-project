const router = require('express').Router();






router.get('/',  (req, res) => {
  console.log('hjgjh');
  
  req.session.destroy();
  res.clearCookie('sessionID');
  res.locals.destroy();
  res.status(200).json({ message: 'Вы успешно вышли' });
})

module.exports = router;
