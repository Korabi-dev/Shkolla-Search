const nxenesit = require("./nxenesit.json")

for(const nxenesi of nxenesit["10"]) {
    if(!nxenesi.pname) {console.log(nxenesi.name, nxenesi.surname, nxenesi.class); continue}
    //console.log(nxenesi.pname)
}