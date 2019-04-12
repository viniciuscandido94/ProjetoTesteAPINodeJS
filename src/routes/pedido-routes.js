'use strict'

const express = require("express");
const router = express.Router();
const controller = require('../controllers/pedido-controller');
const autenticaoService = require( '../services/autenticacao-service');

router.post('/', autenticaoService.authorize, controller.post);
router.get( '/', autenticaoService.authorize, controller.get);

module.exports = router;
