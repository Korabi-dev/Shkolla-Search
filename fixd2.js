const data = require("./output3.json");
for (const nx of data) {
  if (!nx.subclass) console.log(nx.name, nx.id_num);
}
