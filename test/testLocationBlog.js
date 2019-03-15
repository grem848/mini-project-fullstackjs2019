const mongoose = require("mongoose");
const expect = require("chai").expect;
var connect = require("../dbConnect.js");


//See (for the three lines below): https://github.com/Automattic/mongoose/issues/1251
mongoose.models = {};
mongoose.modelSchemas = {};
mongoose.connection = {};

var blogFacade = require("../facades/blogFacade");
var userFacade = require("../facades/userFacade");
var LocationBlog = require("../models/LocationBlog");

describe("Testing the LocationBlog Facade", function () {

    /* Connect to the TEST-DATABASE */
    before(async function () {
        //this.timeout(require("../settings").MOCHA_TEST_TIMEOUT);
        await connect(require("../settings").TEST_DB_URI);
    })

    after(async function () {
        await mongoose.disconnect();
    })

    var locationBlogs = [];
    var users = [];
    /* Setup the database in a known state (2 users) BEFORE EACH test */
    beforeEach(async function () {
        await LocationBlog.deleteMany({});
        users = await userFacade.getAllUsers();
        locationBlogs = await LocationBlog.insertMany([
            { info: "Cool Place1", img: "img.png", pos: { longitude: 26, latitude: 57 }, author: users[0]._id },
            { info: "Cool Place2", img: "img.png", pos: { longitude: 26, latitude: 57 }, author: users[0]._id }
        ]);
    })

    it("Should find all locationblogs (Cool Place1 & Cool Place2)", async function () {
        var locationBlogs = await blogFacade.getAllLocationBlogs();
        expect(locationBlogs.length).to.be.equal(2);
    });

    it("Should Find Cool Place1 by ID", async function () {
        var locationBlog = await blogFacade.findById(locationBlogs[0]._id);
        expect(locationBlog.info).to.be.equal("Cool Place1");
    });

    it("Should add Cool Place3", async function () {
        var locationBlog = await blogFacade.addLocationBlog("Cool Place3", "img.png", {longitude: 11, latitude: 12}, users[1]._id);
        expect(locationBlog).to.not.be.null;
        expect(locationBlog.info).to.be.equal("Cool Place3");
        var locationBlogs = await blogFacade.getAllLocationBlogs();
        expect(locationBlogs.length).to.be.equal(3);
    });

})