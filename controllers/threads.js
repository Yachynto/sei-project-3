const Thread = require('../models/thread')

//* Create POST /threads
async function threadCreate (req, res) {
  try {
    const newThread = await Thread.create(req.body)
    res.status(200).json(newThread)
    console.log(`Thread titled ${newThread.title} has been created`)
  } catch (err) {
    res.status(422).json(err)
  }
}

//* Index GET /threads
async function threadsIndex (req, res) {
  const threads = await Thread.find()
  res.status(200).json(threads)
  console.log('Getting all the threads')
}

//* Show GET /threads/id
async function threadShow (req, res) {
  try {
    const thread = await Thread.findById(req.params.id)
    if (!thread) throw new Error()
    res.status(200).json(thread)
    console.log(`Thread titled ${thread.title} is being shown`)
  } catch (err) {
    res.status(404).json('Not Found')
  }
}

//* Delete DELETE /threads/id
async function threadDelete(req, res) {
  try {
    const threadDelete = await Thread.findById(req.params.id)
    if (!threadDelete) throw new Error()
    await threadDelete.remove()
    res.status(204)
    console.log(`Thread titled ${threadDelete.title} has been deleted`)
  } catch (err) {
    res.status(404).json('Not Found')
  }
}

//* Update PUT /threads/id
async function threadUpdate(req, res) {
  try {
    const threadUpdate = await Thread.findById(req.params.id)
    if (!threadUpdate) throw new Error()
    Object.assign(threadUpdate, req.body)
    await threadUpdate.save()
    res.status(202).json(threadUpdate)
    console.log(`Thread titled ${threadUpdate.title} has updated its ${req.body}`)
    console.log(req.body)
  } catch (err) {
    res.status(422).json(err)
  }
}


module.exports = {
  create: threadCreate,
  index: threadsIndex,
  show: threadShow,
  delete: threadDelete,
  update: threadUpdate
}