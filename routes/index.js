var express = require('express');
var router = express.Router();

var apiInfo = {
  title: "Site with a simple users and error API",
  howToUse : "Get all users like this: /api/users or /api/error"
}


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', apiInfo });
});

module.exports = router;
