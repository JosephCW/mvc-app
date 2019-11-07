// set up a temporary (in memory) database
const Datastore = require('nedb') 

// Read in data that will be seeded later
const instructorData = require('../data/instructors.json')
const studentData = require('../data/students.json')
const sectionData = require('../data/sections.json')
const courseData = require('../data/courses.json')

// inject Express app to configure it - EVERYTHING in through argument list
module.exports = (app) => {
  console.log('START data seeder.')
  const db = {} // empty object to hold all collections
  // Create datastores and load empty database into db.x
  db.instructors = new Datastore()
  db.instructors.loadDatabase()
  db.students = new Datastore()
  db.students.loadDatabase()
  db.sections = new Datastore()
  db.sections.loadDatabase()
  db.courses = new Datastore()
  db.courses.loadDatabase()

  // Insert the sample data into our datastore
  db.instructors.insert(instructorData)
  db.students.insert(studentData)
  db.sections.insert(sectionData)
  db.courses.insert(courseData)

  // Initialize app.locals (these objects are available to the controllers)
  app.locals.instructors = db.instructors.find(instructorData)
  app.locals.students = db.students.find(studentData)
  app.locals.sections = db.sections.find(sectionData)
  app.locals.courses = db.courses.find(courseData)
  
  // Update log to show quantity of each item seeded
  console.log(`${app.locals.students.query.length} students seeded`)
  console.log(`${app.locals.instructors.query.length} instructors seeded`)
  console.log(`${app.locals.sections.query.length} sections seeded`)
  console.log(`${app.locals.courses.query.length} courses seeded`)

  console.log('END Data Seeder. Sample data read and verified.')
}
