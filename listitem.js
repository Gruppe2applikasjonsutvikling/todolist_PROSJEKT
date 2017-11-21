var express = require('express');
var router = express.Router();
var db = require('./dbconnection'); //database
var bodyParser = require('body-parser').text();

//tolkens

var jwt = require("jsonwebtoken");

var secret = "frenchfriestastegood!"; //used to check the token
var logindata; //logindata from the token


//Authorize all travel-endpoints --------------------
router.use(function (req, res, next) {

    //get the token from the URL-variable named 'token'
    var token = req.query['token'];

    if (!token) {
        res.status(403).json({msg: "No token received"}); //send
        return; //quit
    }
    else {
        try {
          logindata = jwt.verify(token, secret); //check the token
        }
        catch(err) {
          res.status(403).json({msg: "The token is not valid!"}); //send
          return; //quit
        }
    }

    next(); //we have a valid token - go to the requested endpoint
});



//endpoint: POST travels -----------------------------
router.post('/', bodyParser, function (req, res) {

    console.log("post-funksjonen");

    var upload = JSON.parse(req.body);
    //Note. the uploaded data should also be sanitized for any malicious code, e.g. use the module ‘sanitize-html’

    /*var sql = `PREPARE insert_todolist (int, int, text) AS
                INSERT INTO todolist VALUES(DEFAULT, $2, $3); EXECUTE insert_todolist
                (0, 0, '${upload.listname}')`;*/

    var sql = `PREPARE insert_listitem (int, int, text, date, text) AS
                INSERT INTO listitem VALUES(DEFAULT, $2, $3, $4, $5);
		  EXECUTE insert_listitem (0, '${upload.listid}', '${upload.itemname}',  '${upload.itemdeadl}', '${upload.itemtag}')`;
    console.log(sql);



    db.any(sql).then(function(data) {

        db.any("DEALLOCATE insert_listitem");
        res.status(200).json({msg: "insert ok"}); //success!

    }).catch(function(err) {
        res.status(500).json(err);
        console.log("her fikk du en error!");

    });

});

//endpoint: GET travels -----------------------------
router.get('/', function (req, res) {


    console.log("test");
    var sql = 'SELECT * FROM listitemview';

    /*var sql = `PREPARE get_listitem (text) AS
            SELECT * FROM listitemview WHERE loginname=$1;
            EXECUTE get_listitem('${logindata.loginname}')`;
    */
    console.log(sql);



    db.any(sql).then(function(data) {

        res.status(200).json(data); //success – send the data as JSON!

    }).catch(function(err) {

        res.status(500).json(err);

    });
});

//endpoint: DELETE travels -----------------------------
//router.delete('/', function (req, res) {
    //var upload = req.query.listid; //uploaded data should be sanitized

    /*var sql = `PREPARE delete_listid (int) AS
            DELETE FROM todolist WHERE id=$1 RETURNING *;
            EXECUTE delete_listid('${upload}')`;*/

    //var sql = "DELETE FROM todolist WHERE listid='1' RETURNING *";

   /* var sql = `PREPARE delete_todolist (int, text) AS
            DELETE FROM todolist WHERE listid=$1 AND loginname=$2 RETURNING *;
            EXECUTE delete_todolist('${upload}', '${logindata.loginname}')`;
*/
/*
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
*/

//export module -------------------------------------
module.exports = router;

