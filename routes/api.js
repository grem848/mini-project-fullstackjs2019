var express = require('express');
var router = express.Router();
var userFacade = require('../facades/userFacade')
var blogFacade = require('../facades/blogFacade')
var mongoose = require('mongoose');


/* GET users listing. */
router.get('/users', async function (req, res, next) {
  res.json({ users : await userFacade.getAllUsers()});
});

/* GET user by userName */
router.get('/users/username=:userName', async function (req, res, next) {
  var userName = req.params.userName;
  res.json({ users : await userFacade.findByUsername(userName)});
});

/* GET user by id */
router.get('/users/id=:id', async function (req, res, next) {
  var id = req.params.id;
  res.json({ users : await userFacade.findById(id)});
});

/* POST creates user */
router.post('/user/add', async function( req, res, next){
  var body = req.body;
  var firstname = body.firstname;
  var lastname = body.lastname;
  var username = body.username;
  var password = body.password;
  var email = body.email;

  var user = await userFacade.addUser(firstname,lastname,username,password, email)
  res.json(user);
})

/* GET locationblog listing. */
router.get('/blogs', async function (req, res, next) {
  res.json({ blogs : await blogFacade.getAllLocationBlogs()});
});

/* GET locationblog by id */
router.get('/blogs/id=:id', async function (req, res, next) {
  var id = req.params.id;
  res.json({ blogs : await blogFacade.findById(id)});
});

/* POST Create LocationBlog */
router.post('/blog/add', async function(req, res, next){
  var info = req.body.info;
  var img = req.body.img === undefined ? " " : req.body.img;
  var pos = req.body.pos;
  var author = req.body.author;

  var log = await blogFacade.addLocationBlog(info, img, pos, author);
  console.log(log)
  res.json(log);
  
})

/* POST Like a Blog */
router.post('/blog/like', async function(req, res, next){
  var userid = req.body.userid;
  var blogid = req.body.blogid;

  var blog = await blogFacade.likeLocationBlog(blogid, userid);
  res.json(blog);
})


router.get('/error', function (req, res, next) {
  // for demonstration
  if (true) {
    //create error object 
    var err = new Error("UPPPPPS");
    // setting a new variable in err
    err.isJson = true;
    // can be thrown with --> throw err
    return next(err);
  }
});

module.exports = router;