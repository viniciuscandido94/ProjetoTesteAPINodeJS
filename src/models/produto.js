'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    // _id
    titulo: {
        type: String,
        required: true,
        trim: true
    },
      slug: { // URL Ex: "cadeira-gamer"
        type: String,
        required: [true, 'O slug eh obrigatorio!'],
        trim: true,
        index: true,
        unique: true
    },
    descricao: {
        type: String,
        required: true
    },
    preco: {
        type: Number,
        required: true,
    },
    ativo: {
        type: Boolean,
        required: true,
        default: true
    },
    tags: [{
        type: String,
        required: true
    }]    
});

module.exports = mongoose.model('Produto', schema);
