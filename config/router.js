const router = require('express').Router()
const threads = require('../controllers/threads')
const auth = require('../controllers/auth')
const secureRoute = require('../lib/secureRoute')

router.route('/threads')
  .get(threads.index)
  .post(secureRoute, threads.create)

router.route('/threads/:id')
  .get(threads.show)
  .delete(secureRoute, threads.delete)
  .put(secureRoute, threads.update)

router.route('/threads/:id/replies')
  .post(secureRoute, threads.replyCreate)

router.route('/threads/:id/replies/:replyId')
  .delete(secureRoute, threads.replyDelete)
  .put(secureRoute, threads.replyUpdate)

router.route('/threads/:id/records')
  .post(secureRoute, threads.recordCreate)

router.route('/threads/:id/records/:recordId')
  .delete(secureRoute, threads.recordDelete)
  .put(secureRoute, threads.recordUpdate)

router.route('/register')
  .post(auth.register)

router.route('/login')
  .post(auth.login)

router.route('/profile')
  .get(secureRoute, auth.profile)
  .put(secureRoute, auth.profileUpdate)

router.route('/admin/allProfile')
  .get(auth.index)


module.exports = router