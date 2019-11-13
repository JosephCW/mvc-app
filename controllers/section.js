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
// GET request to base page.
api.get('/', (req, res) => {
  const data = req.app.locals.sections.query
  res.locals.sections = data
  res.render('section/index.ejs')
})

// GET to create page
api.get('/create', (req, res) => {
  // TODO - add logic to pass all sections to next page
  const data = req.app.locals.sections.query
  res.locals.sections = data
  res.render('section/create.ejs')
})

// GET to details page
api.get('/details/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const data = req.app.locals.sections.query
  const item = find(data, { _id: id })
  // EJS will continue to run code even after res.render. It is not == calling return.
  if (!item) { res.render('404.ejs'); return -1}
  res.locals.section = item
  res.render('section/details.ejs')
})

// GET to create page
api.get('/edit/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const data = req.app.locals.sections.query
  const item = find(data, { _id: id })
  if (!item) { res.render('404.ejs'); return -1}
  res.locals.section = item
  res.render('section/edit.ejs')
})

// GET to create page
api.get('/delete/:id', (req, res) => {
  // TODO - add logic to pass the section with that id to next page
  const id = parseInt(req.params.id)
  const data = req.app.locals.sections.query
  const item = find(data, { _id: id })
  if (!item) { res.render('404.ejs'); return -1}
  res.locals.section = item
  res.render('section/delete.ejs')
})
// RESPOND WITH DATA MODIFICATIONS  -------------------------------
// post new
api.post('/save', (req, res) => {
  console.log(`You tried to access the save page, ${req.baseUrl}`)
  res.redirect('/sec')
})

// post save w/ id
api.post('/save/:id', (req, res) => {
  console.log(`You tried to access the save page with an id of ${req.params.id}, ${req.baseUrl}`)
  res.redirect('/sec')
})

// delete by id
api.post('/delete/:id', (req, res) => {
  console.log(`You tried to access the delete page with an id of ${req.params.id}, ${req.baseUrl}`)
  res.redirect('/sec')
})
module.exports = api
