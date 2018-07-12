// server/models/Resposta.js
/*
 |--------------------------------------
 | Resposta Model
 |--------------------------------------
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const respostaSchema = new Schema({
 idPartida: String,
 idPergunta : Number,
 numOrder: Number,
 trecho : Number,
 tipo: Number,
 trechoAcerto: Boolean, 
 tipoAcerto: Boolean 
  
  // usuario
  // pergunta 1, 2, 3
  // cada um com trecho certo ou errado, tipo certo ou errado
  
  //trechoResp: { type: String, required: true },
  //type: { type: String, required: true },	
  //difficulty: { type: String, required: true },  
  //escription: { type: String, required: true }  
});

module.exports = mongoose.model('Resposta', respostaSchema);