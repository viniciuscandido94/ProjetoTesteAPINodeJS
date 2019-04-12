'use strict'

const mongoose = require("mongoose");
const Produto = mongoose.model('Produto');

exports.get = async() => {
    var result = await Produto.find({});
    return result;
}

exports.getBySlug = async(slug) => {
     var result = await Produto.findOne( { ativo:true,
                                           slug: slug
                                         }, 'titulo descricao preco slug tags' );
     return result;
}

exports.getById = async(id) => {
    var result = await Produto.findById(id);
    return result;
}

exports.getByTags = async(tag) =>{
    var result = await Produto.find( { tags:tag } );
    return result;
}

exports.create = async(dados) => {
    var produto = new Produto(dados);
    await produto.save();
}

exports.atualiza = async(id, dados) => {
    await Produto
        .findByIdAndUpdate( id, {
            $set: {
                titulo: dados.titulo,
                description: dados.description,
                price: dados.price
            }
        });
}

exports.delete = async(id) => {
    await Produto.findOneAndRemove(id);
}
