var pgp = require('pg-promise')();

var conn = process.env.DATABASE_URL;
var db = pgp(conn);

//export module
module.exports = db;
