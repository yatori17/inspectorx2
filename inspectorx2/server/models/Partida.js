// server/models/Partida.js
/*
 |--------------------------------------
 | Partida Model
 |--------------------------------------
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const partidaSchema = new Schema({
  userId: { type: String, required: true },
  dificuldade: { type: String, required: true },
  respostas : [{ idPergunta : Number, trecho : String, tipo: String }]

  // usuario
  // pergunta 1, 2, 3
  // cada um com trecho certo ou errado, tipo certo ou errado
  
  //trechoResp: { type: String, required: true },
  //type: { type: String, required: true },	
  //difficulty: { type: String, required: true },  
  //escription: { type: String, required: true }  
});

module.exports = mongoose.model('Partida', partidaSchema);