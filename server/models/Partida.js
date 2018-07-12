// server/models/Partida.js
/*
 |--------------------------------------
 | Partida Model
 |--------------------------------------
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const partidaSchema = new Schema({
  userId: { type: String },
  dificuldade: { type: String },
  createDate: { type: Date },
  // usuario
  // pergunta 1, 2, 3
  // cada um com trecho certo ou errado, tipo certo ou errado
  
  //trechoResp: { type: String, required: true },
  //type: { type: String, required: true },	
  //difficulty: { type: String, required: true },  
  //escription: { type: String, required: true }  
});

module.exports = mongoose.model('Partida', partidaSchema);

// on every save, add the date
partidaSchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();

  // if created_at doesn't exist, add to that field
  if (!this.createDate)
    this.createDate = currentDate;

  next();
});