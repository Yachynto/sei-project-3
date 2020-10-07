const mongoose = require('mongoose')

const replySchema = new mongoose.Schema({
  message: { type: String, required: true },
  createdBy: { type: String, required: true },
}, {
  timestamps: true
})

const threadSchema = new mongoose.Schema({
  title: { type: String, required: true },
  message: { type: String, required: true },
  createdBy: { type: String, required: true },
  replies: [replySchema]
})

module.exports = mongoose.model('Thread', threadSchema)