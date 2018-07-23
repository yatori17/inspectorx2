// server/models/Question.js
/*
 |--------------------------------------
 | Question Model
 |--------------------------------------
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
  question: { type: Number, required: true },
  code: { type: String, required: true },
  trecho: { type: String, required: true },
  type: { type: String, required: true },	
  difficulty: { type: String, required: true },  
  taxonomy: { type: String, required: true },
  taxonomyid: { type: Number, required: true },
  description: { type: String, required: true }  
});

module.exports = mongoose.model('Question', questionSchema);