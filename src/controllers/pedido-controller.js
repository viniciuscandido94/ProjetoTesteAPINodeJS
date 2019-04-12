'use strict';

const repository = require('../repositores/pedido-repository');
const guid = require('guid');
const autenticaoService = require( '../services/autenticacao-service');

exports.post = async(req, res, next) => {
   try {
       var token = /*req.body.token || req.query.token ||*/ req.headers['token-autorizacao'];
       var dados = await autenticaoService.decodeToken(token);

       await repository.create({
           cliente: dados._id,
           numero: guid.raw().substring(0, 6),
           itens: req.body.itens
       });
       res.status(201).send({ message:'Pedido cadastrado com sucesso!' });
   } catch(e) {
       res.status(500).send({ message:'Cadastro de cliente falhou!' });
   }
};

exports.get = async(req, res, next) => {
    try {
        var dados = await repository.get();
        res.status(200).send(dados);
    } catch(e) {
        res.status(500).send( { message:'Processo falhou!' } );
    }
};
