const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//change later, two schemas with similar attributes
const partHistorySchema = new Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  xp: {type: Number, required: true}
 });

module.exports = mongoose.model('userProf', partHistorySchema);
