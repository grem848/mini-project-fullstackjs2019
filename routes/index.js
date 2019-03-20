var express = require('express');
var router = express.Router();

var apiInfo = {
  title: "Site with a simple users and error API",
  REST_allUsers : "Get all users like this: /api/users",
  REST_UserName : "Get all users like this: /api/users/username=ckw",
  REST_Userid : "Get all users like this: /api/users/id=5c8b9b5319d0bd2494d95e17",
  REST_error : "Get an error like this: /api/error",
}


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', apiInfo });
});

module.exports = router;
