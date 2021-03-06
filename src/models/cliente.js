'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    // _id
    nome: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    niveis: [{
      type: String,
      required: true,
      enum: ["admin","usuario"],
      default: "usuario"
    }]
});

module.exports = mongoose.model('Cliente', schema);
