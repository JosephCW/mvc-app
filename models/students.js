/**
*  Instructor Model
*  Describes the characteristics of each attribute in an instructor resource.
*
* @author Chase Smith <s523929@nwmissouri.edu>
* @requires mongoose
*
*/
const mongoose = require('mongoose')

const StudentSchema = new mongoose.Schema({

  _id: {
    type: Number,
    unique: true,
    required: true
  },
  email: {
    type: String,
    minlength: 5,
    maxlength: 100,
    unique: true
  },
  given: {
    type: String,
    minlength: 3,
    maxlength: 100,
    default: 'Given name'
  },
  family: {
    type: String,
    minlength: 3,
    maxlength: 100,
    default: 'Family name'
  },
  gpa: {
    type: Number,
    required: true,
    min: 0,
    max: 4,
    default: 0
  },
  website: {
    type: String,
    default: "http://yourwebsite.com"
  },
  github: {
    type: String,
    default: "https://www.github.com/"
  },
  section_id: {
    type: Number,
    default: 0
  }
})
module.exports = mongoose.model('Student', StudentSchema)
