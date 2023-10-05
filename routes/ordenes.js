const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require("multer");
const { check, validationResult, body } = require('express-validator');

const ordenesController = require('../controllers/ordenesController.js');

/** Ordenes de compra **/

router.post('/ordenes/procesarCompra',  ordenesController.saveNew);


module.exports = router;