const Datastore = require('nedb') // set up a temporary (in memory) database
//const developerData = require('../data/developers.json') // read in data file
const instructorData = require('../data/instructors.json')

// inject Express app to configure it - EVERYTHING in through argument list

module.exports = (app) => {
  console.log('START data seeder.')
  const db = {} // empty object to hold all collections

  //db.developers = new Datastore() // new object property
  //db.developers.loadDatabase() // call the loadDatabase method
  db.instructors = new Datastore()
  db.instructors.loadDatabase()

  // insert the sample data into our datastore
  //db.developers.insert(developerData)
  db.instructors.insert(instructorData)

  // initialize app.locals (these objects are available to the controllers)
  //app.locals.developers = db.developers.find(developerData)
  //console.log(`${app.locals.developers.query.length} developers seeded`)
  app.locals.instructors = db.instructors.find(instructorData)
  console.log(`${app.locals.instructors.query.length} instructors seeded`)

  console.log('END Data Seeder. Sample data read and verified.')
}
