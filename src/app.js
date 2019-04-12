'use strict'

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const config = require('./config')

const app = express();
const router = express.Router();

//CONECTA BANCO
mongoose.connect(config.connectionString);

//CARREGA MODELS
const Produto = require('./models/produto');
const Cliente = require('./models/cliente');
const Pedido = require('./models/pedido');

//CARREGA ROTAS
const clienteRoute = require('./routes/cliente-routes')
const produtoRoute = require('./routes/produto-routes');
const pedidoRoute = require('./routes/pedido-routes');

app.use(bodyParser.json({
    limit: '5mb' // TAMANHO MAXIMO DO JSON
}));

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*'); // QUAIS URLS PODERÃO CONECTAR '*' = TODAS.
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, token-autorizacao');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

app.use('/produto', produtoRoute);
app.use('/cliente', clienteRoute);
app.use('/pedido', pedidoRoute);

module.exports = app;
