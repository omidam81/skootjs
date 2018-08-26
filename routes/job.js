var express = require('express');
var router = express.Router();
const paginate = require('express-paginate');


const Job = require('../models/job');

const Business = require('../models/business');

function makeQuery(q) {
    var x = { status: 'live' };

    if (q.keyword && q.keyword.length > 0) {
        var keys = q.keyword.split(" ");
        var search= "";
        //var re = new RegExp(q.keyword, "i");
        search = q.keyword;
        if (q.keyword.indexOf(' ') != -1) {
            search = "";
            var words = q.keyword.split(" ");
            for (var i = 0; i < words.length; i++) {
                search += "(?=.*" + words[i] + ")";
            }
        }
        x.keywords = { $regex:  new RegExp(search, "i")};
    }
    return x;
}

function getParams() {
    return [];
}

function doSearch(req, res, params) {
    if (!params || params.length == 0) {
        params = getParams(req);
    }
    var query = makeQuery(params);
    try {

        Promise.all([
            Job.find(query).
                select({ businessId: 1, 
                    title: 1, 
                    description: 1, 
                    typeOfSalary: 1, 
                    salaryFrom: 1, 
                    salaryTo: 1, 
                    location: 1, 
                    adddress: 1, 
                    informalAddress: 1 })
                .limit(req.query.limit)
                .populate({
                    path: 'businessId',
                    populate: { // 2nd level subdoc (get users in comments)
                        path: "companyId",
                    }
                })
                .skip(req.skip).lean().exec(),
            Job.count(query)
        ]).then(function (result) {

            const itemCount = result[1];
            const jobs = result[0];
            pagination = {
                current: parseInt(req.query.page)
            };

            const pageCount = Math.ceil(itemCount / req.query.limit);
            res.render('jobs', {
                jobs: jobs,
                params: params,
                pageCount,
                itemCount,
                pagination,
                pages: paginate.getArrayPages(req)(5, pageCount, req.query.page),
                styles: [{ src: 'jobs.css' }],
                scripts: [{ src: 'jobs.js' }]
            });
        });
    } catch (err) {
        next(err);
    }

}
/* GET home page. */
router.get('/jobs/:q*?', function (req, res, next) {
    doSearch(req, res);
});



// router.get('/job/:id?*/:title', function(req, res, next) {
//     res.render('jobs', { title: "job view pages" });
// });

function showJob(req, res) {
    Job.findOne({ _id: req.params.id }).populate({
        path: 'businessId',
        populate: { // 2nd level subdoc (get users in comments)
            path: "companyId",
        }
    }).then(function (job) {
        res.render('job', {
            title: "job view pages",
            job: job,
            styles: [{ src: 'jobs.css' }]
        });
    });
}
router.get('/job/:id/:title', function (req, res, next) {
    showJob(req, res);
})
router.get('/job', function (req, res, next) {
    res.render('job', { title: "job view pages", styles: [{ src: 'jobs.css' }] });
});

router.get('/culture', function (req, res, next) {
    res.render('culture', { title: "culture", styles: [{ src: 'jobs.css' }] });

});

router.get('/search', function (req, res, next) {
    var params = { location: req.query["location"], keyword: req.query["keyword"] };
    doSearch(req, res, params);
})



module.exports = router;