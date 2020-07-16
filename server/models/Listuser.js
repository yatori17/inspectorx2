// server/models/UsuarioOnline.js
/*
 |--------------------------------------
 | Artefato Model
 |--------------------------------------
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listuserSchema = new Schema({
  userId: { type: String, required: true , unique: true},
  title: { type: String, required: true }	,
  online:{ type: Boolean},
  xp:{ type: Number, default: 0}
 });

module.exports = mongoose.model('Listuser', listuserSchema);
