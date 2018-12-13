// server/models/Artefato.js
/*
 |--------------------------------------
 | Respfip Model
 |--------------------------------------
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const respfipSchema = new Schema({
  userId: { type: String, required: true },
  partidaId: { type: String, required: true },
  artefatoId: { type: String, required: true },
  comment: { type: String },
  detbool: { type: [Boolean]},
  detdescript: { type: [String]},
  dettaxonomy: { type: [String]},
  inspector: { type: Boolean },
  artefatotitle: { type: String }
 });

module.exports = mongoose.model('Respfip', respfipSchema);