'use strict'

const express = require("express");
const router = express.Router();
const controller = require('../controllers/cliente-controller');
const autenticaoService = require('../services/autenticacao-service');

router.post('/', controller.post);
router.post('/autenticacao', controller.autenticacao);
router.post('/refresh-token', autenticaoService.authorize, controller.atualizaToken);
router.get( '/', controller.get);
router.get( '/:id', controller.getById);

module.exports = router;
