/**
*  Student controller
*  Handles requests related to student resources.
*
*@author Chase Smith <s523929@nwmissouri.edu>
*
*/
const express = require('express')
const api = express.Router()
//const Model = require('../models/students.js')
const find = require('lodash.find')
const notfoundstring = 'Could not find student with id='

// RESPOND WITH JSON DATA  --------------------------------------------
// GET all JSON
api.get('/findall', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  const data = req.app.locals.students.query
  res.send(JSON.stringify(data))
})

// GET one JSON by ID
api.get('/findone/:id', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  const id = parseInt(req.params.id)
  const data = req.app.locals.students.query
  const item = find(data, { _id: id })
  if (!item) { return res.end(notfoundstring + id) }
  res.send(JSON.stringify(item))
})

// RESPOND WITH VIEWS  --------------------------------------------

// GET request to base page.
api.get('/', (req, res) => {
  const data = req.app.locals.students.query
  res.locals.students = data
  res.render('student/index.ejs')
})

// GET to create page
api.get('/create', (req, res) => {
  // TODO - add logic to pass all students to next page
  const data = req.app.locals.students.query
  res.locals.students = data
  res.render('student/create.ejs')
})

// GET to details page
api.get('/details/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const data = req.app.locals.students.query
  const item = find(data, { _id: id })
  // EJS will continue to run code even after res.render. It is not == calling return.
  if (!item) { res.render('404.ejs'); return -1}
  res.locals.student = item
  res.render('student/details.ejs')
})

// GET to create page
api.get('/edit/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const data = req.app.locals.students.query
  const item = find(data, { _id: id })
  if (!item) { res.render('404.ejs'); return -1}
  res.locals.student = item
  res.render('student/edit.ejs')
})

// GET to create page
api.get('/delete/:id', (req, res) => {
  // TODO - add logic to pass the student with that id to next page
  const id = parseInt(req.params.id)
  const data = req.app.locals.students.query
  const item = find(data, { _id: id })
  if (!item) { res.render('404.ejs'); return -1}
  res.locals.student = item
  res.render('student/delete.ejs')
})

// RESPOND WITH DATA MODIFICATIONS  -------------------------------

// post new
api.post('/save', (req, res) => {
  console.log(`You tried to access the save page, ${req.baseUrl}`)
  res.redirect('/stu')
})

// THESE ARE POST REQUEST ROUTES, WILL ONLY REPLY TO POST REQUEST.
// ABOVE ROUTING IS GET REQUEST FOR CERTAIN IDS

// post save w/ id
api.post('/save/:id', (req, res) => {
  console.log(`You tried to access the save page with an id of ${req.params.id}, ${req.baseUrl}`)
  res.redirect('/stu')
})

// delete by id
api.post('/delete/:id', (req, res) => {
  console.log(`You tried to access the delete page with an id of ${req.params.id}, ${req.baseUrl}`)
  res.redirect('/stu')
})

module.exports = api
