const { Schema, model } = require("mongoose");

let nrq = { type: String, required: false };
let rq = { type: String, required: true };

let s = new Schema({
  name: rq,
  parent: nrq,
  surname: rq,
  id_num: { type: String, required: true, unique: true },
  id_all: { type: String, required: true, unique: false },
  registered: rq,
  drejtimi: rq,
  profile: rq,
  grade: rq,
  subclass: nrq,
  teacher: nrq,
  gender: rq,
  nationality: rq,
  city: rq,
  email: { type: String, required: false, unique: false },
  birthday: rq,
  numbers: { type: Array, required: false },
});
exports.students = new model("Student", s);
