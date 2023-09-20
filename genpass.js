const fs = require("fs")
const models = require("./models.js")
const mongo = require("mongoose")
const u = require("uuid4")
let ids = {}
let dt = []
function m(inputString) {
    if (inputString.length < 5) {
        return inputString;
    }

    const last5Characters = inputString.replace(/-/g, "").slice(-5);
    let modifiedCharacters = '';

    for (const char of last5Characters) {
        const randomCase = Math.random() < 0.5 ? char.toUpperCase() : char.toLowerCase();
        modifiedCharacters += randomCase;
    }
    return modifiedCharacters;
}
    let connected = mongo.connect(
        "mongodb+srv://Korabi20:kokimoki123321@shkolla.l3mpojv.mongodb.net/students"
      );
      connected.then(async (connection) => {
        console.log("DB Connected");
        let data = await models.students.find({})
        for(const st of data) {
            if(st.parent){
                let id = u()
                if(ids[m(id)]) {
                    while(ids[m(id)]) {
                        id = u()
                    }
                }
                ids[m(id)] = st.parent;
                const newd = new models.parents({
                    name: st.parent,
                    surname: st.surname,
                    student: st.name,
                    data: st,
                    pass: m(id),
                    completed: false
                })
               dt.push(newd) 
            }
        }
        await models.parents.insertMany(dt);
        console.log("Saved")
    });