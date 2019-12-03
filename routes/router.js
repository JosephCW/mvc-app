/**
 * @router.js - manages all routing
 *
 * router.get when assigning to a single request
 * router.use when deferring to a controller
 *
 * @requires express
 */

const express = require('express')
const LOG = require('../utils/logger.js')
// to show courses on home page
const Model = require('../models/courses.js')
const ModelSections = require('../models/sections')

console.log('START routing')
const router = express.Router()

// Manage top-level request first
router.get('/', (req, res, next) => {
  console.log('Request to /')
  LOG.info(`Handling /findall ${req}`)
  Model.find({}, (err, data) => {
    res.locals.courses = data
    console.log(`Found courses : ${res.locals.courses.length}`)
    res.render('index.ejs', {title : 'Express app'})
  })
})

router.get('/getSectionsFromCourses/:id', (req, res) => {
  console.log('request to /getSectionsFromCourses/:id')
  ModelSections.find({ CourseID: req.params.id}, (err, data) => {
    res.json(data)
  })
})

// Route requests that start with '/dev' to a particular controller
router.use('/inst', require('../controllers/instructor.js'))
router.use('/stu', require('../controllers/student.js'))
router.use('/sec', require('../controllers/section.js'))
router.use('/cour', require('../controllers/course.js'))

console.log('END routing')
module.exports = router
