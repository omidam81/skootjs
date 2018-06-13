var needtoChanges = [{c: "CandidateJobSeenBy",f: "jobId"},
{c: "CandidateJobShortlist", f: "jobId"},
{c: "CompanyPackage", f: "jobId"},
{c: "Complain", f: "jobId"},
{c: "InteractionLog", f: "jobId"},
{c: "Interview", f: "jobId"},
{c: "JobApplication", f: "jobId"},
{c: "JobLanguage", f: "jobId"},
{c: "JobSkill", f: "jobId"},
{c: "Match", f: "jobId"},
{c: "Message", f: "jobId"},
{c: "RelatedJob", f: "jobId"},
{c: "TypeOfEmploymentJob", f: "jobId"},
{c: "jobApplicatinnew", f: "jobId"}];

//db.Job.remove({isDouplicated : true});
db.Job.find({ "_id": /.*job$/i , "status": { $ne: "deleted_0" } }).forEach(function(x){
  	print(x._id);
	var xc = x._id;
	var newDocument = x;
	delete newDocument._id;
	newDocument.isDouplicated = true;
	newDocument.old_id = xc;
	//db.Job.insert(newDocument);
	var newId = db.Job.findOne({old_id : xc})._id;
	for(var item in needtoChanges){
		db.getCollection(needtoChanges[item].c).updateMany({jobId: xc}, {$set: {jobId: newId}}); 
	}
});

db.Job.updateMany({ "_id": /.*job$/i }, {$set: {status: 'deleted_0' }});