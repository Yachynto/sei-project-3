const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { secret } = require('../config/environment')
const { unauthorized, notFound } = require('../lib/errorMessage')

//* Register POST /register
async function register(req, res, next) {
  try {
    const user = await User.create(req.body)
    res.status(201).json({ message: `Welcome ${user.username}!` })
  } catch (err) {
    next(err)
  }
}


//* Login POST /login
async function login(req, res, next) {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (!user || !user.validatePassword(req.body.password)) {
      throw new Error(unauthorized)
    }
    const token = jwt.sign(
      { sub: user._id },
      secret,
      { expiresIn: '7 days' },
    )
    res.status(202).json({
      message: `Welcome back ${user.username}`,
      token
    })
    console.log(`${user.username} has just logged in!`)
  } catch (err) {
    next(err)
  }
}

//* Profile GET /profile
async function profile(req, res, next) {
  try {
    const user = await User.findById(req.currentUser._id)
    if (!user) throw new Error(notFound)
    res.status(200).json(user)
  } catch (err) {
    next(err)
  }
}
//* allProfile GET /admin/allProfile
async function allProfile(_req, res, next) {
  try {
    const users = await User.find()
    if (!users) throw new Error(notFound)
    res.status(200).json(users)
    console.log('Getting all Users')
  } catch (err) {
    next(err)
  }
}

//* Update PUT /profile
async function profileUpdate(req, res, next) {
  try {
    const profileToEdit = await User.findById(req.currentUser._id)
    if (!profileToEdit) throw new Error(notFound)
    Object.assign(profileToEdit, req.body)
    await profileToEdit.save()
    res.status(202).json(profileToEdit)
  } catch (err) {
    next(err)
  }
}



module.exports = {
  register,
  login,
  profile,
  index: allProfile,
  profileUpdate
}