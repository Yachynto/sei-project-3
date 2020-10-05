const router = require('express').Router()
const threads = require('../controllers/threads')

router.route('/threads')
  .get(threads.index)
  .post(threads.create)

router.route('/threads/:id')
  .get(threads.show)
  .delete(threads.delete)
  .put(threads.update)

module.exports = router