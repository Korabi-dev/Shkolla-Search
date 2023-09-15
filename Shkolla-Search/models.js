const { Schema, model } = require("mongoose")

let s = new Schema({
    name: {type: String, required: true}, 
    surname: {type: String, required: true},
    id_num: {type: String, required: true, unique: true},
    id_all: {type: String, required: true, unique: true},
    registered: {type: String, required: true},
    drejtimi: {type: String, required: true},
    profile: {type: String, required: true},
    grade: {type: String, required: true},
    gender: {type: String, required: true},
    nationality: {type: String, required: true},
    city: {type: String, required: true},
    email: {type: String, required: false, unique: true},
    birthday: {type: String, required: true},
    numbers: {type: Array, required: false}
})
exports.students = new model("Student", s)