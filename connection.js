const mongoose = require("mongoose");

async function connectMongoDb(url) {
    //mongoose connection
    return mongoose.connect(url);
}
module.exports={connectMongoDb}