/**
*  Developer controller
*  Handles requests related to developer resources.
*
* @author Kevin Hart <s526939@nwmissouri.edu>
*
*/
const express = require('express')
const api = express.Router()
const Model = require('../models/courses.js')
const find = require('lodash.find')
const notfoundstring = 'Could not find course with id='

// RESPOND WITH JSON DATA  --------------------------------------------

api.get('/findall', (req, res) => {
  LOG.info(`Handling /findall ${req}`)
  Model.find({}, (err, data) => {
    res.json(data)
  })
})

// GET one JSON by ID
api.get('/findone/:id', (req, res) => {
  LOG.info(`Handling /findone ${req}`)
  const id = parseInt(req.params.id)
  Model.find({ _id: id }, (err, results) => {
    if (err) { return res.end(notfoundstring) }
    res.json(results[0])
  })
})

// RESPOND WITH VIEWS  --------------------------------------------

// GET request to base page.
api.get('/', (req, res) => {
  LOG.info(`Handling GET / ${req}`)
  Model.find({}, (err, data) => {
    res.locals.courses = data
    res.render('course/index.ejs')
  })
})

// GET to create page
api.get('/create', (req, res) => {
  LOG.info(`Handling GET /create ${req}`)
  Model.find({}, (err, data) => {
    res.locals.courses = data
    res.locals.course = new Model()
    res.render('course/create')
  })
})

// GET to details page
api.get('/delete/:id', (req, res) => {
  LOG.info(`Handling GET /delete/:id ${req}`)
  const id = parseInt(req.params.id)
  Model.find({ _id: id }, (err, results) => {
    if (err) { return res.end(notfoundstring) }
    LOG.info(`RETURNING VIEW FOR ${JSON.stringify(results)}`)
    res.locals.course = results[0]
    return res.render('course/delete.ejs')
  })
})

// GET to create page
api.get('/detaisl/:id', (req, res) => {
  LOG.info(`Handling GET /details/:id ${req}`)
  const id = parseInt(req.params.id)
  Model.find({ _id: id }, (err, results) => {
    if (err) { return res.end(notfoundstring) }
    LOG.info(`RETURNING VIEW FOR ${JSON.stringify(results)}`)
    res.locals.course = results[0]
    return res.render('course/details.ejs')
  })
})

// GET to create page
api.get('/edit/:id', (req, res) => {
  LOG.info(`Handling GET /edit/:id ${req}`)
  const id = parseInt(req.params.id)
  Model.find({ _id: id }, (err, results) => {
    if (err) { return res.end(notfoundstring) }
    LOG.info(`RETURNING VIEW FOR${JSON.stringify(results)}`)
    res.locals.course = results[0]
    return res.render('course/edit.ejs')
  })
})

// RESPOND WITH DATA MODIFICATIONS  -------------------------------

// post new
api.post('/save', (req, res) => {
  LOG.info(`Handling POST ${req}`)
  LOG.debug(JSON.stringify(req.body))
  const item = new Model()
  LOG.info(`NEW ID ${req.body._id}`)
  item._id = parseInt(req.body._id)
  item.SchoolNumber = req.body.SchoolNumber
  item.CourseNumber = req.body.CourseNumber
  item.Name = req.body.Name
  item.inSpring = req.body.inSpring
  item.inSummer = req.body.inSummer
  item.inFall = req.body.inFall
  item.save((err) => {
    if (err) { return res.end('ERROR: course could not be saved') }
    LOG.info(`SAVING NEW course ${JSON.stringify(item)}`)
    return res.redirect('/cour')
  })
})

// THESE ARE POST REQUEST ROUTES, WILL ONLY REPLY TO POST REQUEST.
// ABOVE ROUTING IS GET REQUEST FOR CERTAIN IDS

// post save w/ id
api.post('/save/:id', (req, res) => {
  LOG.info(`Handling SAVE request ${req}`)
  const id = parseInt(req.params.id)
  LOG.info(`Handling SAVING ID=${id}`)
  Model.updateOne({ _id: id },
    { // use mongoose field update operator $set
      $set: {
        SchoolNumber: req.body.SchoolNumber,
        CourseNumber: req.body.CourseNumber,
        Name: req.body.Name,
        inSpring: req.body.inSpring,
        inSummer: req.body.inSummer,
        inFall: req.body.inFall
      }
    },
    (err, item) => {
      if (err) { return res.end(notfoundstring) }
      LOG.info(`ORIGINAL VALUES ${JSON.stringify(item)}`)
      LOG.info(`UPDATED VALUES: ${JSON.stringify(req.body)}`)
      LOG.info(`SAVING UPDATED course ${JSON.stringify(item)}`)
      return res.redirect('/cour')
    })
})

// delete by id
api.post('/delete/:id', (req, res) => {
  LOG.info(`Handling DELETE request ${req}`)
  const id = parseInt(req.params.id)
  LOG.info(`Handling REMOVING ID=${id}`)
  Model.remove({ _id: id }).setOptions({ single: true }).exec((err, deleted) => {
    if (err) { return res.end(notfoundstring) }
    console.log(`Permanently deleted item ${JSON.stringify(deleted)}`)
    return res.redirect('/cour')
  })
})

module.exports = api