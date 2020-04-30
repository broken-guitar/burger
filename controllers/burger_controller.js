
// dependancies
var express = require('express');
var router = express.Router();

// import burger model
var burger = require('../models/burger.js');

// route to get SELECT all burgers and render main page
router.get('/', function(req, res) {
  burger.selectAll(function(result) {
    var hbsObject = {
      burgers: result
    };
    res.render('index', hbsObject);
  });
});

// route to INSERT a burger 
router.post('/burgers', function(req, res) {
  burger.insertOne([
    'burger_name'         // column name for INSERT command
  ], [
    req.body.burger_name  // VALUES for INSERT command
  ], function(result) {
    res.redirect('/');
  });
});

// route to UPDATE the burger as devoured
router.post('/burgers/:id', function(req, res) {
  var condition = 'id = ' + req.params.id; // condition for WHERE command

  burger.updateOne({
    devoured: true    // object containing key/value pair for SET command
  }, condition, function(result) {
    res.redirect('/');
  });
});

// Export routes for server.js to use.
module.exports = router;
