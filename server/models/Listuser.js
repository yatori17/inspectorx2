// server/models/UsuarioOnline.js
/*
 |--------------------------------------
 | Artefato Model
 |--------------------------------------
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listuserSchema = new Schema({
  userId: { type: String, required: true },
  title: { type: String, required: true }	
 });

module.exports = mongoose.model('Listuser', listuserSchema);