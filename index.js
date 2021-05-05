const express = require('express')
const mongoose = require('mongoose')
const app = express()
const { dbURI, port } = require('./config/environment')
const router = require('./config/router')
const errorHandler = require('./lib/errorHandler')
const logger = require('./lib/logger')

mongoose.connect(
  process.env.MONGODB_URI || dbURI,
  { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      console.log(err)
      return
    }
    console.log('Mongo is connected! 👍')
  }
)

app.use(express.json())

app.use(logger)

app.use('/api', router)

app.use(errorHandler)

app.listen(port, () => console.log(`Listening on localhost:${port} 🎊`))