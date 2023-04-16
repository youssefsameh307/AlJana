var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  return res.status(C.Status.OK).json({ message: "ok"});
});



module.exports = router;
