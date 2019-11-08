/**
 * @router.js - manages all routing
 *
 * router.get when assigning to a single request
 * router.use when deferring to a controller
 *
 * @requires express
 */

const express = require('express')

console.log('START routing')
const router = express.Router()

// Manage top-level request first
router.get('/', (req, res, next) => {
  console.log('Request to /')
  res.render('index.ejs', {title : 'Express app'})
})

// router.get('/index', (req, res, next) => {
//   console.log('Request to /index')
//   res.sendFile('index.html')
// })

// Route requests that start with '/dev' to a particular controller
router.use('/inst', require('../controllers/instructor.js'))
router.use('/stu', require('../controllers/student.js'))
router.use('/sec', require('../controllers/section.js'))

console.log('END routing')
module.exports = router
