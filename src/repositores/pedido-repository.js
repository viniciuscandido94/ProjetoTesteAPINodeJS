'use strict'

const mongoose = require("mongoose");
const Pedido = mongoose.model('Pedido');

exports.create = async(dados) => {
    var pedido = new Pedido(dados);
    await pedido.save();
}

exports.get = async() => {
    var result = await Pedido
        .find({}, 'numero status' )
        .populate( 'cliente', 'nome' )
        .populate( 'itens.produto', 'titulo' );
    return result;
}
