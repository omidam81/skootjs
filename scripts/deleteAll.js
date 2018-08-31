const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017/scoot3';
const option = {
  connectTimeoutMS: 60000,
  keepAlive: true,
  reconnectTries: 30000
};

MongoClient.connect(
  url,
  option,
  async function(err, db) {
    console.log('Connected correctly to server');
    await db
      .collection('Business')
      .deleteMany({ _id: /^b.*/i, isDeleted: { $exists: true } });
    await db
      .collection('Candidate')
      .deleteMany({ _id: /.*cand$/i, isDeleted: { $exists: true } });
    await db
      .collection('Company')
      .deleteMany({ _id: /.*comp$/i, isDeleted: { $exists: true } });
    await db
      .collection('Job')
      .deleteMany({ _id: /.*job$/i, isDeleted: { $exists: true } });
  }
);
