'use strict'

const mongoose = require("mongoose");
const Cliente = mongoose.model('Cliente');

exports.create = async(dados) => {
    var cliente = new Cliente(dados);
    await cliente.save();
}

exports.get = async() => {
    var result = await Cliente.find({});
    return result;
}

exports.autenticacao = async(dados) => {
    var result = await Cliente.findOne({
        email: dados.email,
        password: dados.password
    });
    return result;
}

exports.getById = async(id) => {
    var result = await Cliente.findById(id);
    return result;
}
