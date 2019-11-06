/**
*  Instructor Model
*  Describes the characteristics of each attribute in an instructor resource.
*
* @author Connor Beshears <connorbeshears@gmail.com>
* @requires mongoose
*
*/
const mongoose = require('mongoose')

const SectionSchema = new mongoose.Schema({

    _id: {
        type: Number,
        unique: true,
        required: true
    },
    SectionNumber: {
        type: String,
        unique: false,
        required: true
    },
    Days: {
        type: String,
        unique: false,
        required: true
    },
    StartTime: {
        type: Number,
        unique: false,
        required: true
    },
    RoomNumber: {
        type: String,
        unique: true,
        required: true
    },
    InstructorID: {
        type: Number,
        unique: false,
        required: true
    },
    CourseID: {
        type: Number,
        unique: false,
        required: false
    }

})
module.exports = mongoose.model('Student', StudentSchema)
