// server/models/Taxonomia.js
/*
 |--------------------------------------
 | Taxonomia Model
 |--------------------------------------
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taxonomiaSchema = new Schema({
  title: { type: String, required: true },
  value: [{ display: String,
  			description: String
  		  }]
 });

module.exports = mongoose.model('Taxonomia', taxonomiaSchema);