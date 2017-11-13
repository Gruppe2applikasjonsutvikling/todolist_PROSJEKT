/*var express = require('express');
var router = express.Router();
var db = require('./dbconnection'); //database

//endpoint: GET travels -----------------------------
router.get('/', function (req, res) {

    var sql = 'SELECT * FROM todoview';
    db.any(sql).then(function(data) {

        res.status(200).json(data); //success – send the data as JSON!

    }).catch(function(err) {

        res.status(500).json(err);

    });
});

//endpoint: POST travels ----------------------------
router.post('/', function (req, res) {

    var sql = `PREPARE insert_todolist (int, int, text) AS
                INSERT INTO todolist VALUES(DEFAULT, $2, $3); EXECUTE insert_todolist
                (0, 0, 'A new list')`;

    db.any(sql).then(function(data) {

	db.any("DEALLOCATE insert_todolist");
	res.status(200).json({msg: "insert ok"}); //success!

    }).catch(function(err) {

        	res.status(500).json(err);

    });
});


//export module -------------------------------------
module.exports = router;*/

var express = require('express');
var router = express.Router();
var db = require('./dbconnection'); //database
var bodyParser = require('body-parser').text();

//endpoint: POST travels -----------------------------
router.post('/', bodyParser, function (req, res) {

    var upload = JSON.parse(req.body);
    //Note. the uploaded data should also be sanitized for any malicious code, e.g. use the module ‘sanitize-html’

    var sql = `PREPARE insert_todolist (int, int, text) AS
                INSERT INTO todolist VALUES(DEFAULT, $2, $3); EXECUTE insert_todolist
                (0, 0, '${upload.listname}')`;

    db.any(sql).then(function(data) {

        db.any("DEALLOCATE insert_todolist");
        res.status(200).json({msg: "insert ok"}); //success!

    }).catch(function(err) {
        res.status(500).json(err);

    });
});

//endpoint: GET travels -----------------------------
router.get('/', function (req, res) {

    var sql = 'SELECT * FROM todoview';
    db.any(sql).then(function(data) {

        res.status(200).json(data); //success – send the data as JSON!

    }).catch(function(err) {

        res.status(500).json(err);

    });
});

//endpoint: DELETE travels -----------------------------
router.delete('/', function (req, res) {
    var upload = req.query.listid; //uploaded data should be sanitized

    /*var sql = `PREPARE delete_listid (int) AS
            DELETE FROM todolist WHERE id=$1 RETURNING *;
            EXECUTE delete_listid('${upload}')`;*/

    var sql = "DELETE FROM todolist WHERE listid='1' RETURNING *";


    db.any(sql).then(function(data) {
        db.any("DEALLOCATE delete_listid");

        if (data.length > 0) {
            res.status(200).json({msg: "delete ok"}); //success!
        }
        else {
            res.status(200).json({msg: "can't delete"});

        }

    }).catch(function(err) {
        res.status(500).json(err);
    });
});


//export module -------------------------------------
module.exports = router;

