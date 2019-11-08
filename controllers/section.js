/**
*  Section controller
*  Handles requests related to section resources.
*
*@author Connor Beshears <connorbeshears@gmail.com>
*
*/
const express = require('express')
const api = express.Router()
// const Model = require('../models/developer.js')
const find = require('lodash.find')
const notfoundstring = 'Could not find section with id='

// RESPOND WITH JSON DATA  --------------------------------------------

// GET all JSON
api.get('/findall', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  const data = req.app.locals.sections.query
  res.send(JSON.stringify(data))
})

// GET one JSON by ID
api.get('/findone/:id', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  const id = parseInt(req.params.id)
  const data = req.app.locals.sections.query
  const item = find(data, { _id: id })
  if (!item) { return res.end(notfoundstring + id) }
  res.send(JSON.stringify(item))
})

// RESPOND WITH VIEWS  --------------------------------------------
api.get('/', (req, res) => {
  // res.setHeader('Content-Type', 'text/plain')
  // res.send(`You tried to access /, ${req.baseUrl}`)
  res.render('section/index.ejs')
})

// GET to create page
api.get('/create', (req, res) => {
  res.setHeader('Content-Type', 'text/plain')
  res.send(`You tried to access the create page, ${req.baseUrl}`)
})

// GET to details page
api.get('/details', (req, res) => {
  res.setHeader('Content-Type', 'text/plain')
  res.send(`You tried to access the details page, ${req.baseUrl}`)
})

// GET to create page
api.get('/edit', (req, res) => {
  res.setHeader('Content-Type', 'text/plain')
  res.send(`You tried to access the edit page, ${req.baseUrl}`)
})

// GET to create page
api.get('/delete', (req, res) => {
  res.setHeader('Content-Type', 'text/plain')
  res.send(`You tried to access delete page, ${req.baseUrl}`)
})

// RESPOND WITH DATA MODIFICATIONS  -------------------------------
// post new
api.post('/save', (req, res) => {
  console.log(`You tried to access the save page, ${req.baseUrl}`)
  res.redirect('/inst')
})

// post save w/ id
api.post('/save/:id', (req, res) => {
  console.log(`You tried to access the save page with an id of ${req.params.id}, ${req.baseUrl}`)
  res.redirect('/inst')
})

// delete by id
api.post('/delete/:id', (req, res) => {
  console.log(`You tried to access the delete page with an id of ${req.params.id}, ${req.baseUrl}`)
  res.redirect('/inst')
})
module.exports = api
