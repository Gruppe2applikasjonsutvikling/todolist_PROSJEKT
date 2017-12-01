var pgp = require('pg-promise')();

//var conn = process.env.DATABASE_URL || 'postgres://ntxeexlcakmkoj:9fcfbeeffa25c5a07597266f4360760afa698d0c375126e24e604cc28f63566f@ec2-54-247-120-234.eu-west-1.compute.amazonaws.com:5432/d2iiuk9rlksah0?ssl=true';
var conn = process.env.DATABASE_URL;
var db = pgp(conn);

//export module
module.exports = db;
