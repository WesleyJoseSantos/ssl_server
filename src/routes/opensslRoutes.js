var express = require('express');
var router = express.Router();
var opensslController = require('../controllers/OpenSslController');

router.get('/cakey', opensslController.getCAkey);
router.get('/cacert', opensslController.getCAcert);
router.get('/key', opensslController.getKey);
router.get('/cert', opensslController.getCert);
router.get('/sign', opensslController.getSign);

module.exports = router;