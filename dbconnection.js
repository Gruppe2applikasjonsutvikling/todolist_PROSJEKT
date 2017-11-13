var pgp = require('pg-promise')();

//db connect string
var conn = process.env.DATABASE_URL || 'postgres://postgres:root@localhost:5432/todo';
var db = pgp(conn);

//export module
module.exports = db;
