var express = require('express');
var router = express.Router();
const paginate = require('express-paginate');


const Job = require('../models/job');

const Business = require('../models/business');

function parseParams(q) {
    return { status: 'live' };
}
/* GET home page. */
router.get('/jobs/:q*?', function(req, res, next) {

    var query = parseParams(req.params.q);
    
    try {

        Promise.all([
            Job.find(query).select({ businessId: 1, title: 1, description: 1, typeOfSalary: 1, salaryFrom: 1, salaryTo: 1, location: 1, adddress: 1, informalAddress: 1 }).limit(req.query.limit)
            .populate({
                path: 'businessId',
                populate: { // 2nd level subdoc (get users in comments)
                    path: "companyId",
                }
            })
            .skip(req.skip).lean().exec(),
            Job.count(query)
        ]).then(function(result) {

            const itemCount = result[1];
            const jobs = result[0];
            pagination = {
                current : 1
            };

            const pageCount = Math.ceil(itemCount / req.query.limit);
            res.render('jobs', {
                jobs: jobs,
                pageCount,
                itemCount,
                pagination,
                pages: paginate.getArrayPages(req)(3, pageCount, req.query.page),
                styles:[{src:'jobs.css'}]
            });
        });
    } catch (err) {
        next(err);
    }


});

// router.get('/job/:id?*/:title', function(req, res, next) {
//     res.render('jobs', { title: "job view pages" });
// });

router.get('/job', function(req, res, next) {
    res.render('job', { title: "job view pages", styles:[{src:'jobs.css'}] });
});

router.get('/culture', function(req, res, next) {
    res.render('culture', { title: "culture", styles:[{src:'jobs.css'}] });

});



module.exports = router;