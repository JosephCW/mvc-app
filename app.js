/**
 * @file app.js
 * The starting point of the application.
 * Express allows us to configure our app and use
 * dependency injection to add it to the http server.
 *
 * The server-side app starts and begins listening for events.
 *
 *  @requires config
 *  @requires express
 **/
const config = require('config')
const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const app = express() // create an Express web app
const path = require('path') // for local file directories.
const engines = require('consolidate')

// Use hosting values if available, otherwise default
const environment = process.env.NODE_ENV || 'development'
const hostname = process.env.HOSTNAME || config.get('hostname')
const port = process.env.PORT || config.get('port')

// set the root view folder
app.set('views', path.join(__dirname, 'views'))

// By default, Express does not serve static files.
// use middleware to define a static assets folder 'public'
app.use(express.static('public'))

// load seed data
require('./utils/seeder.js')(app)

// Set viewing engine to ejs
app.set('view engine', 'ejs')
app.engine('ejs', engines.ejs)
// use expressLayouts
app.use(expressLayouts)

// Use Express middleware to configure routing
const routing = require('./routes/router.js')
app.use('/', routing)

app.listen(port, hostname, () => {
  console.log(`App running at http://${hostname}:${port}/ in ${environment}`)
  console.log('Hit CTRL-C CTRL-C to stop\n')
})

// coppied from node-express-mvc-ejs-start example
module.exports = app
