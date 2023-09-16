/*const fs = require('fs');
const data = require("./nxn.json")
const pdata = require("./nxenesit.json")

function find(n,s) {
let found = []
for(const nx of pdata) {
    if(n.toLowerCase() == nx.name.trim().toLowerCase() && s.toLowerCase() == nx.surname.trim().toLowerCase()) {
        found.push(nx)
    }
}
if(found.length > 1) {
    console.log(n, s)
    return
}
return found[0];
}

for(const nx of data) {
let nx2 = find(nx.name, nx.surname, nx.gender)
if(nx2 && nx2?.pname) {
nx.parent = nx2.pname
}
}
fs.writeFileSync('output.json', JSON.stringify(data, null, 2), 'utf8');

console.log('Processing completed. Data saved to output.json.');
*/
const data = require("./output2.json");
const pdata = require("./nxenesit.json");
const fs = require("fs");
function cw(inputString) {
  // Split the input string into words using space as the separator
  const words = inputString.toLowerCase().split(" ");

  // Capitalize the first letter of each word
  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );

  // Join the capitalized words back together with a space separator
  const result = capitalizedWords.join(" ");

  return result;
}
function find(n, s) {
  let found = [];
  for (const nx of pdata) {
    if (!nx.pname) continue;
    if (
      n.toLowerCase() == nx.name.trim().toLowerCase() &&
      s.toLowerCase() == nx.pname.trim().toLowerCase()
    ) {
      found.push(nx);
    }
  }
  if (found.length > 1) {
    console.log(n, s);
    return;
  }
  return found[0];
}
for (const nx of data) {
  fs.writeFileSync("output3.json", JSON.stringify(data, null, 2), "utf8");
  if (!nx.parent) continue;
  let f = find(nx.name, nx.parent);
  if (f) {
    let sub = f.class.replace(/[^0-9]/g, "");
    if (sub) {
      nx.subclass = sub;
    }
    if (f.teacher) {
      nx.teacher = cw(f.teacher);
    }
    if (nx.parent) {
      nx.parent = cw(nx.parent);
    }
  }
}

fs.writeFileSync("output3.json", JSON.stringify(data, null, 2), "utf8");
console.log("Complete");
