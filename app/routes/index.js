const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const verify = req.cookies['apiVerified'];
  if(verify === 'false' || verify === undefined) {
    res.redirect('/api');
    return;
  }

  res.render('index', {
    pageTitle: 'Search for news',
    pageId: 'search-for-news'
  });
});

module.exports = router;