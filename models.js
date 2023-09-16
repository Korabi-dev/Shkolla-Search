const { Schema, model } = require("mongoose");

let nrq = { type: String, required: false };
let rq = { type: String, required: true };

let s = new Schema({
  name: rq,
  surname: rq,
  id_num: { type: String, required: true, unique: true },
  id_all: { type: String, required: true, unique: false },
  registered: rq,
  drejtimi: rq,
  profile: rq,
  grade: rq,
  gender: rq,
  nationality: rq,
  city: rq,
  email: { type: String, required: false, unique: false },
  birthday: rq,
  numbers: { type: Array, required: false },
  parent: nrq,
  subgrade: nrq,
  teacher: nrq,
});
exports.students = new model("Student", s);
