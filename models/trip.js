const mongoose = require('mongoose');


const billSchema = new mongoose.Schema({
  location: {
    name: { type: String, required: true },
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  amount: { type: Number, required: true },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
});

billSchema.set('toJSON', { virtuals: true });

const tripSchema = new mongoose.Schema({
  location: {
    name: { type: String, required: true },
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  image: { type: String },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User'},
  bills: [ billSchema ],
  members: [{ type: mongoose.Schema.ObjectId, ref: 'User'}]
});

tripSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Trip', tripSchema);
