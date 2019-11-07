/**
*  Instructor controller
*  Handles requests related to instructor resources.
*
* @author Joseph Watts <s519653@nwmissouri.edu>
*
*/
const express = require('express')
const api = express.Router()
const Model = require('../models/instructors.js')
const find = require('lodash.find')
const notfoundstring = 'Could not find instructor with id='

// RESPOND WITH JSON DATA  --------------------------------------------
// GET all JSON
api.get('/findall', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  const data = req.app.locals.instructors.query
  res.send(JSON.stringify(data))
})

// GET one JSON by ID
api.get('/findone/:id', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  const id = parseInt(req.params.id)
  const data = req.app.locals.instructors.query
  const item = find(data, { _id: id })
  if (!item) { return res.end(notfoundstring + id) }
  res.send(JSON.stringify(item))
})

// RESPOND WITH VIEWS  --------------------------------------------

api.get('/', (req, res) => {
  console.log(`Called / on instructor: ${req}`)
  Model.find({}, (err, data) => {
    res.locals.instructors = data
    res.render('instructor/index.ejs')
  })
})

// RESPOND WITH DATA MODIFICATIONS  -------------------------------

// later

module.exports = api
