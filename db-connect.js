const mongoose = require('mongoose');
const MONGO_HOST = process.env.MONGO_HOST || "127.0.0.1:27017";
const DB = process.env.DB || "node-task"

let mongoUrl = `mongodb://${MONGO_HOST}/${DB}`;

const connect = mongoose.connect(mongoUrl);
connect.then(res => {
    console.log('Database connected');
}).catch(err => {
    console.log(err, "Database not connected")
})
