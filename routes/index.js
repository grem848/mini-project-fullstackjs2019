var express = require('express');
var router = express.Router();

var apiInfo = {
  title: "Site with a simple API for users & blog and an error",
  REST_allUsers : "Get all users like this: /api/users",
  REST_userName : "Get a user from username like this: /api/users/username=ckw",
  REST_userid : "Get a user from id like this: /api/users/id=5c8b9b5319d0bd2494d95e17",
  REST_allBlogs : "Get all blogs like this: /api/blogs",
  REST_blogid : "Get a blog from id like this: /api/blogs/id=5c8b9b5319d0bd2494d95e1a",
  REST_login : 'Login and see users friends like this: /api/login and send a user like this(postman): {"username": "b","password": "a","latitude":3, "longitude": 5,"distance" : 3}',
  REST_error : "Get an error like this: /api/error",
}


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', apiInfo });
});

module.exports = router;
