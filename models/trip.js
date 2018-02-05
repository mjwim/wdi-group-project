const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
});

commentSchema.methods.belongsTo = function commentBelongsTo(user) {
  return this.createdBy.id === user.id;
};

const billSchema = new mongoose.Schema({
  location: { type: String, required: true },
  amount: { type: Number, required: true },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
});

billSchema.set('toJSON', { virtuals: true });

const tripSchema = new mongoose.Schema({
  location: { type: String, required: true },
  image: { type: String },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User'},
  bills: [ billSchema ],
  members: [{ type: mongoose.Schema.ObjectId, ref: 'Member'}],
  comments: [ commentSchema ]
});

tripSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Trip', tripSchema);
