const Thread = require('../models/thread')
const { notFound, forbidden } = require('../lib/errorMessage')

//* Create POST /threads
async function threadCreate (req, res, next) {
  try {
    const newThread = await Thread.create(req.body)
    res.status(200).json(newThread)
    console.log(`Thread titled ${newThread.title} has been created`)
  } catch (err) {
    next(err)
  }
}

//* Index GET /threads
async function threadsIndex (_req, res, next) {
  try {
    const threads = await Thread.find()
    if (!threads) throw new Error(notFound)
    res.status(200).json(threads)
    console.log('Getting all the threads')
  } catch (err) {
    next(err)
  }
  
}

//* Show GET /threads/id
async function threadShow (req, res, next) {
  try {
    const thread = await Thread.findById(req.params.id)
      .populate('owner')
      .populate('replies.owner')
    if (!thread) throw new Error()
    res.status(200).json(thread)
    console.log(`Thread titled '${thread.title}' is being shown`)
  } catch (err) {
    next(err)
  }
}

//* Delete DELETE /threads/id
async function threadDelete(req, res, next) {
  try {
    const threadDelete = await Thread.findById(req.params.id)
    if (!threadDelete) throw new Error()
    await threadDelete.remove()
    res.status(204)
    console.log(`Thread titled ${threadDelete.title} has been deleted`)
  } catch (err) {
    next(err)
  }
}

//* Update PUT /threads/id
async function threadUpdate(req, res, next) {
  try {
    const threadUpdate = await Thread.findById(req.params.id)
    if (!threadUpdate) throw new Error()
    Object.assign(threadUpdate, req.body)
    await threadUpdate.save()
    res.status(202).json(threadUpdate)
    console.log(`Thread titled '${threadUpdate.title}' has updated to '${req.body.message}'`)
  } catch (err) {
    next(err)
  }
}

//* Create Replies POST /threads/Id/replies
async function replyCreate(req, res, next) {
  try {
    const thread = await Thread.findById(req.params.id)
    if (!thread) throw new Error(notFound)
    const reply = { ...req.body, owner: req.currentUser._id }
    thread.replies.push(reply)
    await thread.save()
    res.status(201).json(thread)
  } catch (err) {
    next(err)
  }
}

//* Delete Replies DELETE /threads/Id/replies/Id
async function replyDelete(req, res, next) {
  try {
    const thread = await Thread.findById(req.params.id)
    if (!thread) throw new Error(notFound)
    const replyToDelete = thread.replies.id(req.params.replyId)
    if (!replyToDelete) throw new Error(notFound)
    await replyToDelete.remove()
    await thread.save()
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
}

//* Update reply PUT /threads/Id/replies/Id
async function replyUpdate(req, res, next) {
  try {
    const thread = await Thread.findById(req.params.id)
    if (!thread) throw new Error(notFound)
    const newReply = req.body
    const replyToUpdate = thread.replies.id(req.params.replyId)
    Object.assign(replyToUpdate, newReply)
    await thread.save()
    res.status(202).json(thread)
    console.log(`Thread titled '${thread.title}' has updated its reply with '${req.body.message}'`)
  } catch (err) {
    next(err)
  }
}


module.exports = {
  create: threadCreate,
  index: threadsIndex,
  show: threadShow,
  delete: threadDelete,
  update: threadUpdate,
  replyCreate: replyCreate,
  replyDelete: replyDelete,
  replyUpdate: replyUpdate
}