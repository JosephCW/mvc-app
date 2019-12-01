/**
*  Section controller
*  Handles requests related to section resources.
*
*@author Connor Beshears <connorbeshears@gmail.com>
*
*/
const express = require('express')
const api = express.Router()
const LOG = require('../utils/logger.js')
const Model = require('../models/sections.js')
const find = require('lodash.find')
const notfoundstring = 'Could not find section with id='

// RESPOND WITH JSON DATA  --------------------------------------------

// GET all JSON
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
    res.locals.sections = data
    res.render('section/index.ejs')
  })
})

// GET to create page
api.get('/create', (req, res) => {
  LOG.info(`Handling GET /create ${req}`)
  Model.find({}, (err, data) => {
    res.locals.sections = data
    res.locals.section = new Model()
    res.render('section/create')
  })
})

// GET to details page
api.get('/delete/:id', (req, res) => {
  LOG.info(`Handling GET /delete/:id ${req}`)
  const id = parseInt(req.params.id)
  Model.find({ _id: id }, (err, results) => {
    if (err) { return res.end(notfoundstring) }
    LOG.info(`RETURNING VIEW FOR ${JSON.stringify(results)}`)
    res.locals.section = results[0]
    return res.render('section/delete.ejs')
  })
})

// GET to create page
api.get('/edit/:id', (req, res) => {
  LOG.info(`Handling GET /edit/:id ${req}`)
  const id = parseInt(req.params.id)
  Model.find({ _id: id }, (err, results) => {
    if (err) { return res.end(notfoundstring) }
    LOG.info(`RETURNING VIEW FOR${JSON.stringify(results)}`)
    res.locals.section = results[0]
    return res.render('section/edit.ejs')
  })
})

// GET to create page
api.get('/details/:id', (req, res) => {
  LOG.info(`Handling GET /delete/:id ${req}`)
  const id = parseInt(req.params.id)
  Model.find({ _id: id }, (err, results) => {
    if (err) { return res.end(notfoundstring) }
    LOG.info(`RETURNING VIEW FOR ${JSON.stringify(results)}`)
    res.locals.section = results[0]
    return res.render('section/details.ejs')
  })
})
// RESPOND WITH DATA MODIFICATIONS  -------------------------------
// post new
api.post('/save', (req, res) => {
  console.log(`You tried to access the save page, ${req.baseUrl}`)
  LOG.info(`Handling POST ${req}`)
  LOG.debug(JSON.stringify(req.body))
  const item = new Model()
  LOG.info(`NEW ID ${req.body._id}`)
  item._id = parseInt(req.body._id)
  item.SectionNumber = req.body.SectionNumber
  item.Days = req.body.Days
  item.StartTime = req.body.StartTime
  item.RoomNumber = req.body.RoomNumber
  item.InstructorID = req.body.InstructorID
  item.CourseID = req.body.CourseID
  item.save((err) => {
    if (err) { return res.end('ERROR: section could not be saved') }
    LOG.info(`SAVING NEW section ${JSON.stringify(item)}`)
    return res.redirect('/sec')
  })
})

// post save w/ id
api.post('/save/:id', (req, res) => {
  LOG.info(`Handling SAVE request ${req}`)
  const id = parseInt(req.params.id)
  LOG.info(`Handling SAVING ID=${id}`)
  Model.updateOne({ _id: id },
    { // use mongoose field update operator $set
      $set: {
        SectionNumber: req.body.SectionNumber,
        Days: req.body.Days,
        StartTime: req.body.StartTime,
        RoomNumber: req.body.RoomNumber,
        InstructorID: req.body.InstructorID,
        CourseID: req.body.CourseID
      }
    },
    (err, item) => {
      if (err) { return res.end(notfoundstring) }
      LOG.info(`ORIGINAL VALUES ${JSON.stringify(item)}`)
      LOG.info(`UPDATED VALUES: ${JSON.stringify(req.body)}`)
      LOG.info(`SAVING UPDATED instructor ${JSON.stringify(item)}`)
      return res.redirect('/sec')
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
    return res.redirect('/sec')
  })
})
module.exports = api
