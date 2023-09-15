const fs = require('fs');
const data = require("./nxn.json")
// Initialize variables to keep track of the current grade and first letter of the name
let currentGrade = data[0].grade;
let currentFirstLetter = data[0].name.charAt(0);
let counter = 1;
for(const nxenesi of data) {
if(nxenesi.grade != currentGrade) {
counter = 1;
}
if(currentFirstLetter > nxenesi.name.charAt(0)){
    counter = counter + 1
}
nxenesi.subgrade = counter
currentGrade = nxenesi.grade
currentFirstLetter = nxenesi.name.charAt(0)
}

// Save the processed data to a new file called "output.json"
fs.writeFileSync('output.json', JSON.stringify(data, null, 2), 'utf8');

console.log('Processing completed. Data saved to output.json.');
