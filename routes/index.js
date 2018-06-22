var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', navType:'trans' , styles:[{src:'home.css'}] , scripts:'' });
});

router.get('/hire-someone', function(req, res, next) {
  res.render('hire-someone', { title: 'Express', navType:'trans' , styles:[{src:'home.css'}] });
});
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'Express', navType:'trans' , styles:[{src:'about.css'}]  });
});
router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Express' , styles:[{src:'contact.css'}] });
});
router.get('/terms-of-use', function(req, res, next) {
  res.render('terms-of-use', { title: 'Express', styles:[{src:'home.css'}]  });
});
router.get('/privacy-policy', function(req, res, next) {
  res.render('privacy-policy', { title: 'Express', styles:[{src:'home.css'}]  });
});
router.get('/signup/candidate', function(req, res, next) {
  res.render('signup-candidate', { title: 'Express' ,  navType:'trans' , styles:[{src:'auth.css'}] });
});
router.get('/signup/company', function(req, res, next) {
  res.render('signup-company', { title: 'Express' ,  navType:'trans', styles:[{src:'auth.css'}] });
});
router.get('/user/login', function(req, res, next) {
  res.render('user-login', { title: 'Express' ,  navType:'trans', styles:[{src:'auth.css'}] });
});
router.get('/company/login', function(req, res, next) {
  res.render('company-login', { title: 'Express' ,  navType:'trans', styles:[{src:'auth.css'}] });
});

router.get('/user/forgot', function(req, res, next) {
  res.render('user-forgot', { title: 'Express', styles:[{src:'auth.css'}] });
});

router.get('/company/forgot', function(req, res, next) {
  res.render('company-forgot', { title: 'Express', styles:[{src:'auth.css'}]});
});
module.exports = router;
