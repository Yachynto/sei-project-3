const mongoose = require('mongoose')

const threadSchema = new mongoose.Schema({
  title: { type: String, required: true, require: true },
  message: { type: String, required: true, require: true },
  createdBy: { type: String, required: true, require: true }
})

module.exports = mongoose.model('Thread', threadSchema)