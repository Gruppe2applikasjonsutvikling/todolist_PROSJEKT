

const express = require('express');
const app = express(); //server-app

app.use(express.static(__dirname + '/public'));

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

// List items
var listitem = require('./listitem.js');
app.use('/todo/listitem/', listitem);


//------------------------------------------------
app.listen(process.env.PORT || 8080, function () {
  console.log('Server listening on port 8080!');
});

//slide nr 46 i powerpointen
