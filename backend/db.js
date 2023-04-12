// const mongoose = require('mongoose');
// const MongoUrl="mongodb://localhost:27017";

// const ConnectToMongo=()=>{
//     console.log(mongoose.connect(MongoUrl));
//     console.log("connected to mongo successfully...")
// }

const mongoose = require('mongoose');

ConnectToMongo().catch(err => console.log(err));

async function ConnectToMongo() {
  await mongoose.connect('mongodb://127.0.0.1:27017/inotebook');
}
module.exports=ConnectToMongo;