const mongoose = require('mongoose')
const { dbURI } = require('../config/environment')
const Thread = require('../models/thread')
const threadData = require('./data/threads')

mongoose.connect(
  dbURI,
  { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
  async (err) => {
    if (err) {
      console.log(err)
      return
    }
    try {
      await mongoose.connection.db.dropDatabase()
      console.log('Database Dropped')
      const threads = await Thread.create(threadData)
      console.log(`${threads.length} threads created!`)
    } catch (err) {
      console.log(err)
    }
    await mongoose.connection.close()
  }
)