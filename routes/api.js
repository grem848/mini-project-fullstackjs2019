var express = require('express');
var router = express.Router();
var userFacade = require('../facades/userFacade')

/* GET users listing. */
router.get('/users', async function (req, res, next) {
  users = await userFacade.getAllUsers();

  res.json({ users })
});

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