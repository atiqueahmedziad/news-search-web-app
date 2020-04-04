var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  let verify = req.cookies['apiVerified'];
  if(verify === 'false' || verify === undefined) {
    res.redirect('/api');
    return;
  }

  res.render('index', {
    pageTitle: 'Home',
    pageId: 'home'
  });
});

module.exports = router;