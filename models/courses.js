/**
*  Courses Model
*  Describes the characteristics of each attribute in an course resource.
*
* @author Kevin Hart <s526939@nwmissouri.edu>
* @requires mongoose
*
*/
const mongoose = require('mongoose')

const CourseSchema = new mongoose.Schema({

  _id: {
    type: Number,
    unique: true
  },
  SchoolNumber: {
    type: Number,
    default: 44
  },
  CourseNumber: {
    type: Number,
    default: 563
  },
  Name: {
    type: String,
    minlength: 3,
    maxlength: 100,
    default: 'Course Name'
  },
  inSpring: {
    type: Boolean,
    default: false
  },
  inSummer: {
    type: Boolean,
    default: false
  },
  inFall: {
    type: Boolean,
    default: false
  }
})
module.exports = mongoose.model('Course', CourseSchema)