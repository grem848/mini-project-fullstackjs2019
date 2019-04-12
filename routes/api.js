var express = require('express');
var router = express.Router();
var userFacade = require('../facades/userFacade');
var blogFacade = require('../facades/blogFacade');
var loginFacade = require('../facades/loginFacade');
var queryFacade = require('../facades/queryFacade');
var mongoose = require('mongoose');
var colors = require('colors');

/* POST Client Login */
router.post('/login', async function(req, res, next) {
	var { username, password, longitude, latitude, distance } = req.body;
	console.log(username, password, longitude, latitude, distance);
	var friends = await loginFacade.login(username, password, longitude, latitude, distance).catch((err) => {
		throw new Error(err);
	});
	if (friends === null) {
		res.status(403).json({ msg: 'wrong username or password', status: 403 });
	} else {
		var pretty = {
			friends: friends.map((friend) => {
				return {
					firstname: friend.user.firstName,
					username: friend.user.userName,
					latitude: friend.loc.coordinates[1],
					longitude: friend.loc.coordinates[0]
				};
			})
		};
		res.status(200).json(pretty);
	}
});

/* GET users listing. */
router.get('/users', async function(req, res, next) {
	res.json({ users: await userFacade.getAllUsers() });
});

/* GET user by userName */
router.get('/users/username=:userName', async function(req, res, next) {
	var userName = req.params.userName;
	res.json({ users: await userFacade.findByUsername(userName) });
});

/* GET user by id */
router.get('/users/id=:id', async function(req, res, next) {
	var id = req.params.id;
	res.json({ users: await userFacade.findById(id) });
});

/* POST creates user */
router.post('/user/add', async function(req, res, next) {
	var { firstName, lastName, userName, password, email } = req.body;

	var user = await userFacade.addUser(firstName, lastName, userName, password, email);
	res.json(user);
});

/* geoapi from location to username */
router.get('/distanceToUser/:lon/:lat/:username', async function(req, res, next) {
	var { lon, lat, username } = req.params;
	var obj = await queryFacade.getDistanceToUser(lon, lat, username).catch((err) => {
		res.status(404).json({ msg: err.message });
	});
	if (obj !== undefined) {
		res.status(200).json({ distance: obj.distance, to: obj.username });
	}
});

/* GET locationblog listing. */
router.get('/blogs', async function(req, res, next) {
	res.json({ blogs: await blogFacade.getAllLocationBlogs() });
});

/* GET locationblog by id */
router.get('/blogs/id=:id', async function(req, res, next) {
	var id = req.params.id;
	res.json({ blogs: await blogFacade.findById(id) });
});

/* POST Create LocationBlog */
router.post('/blog/add', async function(req, res, next) {
	var { info, pos, author } = req.body;
	var img = req.body.img === undefined ? ' ' : req.body.img;

	var log = await blogFacade.addLocationBlog(info, img, pos, author);
	console.log(log);
	res.json(log);
});

/* POST Like a Blog */
router.post('/blog/like', async function(req, res, next) {
	var { userid, blogid } = req.body;
	var blog = await blogFacade.likeLocationBlog(blogid, userid);
	res.json(blog);
});

router.get('/error', function(req, res, next) {
	// for demonstration
	if (true) {
		//create error object
		var err = new Error('UPPPPPS');
		// setting a new variable in err
		err.isJson = true;
		// can be thrown with --> throw err
		return next(err);
	}
});

module.exports = router;
