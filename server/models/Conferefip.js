// server/models/Artefato.js
/*
 |--------------------------------------
 | Conferefip Model
 |--------------------------------------
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const conferefipSchema = new Schema({
  userId: { type: String, required: true },
  partidaId: { type: String, required: true },
  artefatoId: { type: String, required: true },
  comment: { type: String },
  detbool: { type: [Boolean]},
  detdescript: { type: [String]},
  dettaxonomy: { type: [String]}
 });

module.exports = mongoose.model('Conferefip', conferefipSchema);