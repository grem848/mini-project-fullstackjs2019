var express = require('express');
var router = express.Router();

/*
  Add GraphQL Description
 */

var apiInfo = {
	title: "Site with two simple API's",
	REST_allUsers: 'Get all users like this: /api/users ',
	REST_userName: 'Get a user from username like this: /api/users/username ',
	REST_userid: 'Get a user from id like this: /api/users/userid',
	REST_allBlogs: 'Get all blogs like this: /api/blogs ',
	REST_blogid: 'Get a blog from id like this: /api/blogs/blogid',
	REST_login:
		'Login and see users friends like this: /api/login and send a user like this(postman): {"username": "b","password": "a","latitude":3, "longitude": 5,"distance" : 3}',
	error: 'Get an error like this: /api/error ',
	GEO_distanceToUser:
		'Get distance to user in meters from username like this: /geoapi/distanceToUser/lon/lat/username ',
	GEO_isUserInArea: 'Get true or false if a user is in an area like this: /geoapi/userInArea/areaname/username '
};

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express', apiInfo });
});

module.exports = router;
