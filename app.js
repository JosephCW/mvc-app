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
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const app = express() // create an Express web app
const path = require('path') // for local file directories.
const engines = require('consolidate')
const errorHandler = require('errorhandler')
// Requirements for final submission
const http = require('http')
const dotenv = require('dotenv')
const LOG = require('./utils/logger.js')
const mongoose = require('mongoose')

dotenv.config({ path: '.env' })
LOG.info('Environment variables loaded into process.env.')

// log port (Heroku issue)
const port = process.env.PORT || 3004
LOG.info(`Running on ${port}`)

// Are we in production or development?
const isProduction = process.env.NODE_ENV === 'production'
LOG.info(`Environment isProduction = ${isProduction}`)

// choose the connection
const dbURI = isProduction ? encodeURI(process.env.ATLAS_URI) : encodeURI(process.env.LOCAL_MONGODB_URI)
LOG.info('MongoDB URL = ' + dbURI)

// get dbName
const DB_NAME = process.env.DB_NAME

// set connection options
const connectionOptions = {
  dbName: DB_NAME,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  autoIndex: false, // Don't build indexes
  reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
  reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0,
  connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4 // Use IPv4, skip trying IPv6
};

// use mongoose to connect & create a default connection
const db = mongoose.connect(dbURI, connectionOptions, (err, client) => {
  if (!err) { console.log('MongoDB connection succeeded.'); }
  else { console.log('Error in MongoDB connection : ' + JSON.stringify(err, undefined, 2)); }
})

//Get the default connection
const connection = mongoose.connection;

function seed(collectionName) {
  LOG.info(`Seeding collection = ${collectionName}`)
  connection.db.collection(collectionName, (err, c) => {
    c.countDocuments((err, count) => {
      if (!err && count === 0) { c.insertMany(require('./data/' + collectionName + '.json')) }
    })
    c.find({}).toArray((err, data) => {
       //console.log(data) 
    })
  })
}

// Mongoose connections emit events
connection.once('open', function () {
  LOG.info('MongoDB event open')
  LOG.info(`MongoDB connected ${dbURI}\n`)

  seed('instructors')
  seed('students')
  // seed('orders')
  // seed('orderlineitems')

  connection.on('connected', function () {
    LOG.info('MongoDB event connected')
  })
  connection.on('disconnected', function () {
    LOG.warn('MongoDB event disconnected')
  })
  connection.on('reconnected', function () {
    LOG.info('MongoDB event reconnected')
  })
  connection.on('error', function (err) {
    LOG.error('%s MongoDB error: %s', chalk.red('✗'), err)
    process.exit(1)
  })
})

// configure app.settings.............................
app.set('host', process.env.HOST)
// set the root view folder
app.set('views', path.join(__dirname, 'views'))
// specify desired view engine (EJS)
app.set('view engine', 'ejs')
app.engine('ejs', engines.ejs)
// configure middleware.....................................................
app.use(favicon(path.join(__dirname, '/public/images/favicon.ico')))
// log every call and pass it on for handling
app.use((req, res, next) => {
  LOG.debug(`${req.method} ${req.url}`)
  next()
})
// specify various resources and apply them to our application
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }))
app.use(expressLayouts)
app.use(errorHandler()) // load error handler
// Load Express Routing
const routes = require('./routes/router.js')
app.use('/', routes)  // load routing to handle all requests
LOG.info('Loaded routing.')
// handle page not found errors
app.use((req, res) => { res.status(404).render('404.ejs') }) 

// call app.listen to start server
const host = app.get('host')
const env = app.get('env')
app.listen(process.env.PORT || 3004, () => {
  console.log(`\nApp running at http://${host}:${port}/ in ${env} mode`)
  console.log('Press CTRL-C to stop\n')
})

module.exports = app
