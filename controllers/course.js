/**
*  Developer controller
*  Handles requests related to developer resources.
*
* @author Kevin Hart <s526939@nwmissouri.edu>
*
*/
const express = require('express')
const api = express.Router()
// const Model = require('../models/courses.js')
const find = require('lodash.find')
const notfoundstring = 'Could not find course with id='

// RESPOND WITH JSON DATA  --------------------------------------------

// GET all JSON
api.get('/findall', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  const data = req.app.locals.courses.query
  res.send(JSON.stringify(data))
})

// GET one JSON by ID
api.get('/findone/:id', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  const id = parseInt(req.params.id)
  const data = req.app.locals.courses.query
  const item = find(data, { _id: id })
  if (!item) { return res.end(notfoundstring + id) }
  res.send(JSON.stringify(item))
})

// RESPOND WITH VIEWS  --------------------------------------------

// GET request to base page.
api.get('/', (req, res) => {
  const data = req.app.locals.courses.query
  res.locals.courses = data
  res.render('course/index.ejs')
})

// GET to create page
api.get('/create', (req, res) => {
  // TODO - add logic to pass all courses to next page
  const data = req.app.locals.courses.query
  res.locals.courses = data
  res.render('course/create.ejs')
})

// GET to details page
api.get('/details/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const data = req.app.locals.courses.query
  const item = find(data, { _id: id })
  // EJS will continue to run code even after res.render. It is not == calling return.
  if (!item) { res.render('404.ejs'); return -1}
  res.locals.course = item
  res.render('course/details.ejs')
})

// GET to create page
api.get('/edit/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const data = req.app.locals.courses.query
  const item = find(data, { _id: id })
  if (!item) { res.render('404.ejs'); return -1}
  res.locals.course = item
  res.render('course/edit.ejs')
})

// GET to create page
api.get('/delete/:id', (req, res) => {
  // TODO - add logic to pass the course with that id to next page
  const id = parseInt(req.params.id)
  const data = req.app.locals.courses.query
  const item = find(data, { _id: id })
  if (!item) { res.render('404.ejs'); return -1}
  res.locals.course = item
  res.render('course/delete.ejs')
})

// RESPOND WITH DATA MODIFICATIONS  -------------------------------

// post new
api.post('/save', (req, res) => {
  console.log(`You tried to access the save page, ${req.baseUrl}`)
  res.redirect('/cour')
})

// THESE ARE POST REQUEST ROUTES, WILL ONLY REPLY TO POST REQUEST.
// ABOVE ROUTING IS GET REQUEST FOR CERTAIN IDS

// post save w/ id
api.post('/save/:id', (req, res) => {
  console.log(`You tried to access the save page with an id of ${req.params.id}, ${req.baseUrl}`)
  res.redirect('/cour')
})

// delete by id
api.post('/delete/:id', (req, res) => {
  console.log(`You tried to access the delete page with an id of ${req.params.id}, ${req.baseUrl}`)
  res.redirect('/cour')
})

module.exports = api