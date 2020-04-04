const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const NewsAPI = require('newsapi');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.get('/api', (req, res) => {
  res.render('api', {
    pageTitle: 'Provide API Key',
    pageId: 'apikey',
    apiKey: req.cookies['apiKey']
  });
});

router.post('/checkApi', async (req, res) => {
  if(!req.body.apiKey.trim()) {
    res.cookie('apiKey', '');
    res.cookie('apiVerified', 'false');
    res.json({apiKey: '', apiVerified: 'false', message: 'No key specified.'});
    return;
  };

  const newsapi = new NewsAPI(req.body.apiKey);
  await newsapi.v2.everything({
    q: "demo",
    pageSize: 1
  }).then(result => {
    res.cookie('apiKey', req.body.apiKey);
    res.cookie('apiVerified', 'true');
    result.apiKey = req.body.apiKey;
    result.apiVerified = 'true';
    res.json(result);
  }).catch(error => {
    res.cookie('apiKey', req.body.apiKey);
    res.cookie('apiVerified', 'false');
    error.apiKey = req.body.apiKey;
    error.apiVerified = 'false';
    res.json(error);
  });
});

module.exports = router;