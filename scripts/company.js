var needtoChanges = [{c: "Business",f: "companyId"},
{c: "CompanyPackage", f: "companyId"},
{c: "InteractionLog", f: "companyId"},
{c: "Job", f: "companyId"},
{c: "Message", f: "companyId"},
{c: "Interview", f: "companyId"}];

//"37comp"
//db.Job.remove({isDouplicated : true});
db.Company.find({ "_id": /.*comp/i , "status": { $ne: "deleted_0" } }).forEach(function(x){
  	print(x._id);
	var xc = x._id;
	var newDocument = x;
	delete newDocument._id;
	newDocument.isDouplicated = true;
	newDocument.old_id = xc;
	db.Company.insert(newDocument);
	var newId = db.Job.findOne({old_id : xc})._id;
	for(var item in needtoChanges){
		db.getCollection(needtoChanges[item].c).updateMany({companyId: xc}, {$set: {companyId: newId}}); 
	}
});

db.Company.updateMany({ "_id": /.*comp/i }, {$set: {status: 'deleted_0' }});
