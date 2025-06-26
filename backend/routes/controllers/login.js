var express = require('express');
var router = express.Router();

router.post('/', function (req, res) {
    res.json(req.body);
});

module.exports = router;