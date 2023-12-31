process.stdout.write("\x1B[2J\x1B[H");
console.log("Updating Database...");
const mongo = require("mongoose");
let connected = mongo.connect(
  "mongodb+srv://Korabi20:kokimoki123321@shkolla.l3mpojv.mongodb.net/students"
);
const models = require("./models");
const nxenesit = require("./output3.json");
connected.then(async (connection) => {
  await models.students.deleteMany({});
  let done = 0;
  let total = nxenesit.length;
  let newdocs = [];
  for (const nx of nxenesit) {
    let newd = new models.students(nx);
    newdocs.push(newd);
    /* await newd.save();
    done = done + 1;
    console.log(
      `${nx.name}${nx.parent ? ` ${nx.parent} ` : " "}${
        nx.surname
      } | ${done}/${total}`
    );*/
  }
  await models.students.insertMany(newdocs);
  console.log("---------------------------");
  console.log("Saved to database from file");
});
