const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    nome: String,
    prioridade: Number,
    protagonista: {
        nome: String
    }
});

module.exports = mongoose.model('Serie', schema);