'use strict';

var express = require('express');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var bodyParser = require("body-parser");
var dns = require('dns');

var cors = require('cors');

var app = express();

// Basic Configuration 
var port = process.env.PORT || 3000;

/** this project needs a db !! **/ 
// mongoose.connect(process.env.MONGOLAB_URI);

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

/** this project needs to parse POST bodies **/
// you should mount the body-parser here

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res){
  res.sendFile(process.cwd() + '/views/index.html');
});

  
// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

var count = 1;
var urls = ["www.freecodecamp.com"];

app.post("/api/shorturl/new", function(req, res){
  if (req.body.url.substring(0,7) == "http://" || req.body.url.substring(0,8) == "https://"){
        urls.push(req.body.url);
        res.json({"original_url":req.body.url,"short_url":count});
        count++;
  }
    res.json({"error":"invalid URL"});
});

app.get("/api/shorturl/:count", function(req,res){
  res.redirect(urls[parseInt(req.params.count)]);
});


app.listen(port, function () {
  console.log('Node.js listening ...');
});