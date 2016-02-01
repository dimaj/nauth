'use strict';

var express = require('express');
var controller = require('./account.controller');

var router = express.Router();

router.get('/', controller.index);
router.post('/', controller.create);
router.delete('/:id', controller.destroy);
router.get('/qrcode/:id', controller.qrCode);

module.exports = router;
