var connect = require("./dbConnect.js");
connect(require("./settings").DEV_DB_URI);

var User = require("./models/User.js");
var LocationBlog = require("./models/LocationBlog.js");
var Position = require("./models/Position.js");
var userFacade = require("./facades/userFacade.js")

function positionCreator(lon, lat, userId, dateInFuture) {
  var posDetail = { user: userId, loc: { coordinates: [lon, lat] } }
  if (dateInFuture) {
    posDetail.created = "2022-09-25T20:40:21.899Z"
  }
  return posDetail;
}

async function likeBlog(blogId, authorId) {
  const p = await LocationBlog.findById(blogId);
  if (p.likedBy.indexOf(authorId) >= 0) {
    throw Error("You have already liked this blog");
  }
  p.likedBy.push(authorId);
  return p.save();
}

async function makeData() {
  console.log("Making users")
  try {
    var userInfos = [
      { firstName: "a", lastName: "a", userName: "a", password: "a", email: "a@a.dk", job: [{ type: "t1", company: "c1", companyUrl: "url" }, { type: "t1", company: "c1", companyUrl: "url" }] },
      { firstName: "b", lastName: "b", userName: "b", password: "a", email: "b@b.dk", job: [{ type: "t1", company: "c1", companyUrl: "url" }] },
      { firstName: "c", lastName: "c", userName: "c", password: "c", email: "c@c.dk", job: [{ type: "t1", company: "c1", companyUrl: "url" }] }
    ];
    await User.deleteMany({});
    await Position.deleteMany({});
    await LocationBlog.deleteMany({})
    //This will not activate the "save" midleware
    var users = await User.insertMany(userInfos);
    var userList = await userFacade.getAllUsers();
    console.log(`${users.length} Users were created`);
    console.log(`Number of users ${userList.length}`);
    console.log("\n-------------------------------------------\n");

    //This will activate the "save" midleware
    var u = new User({ firstName: "Kurt", lastName: "Wonnegut", userName: "ckw", password: "c", email: "kw@c.dk" });
    await u.save();
    var u2 = new User({ firstName: "Jane", lastName: "Wonnegut", userName: "cjw", password: "c", email: "jw@c.dk" });
    await u2.save();
    var u3 = new User({ firstName: "Bo", lastName: "Wonnegut", userName: "cbw", password: "c", email: "bw@c.dk" });
    await u3.save();
    userList = await userFacade.getAllUsers();
    console.log("Friends created");
    console.log(`Number of users ${userList.length}, SAVED`);
    console.log("\n-------------------------------------------\n");

    // add positions to 3 test users above
    var kurt = await userFacade.findByUsername("ckw");
    var jane = await userFacade.findByUsername("cjw");
    var bo = await userFacade.findByUsername("cbw");

    var positions = [
      positionCreator(12.51293635, 55.77066395, jane._id, true),
      positionCreator(12.53932071, 55.76679288, bo._id, true)
    ]
    console.log(`${kurt.firstName}'s ID: ${kurt._id}`);
    console.log(`${jane.firstName}'s ID: ${jane._id}`);
    console.log(`${bo.firstName}'s ID: ${bo._id}`);
    await Position.insertMany(positions);
    console.log("\n-------------------------------------------\n");


    var blogs = [{ info: "Cool Place", pos: { longitude: 26, latitude: 57 }, author: users[0]._id },]
    var blogs = await LocationBlog.insertMany(blogs);
    console.log(`Blog ${blogs[0].info} was created`)
    console.log("\n-------------------------------------------\n");

    //Test the like functionality (move this into a REAL test)
    console.log("Liking blogs")
    var firstBlog = blogs[0];
    await likeBlog(firstBlog._id, users[1]._id);
    await likeBlog(firstBlog._id, users[2]._id);
    try {
      await likeBlog(firstBlog._id, users[1]._id)
      console.log("This is bad, a user liked something twice")
    }
    catch (err) {
      console.log("Shame on you !!!" + err)
    }
    console.log("\n-------------------------------------------\n");

    //Find the blog with likes
    var blog = await LocationBlog.findById(firstBlog._id);
    console.log(`This blog should have two likes: ${blog.likedByCount}`);


  } catch (err) {
    console.log(err);
  }
}
makeData();
