var needtoChanges = [{c: "Complain",f: "businessId"}, {c: "Job", f: "businessId"}];
db.Business.remove({isDouplicated : true});

db.Business.find({ "_id": /^b.*/i }).forEach(function(x) {
    var xc = x._id;
    print(xc);
    var newDocument = x;
    delete newDocument._id;
    newDocument.isDouplicated = true;
    newDocument.old_id = xc;
    db.Business.insert(newDocument);
    var newId = db.Business.findOne({ old_id: xc })._id;
    for (var item in needtoChanges) {
        db.getCollection(needtoChanges[item].c).updateMany({ businessId: xc }, { $set: { businessId: newId } });
    }
});

db.Business.updateMany({ "_id": /^b.*/i }, {$set: {status: 'deleted_0' }});