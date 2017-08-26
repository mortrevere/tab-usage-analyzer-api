var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var config = require("../config.js");

var sequelize = new Sequelize('usr', 'db', 'pw', {
  host : config.db.host,
  dialect : 'postgres',
  logging : config.db.logging,
  pool : config.db.pool,
  define : {
    hooks : {
      beforeFind: function (options) {
        /*if(options.attributes === undefined)
          options.attributes = {};*/
        //options.attributes.exclude = ['createdAt', 'updatedAt', 'password'];
        return options;
      }
    }
  }
});

var db = {};

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf(".") !== 0) && (file !== "index.js");
  })
  .forEach(function(file) {
    process.stdout.write("[OBJECT MODEL] Loading " + file + "...");
    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
    console.log('done');
  });

console.log('[OK] : ', Object.keys(db));

Object.keys(db).forEach(function(modelName) {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
