var express = require('express');
var router = express.Router();
var axios = require('axios')

//API and routing for the App
//This route renders the home page
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Expresss' });
});

//this API returns the diffrent stock exchange markets globally
router.get('/stockExchanges', function(req, res, next) {
  axios.get('https://finnhub.io/api/v1/stock/exchange?token=bqekfqvrh5rashj90l5g').then(r => {
    res.json(r.data)
  })
});

//this API returns the profile for a given stock
router.get('/profile/:id', function(req, res, next) {
  console.log(req.params.id)
  axios.get("https://financialmodelingprep.com/api/v3/company/profile/" + req.params.id).then(r => {
    console.log(r.data)
    res.json(r.data)
  })
});

// this API returns the given stock data based on stock code
router.get('/exchange/:id', function(req, res, next) {
  axios.get("https://finnhub.io/api/v1/stock/symbol?exchange=" + req.params.id + "&token=bqekfqvrh5rashj90l5g").then(r => {
    res.json(r.data)
  })
});

module.exports = router;
