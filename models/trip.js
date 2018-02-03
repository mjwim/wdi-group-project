const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
  location: { type: String, required: true },
  amount: { type: Number, required: true },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
});

billSchema.set('toJSON', { virtuals: true });

const tripSchema = new mongoose.Schema({
  location: { type: String, required: true },
  image: { type: String },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  bills: [ billSchema ],
  members: [{ type: mongoose.Schema.ObjectId, ref: 'Member', require: true }]
});

tripSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Trip', tripSchema);
