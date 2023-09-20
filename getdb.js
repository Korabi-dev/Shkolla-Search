const fs = require("fs")
const mongo = require("mongoose")
const models = require("./models");
    let connected = mongo.connect(
        "mongodb+srv://Korabi20:kokimoki123321@shkolla.l3mpojv.mongodb.net/students"
      );
      connected.then(async (connection) => {
        console.log("DB Connected");
        let data = await models.students.find({})
        fs.writeFileSync("db.json", JSON.stringify(data), "utf-8")
        console.log("Saved")
    });