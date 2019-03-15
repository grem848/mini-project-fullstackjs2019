npm install & create file called settings.js in root of the project
and add dev and test mongoDB connection string


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

