'use strict';

const ValidationContract = require('../validators/validators');
const repository = require('../repositores/produto-repository');

exports.post = async(req, res, next) => {

   var contract = new ValidationContract();
   contract.hasMinLen(req.body.titulo, 3, 'O titulo tem que ter mais 3 caracteres');
   contract.hasMinLen(req.body.slug, 3, 'O slug tem que ter mais 3 caracteres');
   contract.hasMinLen(req.body.descricao, 3, 'A descricao tem que ter mais 3 caracteres');

   if (!contract.isValid()){
       res.status(400).send(contract.errors()).end();
   }

   try {
       await repository.create(req.body);
       res.status(201).send({ message:'Produto salvo' });
   } catch(e) {
       res.status(500).send({ message:'Processo falhou!' });
   }
};

exports.put = async(req, res, next) => {
    try {
        await repository.atualiza(req.params.id, req.body);
        res.status(201).send({ message: 'Produto atualizado!' });
    } catch(e) {
        res.status(500).send({ message:'Processo falhou!' });
    }
};

exports.delete = async(req, res, next) => {
    try {
        await repository.delete(req.body.id);
        res.status(201).send({ message: 'Excluido atualizado!' });
    } catch(e) {
        res.status(500).send( { message:'Processo falhou!' } );
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

exports.getBySlug = async(req, res, next) => {
    try {
        var dados = await repository.getBySlug(req.params.slug);
        res.status(200).send(dados);
    } catch(e) {
        res.status(500).send( { message:'Processo falhou!' } );
    }
};

exports.getById = async(req, res, next) => {
    try {
        var dados = await repository.getById( req.params.id );
        res.status(200).send(dados);
    } catch(e) {
        res.status(500).send( { message:'Processo falhou!' } );
    }
};

exports.getByTags = async(req, res, next) => {
    try {
        var dados = await repository.getByTags( req.params.tag );
        res.status(200).send(dados);
    } catch(e) {
        res.status(500).send( { message:'Processo falhou!' } );
    }
};
