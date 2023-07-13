const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://ouailbus:lOzvu1eCEpX2CdaK@cluster0.no12417.mongodb.net/", {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("Safe a Ouael Rah T Connecta Cloud Mongoodb m3a node")
});