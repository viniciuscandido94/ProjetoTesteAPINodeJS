'use strict';

const ValidationContract = require('../validators/validators');
const repository = require('../repositores/cliente-repository');
const md5 = require('md5');
const emailService = require('../services/email-service');
const autenticaoService = require('../services/autenticacao-service');

exports.post = async(req, res, next) => {

   var contract = new ValidationContract();
   contract.hasMinLen(req.body.nome, 3, 'O nome tem que ter mais 3 caracteres');
   contract.isEmail(req.body.email, 'Email invalido!');
   contract.hasMinLen(req.body.password, 6, 'A senha tem que ter mais 6 caracteres');

   if (!contract.isValid()){
       res.status(400).send(contract.errors()).end();
   }

   try {
       await repository.create({
           nome: req.body.nome,
           email: req.body.email,
           password: md5(req.body.password + global.SALT_KEY),
           niveis: ["usuario"]
       });

       emailService.send(req.body.email, 'Bem Vindo!', global.EMAIL_TMPL.replace( '{0}', req.body.nome ) )

       res.status(201).send({ message:'Cliente cadastrado com sucesso!' });
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

exports.getById = async(req, res, next) => {
    try {
        var dados = await repository.getById( req.params.id );
        res.status(200).send(dados);
    } catch(e) {
        res.status(500).send( { message:'Processo falhou!' } );
    }
};

exports.autenticacao = async(req, res, next) => {
    try {
        var cliente = await repository.autenticacao({
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY)
        });

        if(!cliente){
            res.status(404).send({
                message: 'Usuario ou senha invalido!'
            });
            return;
        }

        var token = await autenticaoService.generateToken({
            id: cliente._id,
            email: cliente.email,
            nome: cliente.nome,
            niveis: cliente.niveis
        })

        res.status(201).send({
            token: token,
            dados: {
                email: cliente.email,
                nome: cliente.nome
            }
        });
    } catch(e) {
        res.status(500).send({ message:'Cadastro de cliente falhou!' });
    }
};

exports.atualizaToken = async(req, res, next) => {
    try {
        var token = /*req.body.token || req.query.token ||*/ req.headers['token-autorizacao'];
        var dados = await autenticaoService.decodeToken(token);
        var cliente = await repository.getById(dados.id);

        if(!cliente){
            res.status(404).send({
                message: 'Cliente não encontrado!'
            });
            return;
        }

        var tokenDados = await autenticaoService.generateToken({
            id: cliente._id,
            email: cliente.email,
            nome: cliente.nome,
            niveis: cliente.niveis
        })

        res.status(201).send({
            token: token,
            dados: {
                email: cliente.email,
                nome: cliente.nome
            }
        });
    } catch(e) {
        res.status(500).send({ message:'Cadastro de cliente falhou!' });
    }
};
