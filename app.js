// import { express } from 'express';
// nodemon
// npm install {express, body-parser, mongoose} --save

// local tunnel
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var Serie = require('./Serie.js');

var mongoose = require('mongoose');
//configuracao de porta nao padrao
mongoose.connect('mongodb://localhost:27017/minicurso');

var series = [];

// transforma tudo em json
app.use(bodyParser.json());

app.post('/series', (req, res) => {
    let novaSerie = req.body;
    const serieCriada = new Serie(novaSerie);
    // salva no mongodb
    //serieCriada.save( () => res.send(series));
    serieCriada.save(function(){
        res.send(series);
    });
    // res.send(series);
    console.log('Cadastrado: '+serieCriada.nome);
})
app.get('/', function(req, res){
    // document.write('Servidor OK!');
    res.send('<h1> Olar </h1>');
    console.log('Deu certo');
})
app.get('/hora', function(req, res){
    res.send(new Date());
    console.log('hora');
})
app.get('/saudacao/:nome', function(req, res){
    console.log('nome');
    res.send('Ola, '+ req.params.nome);
})
// app.listen(8087, ()=> console.log('O servidor esta rodando!');)
app.listen(8087, function(){
    console.log('O servidor esta rodando!');
});

app.get('/series', (req, res) => {
    // res.send(series);
    const seriesDB = Serie.find({}, '_id nome', (erro, series) =>{
        if(erro){
            return res.status(400).send(erro);
        }
          res.status(201).send(series);
    });
    console.log();
});

app.put('/series/:id', (req, res) =>{
    let id = req.params.id;
    let novaSerie = req.body;
    Serie.findById(id, (err, serieEncontrada) => {
        if(serieEncontrada.assistida){
            serieEncontrada.assistida = false;
        } else {
            serieEncontrada.assistida = true;
        }
        serieEncontrada.save((err, serie) =>{
            res.send(serie);
        })
    })
    // res.send(series);
})

app.delete('/series/:id', (req, res) => {
    for(serie in series){
        if(serie.id === id) {
            console.log('Removido: '+serie.nome);
            serie.delete(serie);
            break;
        }
    }
    res.send(series);
})