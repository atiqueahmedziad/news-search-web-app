const express = require('express');
const router = express.Router();
const NewsAPI = require('newsapi');

router.get('/search/all', async (req, res) => {
  const verify = req.cookies['apiVerified'];
  if(verify === 'false' || verify === undefined) {
    res.redirect('/api');
    return;
  }

  const newsapi = new NewsAPI(req.cookies['apiKey']);

  let requestObject = {};

  if(req.query.search_radio === 'q'){
    requestObject.q = req.query.q;
  } else {
    requestObject.qInTitle = req.query.q;
  }

  let from, to;
  if(!req.query.from && !req.query.from){
    from = '';
    to = '';
  } else {
    from = new Date(req.query.from);
    to = new Date(req.query.to);
  }

  requestObject.language = req.query.lang;
  requestObject.from =  from;
  requestObject.to = to;
  requestObject.sources = req.query.sources;
  requestObject.sortBy = req.query.sort_by;
  requestObject.pageSize = req.query.page_size;

  Object.keys(requestObject)
  .forEach(k => (!requestObject[k] && requestObject[k] !== undefined) && delete requestObject[k]);

  let getAllNews = await newsapi.v2.everything(requestObject).then(result => {
    return result;
  }).catch(error => {
    console.log(error);
    return;
  });

  res.render('search', {
    pageTitle: 'Search for all news',
    pageId: 'search',
    content: getAllNews,
    requests: requestObject
  });
});

router.get('/search/top', async (req, res) => {
  const verify = req.cookies['apiVerified'];
  if(verify === 'false' || verify === undefined) {
    res.redirect('/api');
    return;
  }

  const newsapi = new NewsAPI(req.cookies['apiKey']);

  let requestObject = {};

  requestObject.q = req.query.q,
  requestObject.sources = req.query.sources;
  requestObject.country = req.query.country;
  requestObject.category = req.query.category;
  requestObject.pageSize = req.query.pageSize;

  Object.keys(requestObject)
  .forEach(key => (!requestObject[key] && requestObject[key] !== undefined) && delete requestObject[key]);

  let getTopNews = await newsapi.v2.topHeadlines(requestObject).then(result => {
    return result;
  }).catch(error => {
    console.log(error);
    return;
  });

  res.render('search', {
    pageTitle: 'Search for Top News',
    pageId: 'search',
    content: getTopNews,
    requests: requestObject
  });
});

module.exports = router;