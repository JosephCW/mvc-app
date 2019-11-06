const Datastore = require('nedb') // set up a temporary (in memory) database
//const developerData = require('../data/developers.json') // read in data file
const instructorData = require('../data/instructors.json')
const studentData = require('../data/students.json')
const sectionData = require('../data/sections.json')
const courseData = require('../data/courses.json')


// inject Express app to configure it - EVERYTHING in through argument list

module.exports = (app) => {
  console.log('START data seeder.')
  const db = {} // empty object to hold all collections

  //db.developers = new Datastore() // new object property
  //db.developers.loadDatabase() // call the loadDatabase method
  db.instructors = new Datastore()
  db.instructors.loadDatabase()

  db.students = new Datastore()
  db.students.loadDatabase()

  db.sections = new Datastore()
  db.sections.loadDatabase()
 
  db.courses = new Datastore()
  db.course.loadDatabase()
  // insert the sample data into our datastore
  //db.developers.insert(developerData)
  db.instructors.insert(instructorData)
  db.students.insert(studentData)
  db.sections.insert(sectionData)
  db.courses.insert(courseData)

  // initialize app.locals (these objects are available to the controllers)
  //app.locals.developers = db.developers.find(developerData)
  //console.log(`${app.locals.developers.query.length} developers seeded`)
  app.locals.instructors = db.instructors.find(instructorData)
  app.locals.students = db.students.find(studentData)
  app.locals.sections = db.sections.find(sectionData)
  app.locals.courses = db.courses.find(courseData)
  
  console.log(`${app.locals.students.query.length} studentss seeded`)
  console.log(`${app.locals.instructors.query.length} instructors seeded`)
  console.log(`${app.locals.sections.query.length} sections seeded`)
  console.log(`${app.locals.courses.query.length} courses seeded`)

  console.log('END Data Seeder. Sample data read and verified.')
}
