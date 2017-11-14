/*const express = require('express');
const app = express(); //server-app

var pgp = require('pg-promise')();

var db = pgp('postgres://postgres:root@localhost:5432/todo');

app.get('/', function (req, res) {

    //set headers
    res.set('Access-Control-Allow-Origin', '*');
    res.set("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");

    var sql = 'SELECT * FROM todoview'; //SQL query

    //execute the SQL query
    db.any(sql).then(function(data) {

        res.status(200).json(data); //success – send the data as JSON!

    }).catch(function(err) {
        console.log(err);
        res.status(500).json(err);

    });
});


app.get('/', function (req, res) {

  //set headers
  res.set('Access-Control-Allow-Origin', '*');
  res.set("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");

  //set statusline and body - and send
  res.status(200).send('Hello World!'); //status-line and body

});

app.listen(process.env.PORT || 8080, function () {
  console.log('Server listening on port 8080!');
});*/

const express = require('express');
const app = express(); //server-app

//var pgp = require('pg-promise')();
//var db = pgp('postgres://postgres:root@localhost:5432/todo');



// global for all routes -------------------------
app.use(function(req, res, next) {


    res.set('Access-Control-Allow-Origin', '*');
    res.set("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    next(); //go to the specified route
});

// -----------------------------------------------
//route handling is delegated to:
var todoList = require('./todolist.js');

app.use('/todo/todolist/', todoList);

// USERS
var users = require('./users.js');
app.use('/todo/users/', users);

//------------------------------------------------
app.listen(process.env.PORT || 8080, function () {
  //console.log('Server listening on port 8080!');
});

//slide nr 46 i powerpointen
