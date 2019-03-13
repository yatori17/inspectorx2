// server/models/Artefato.js
/*
 |--------------------------------------
 | Artefato Model
 |--------------------------------------
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const artefatoSchema = new Schema({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  taxid: { type: String, required: true },
  content: { type: String, required: true },
  defectbool: { type: [Boolean]},
  defectdescript: { type: [String]},
  defecttaxonomy: { type: [String]},
  qtydefect: { type: Number }
 });

module.exports = mongoose.model('Artefato', artefatoSchema);