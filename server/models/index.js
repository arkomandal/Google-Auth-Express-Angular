'use strict';
var fs = require('fs');
var path = require('path');
var mongoose = require("mongoose");
var basename = path.basename(module.filename);
var db = {};

// mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost:27017/google_auth",
    { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => {
        console.log("connected to database");
    })
    .catch(() => {
        console.log("error connecting to database");
    });

fs.readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
        db[file.split('.')[0]] = require(path.join(__dirname, file));
    });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.ObjectId = mongoose.Types.ObjectId;

module.exports = db;