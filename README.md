# Guide

- npm run dev
- npm run test


# Installation
- create file called settings.js in root of the project
- add below code and replace the DB URI's with MongoDB connections strings
- npm install


```javascript
const DEV_DB_URI = "xxx";
const TEST_DB_URI = "xxx";
const MOCHA_TEST_TIMEOUT = 5000;

module.exports = {
 DEV_DB_URI,
 TEST_DB_URI,
 MOCHA_TEST_TIMEOUT
}
```

- node makeData.js
- npm start //running on port 3000

