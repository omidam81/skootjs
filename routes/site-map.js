var express = require('express');
var router = express.Router();
const paginate = require('express-paginate');
const Job = require('../models/job');
const Business = require('../models/business');


router.get("/in/:city", function(req, res, next){
    res.send("jobs in " +  req.params.city);
});

router.get("/", function(req, res, next){
    res.send("view jobs");
});
module.exports = router;