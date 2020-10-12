const mongoose = require('mongoose')

const replySchema = new mongoose.Schema({
  message: { type: String, required: true },
  owner: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
})

const threadSchema = new mongoose.Schema({
  title: { type: String, required: true },
  message: { type: String, required: true },
  owner: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  replies: [replySchema]
})

module.exports = mongoose.model('Thread', threadSchema)