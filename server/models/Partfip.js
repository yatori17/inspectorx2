// server/models/Partida.js
/*
 |--------------------------------------
 | Partfip Model
 |--------------------------------------
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const partfipSchema = new Schema({
  userId: { type: String },
  title: { type: String},
  modo: { type: Number },
  artefato: { type: [String]},
  inspetor: { type: [String]},
  createDate: { type: Date }
  // usuario
  // pergunta 1, 2, 3
  // cada um com trecho certo ou errado, tipo certo ou errado
  
  //trechoResp: { type: String, required: true },
  //type: { type: String, required: true },	
  //difficulty: { type: String, required: true },  
  //escription: { type: String, required: true }  
});

module.exports = mongoose.model('Partfip', partfipSchema);

// on every save, add the date
partfipSchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();

  // if created_at doesn't exist, add to that field
  if (!this.createDate)
    this.createDate = currentDate;

  next();
});