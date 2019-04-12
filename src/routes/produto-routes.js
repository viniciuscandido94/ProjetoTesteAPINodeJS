'use strict'

const express = require("express");
const router = express.Router();
const controller = require('../controllers/produto-controller');
const autenticaoService = require('../services/autenticacao-service');

router.get( '/', controller.get);
router.get( '/:slug', controller.getBySlug);
router.get( '/admin/:id', controller.getById);
router.get( '/tags/:tag', controller.getByTags);
router.post('/', autenticaoService.isAdmin, controller.post);
router.put('/:id', autenticaoService.isAdmin, controller.put);
router.delete('/', autenticaoService.isAdmin, controller.delete);

module.exports = router;
