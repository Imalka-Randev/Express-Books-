const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://imalkarandevinfo_db_user:2002ExpressBook0318@exprebook-awsinmucluste.tr95tlq.mongodb.net/?appName=ExpreBook-AWSInMuCluster').then(() => {
  return mongoose.connection.db.collection('users').updateMany({}, { $set: { purchasedBooks: [], rentedBooks: [] } });
}).then(res => {
  console.log(res);
  process.exit(0);
});
