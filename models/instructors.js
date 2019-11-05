/**
*  Instructor Model
*  Describes the characteristics of each attribute in an instructor resource.
*
* @author Joseph Watts <s519653@nwmissouri.edu>
* @requires mongoose
*
*/
const mongoose = require('mongoose')

const InstructorSchema = new mongoose.Schema({

  _id: {
    type: Number,
    unique: true
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
  salary: {
    type: Number,
    required: true,
    default: 0
  },
  github: {
    type: String,
    default: "https://www.github.com/"
  }
})
module.exports = mongoose.model('Instructor', InstructorSchema)
