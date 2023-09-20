const mongo = require("mongoose")
exports.getcon = function() {
    let connected = mongo.connect(
        "mongodb+srv://Korabi20:kokimoki123321@shkolla.l3mpojv.mongodb.net/students"
      );
      const models = require("./models");
      connected.then(async (connection) => {
        console.log("DB Connected");
        let data = await models.students.find({})
        if(data) {
          cache = data
        }
      });
      
}