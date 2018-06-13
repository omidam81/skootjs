var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/hire-someone', function(req, res, next) {
  res.render('hire-someone', { title: 'Express' });
});

module.exports = router;
