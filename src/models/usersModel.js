const {readFileSync,writeFileSync, fdatasync} = require('fs')
const { resolve } = require('path')



const model = {

index : function () {
    let file = path.join(__dirname, '../data', 'users.json');
    let data = readfleSync(file);
    return JSON.parse(data);
},
one: function () {
let file = path.join(__dirname, '../data', 'users.json');
let data = readfleSync(file);
let users = JSON.parse(data);
return users.find (find=> users.email== users.email)
},

create : function (data) {
let file = resolve(__dirname, '../data', 'users.json');
let info = readFileSync(file);
let users = JSON.parse(info)
return users.find (find=> users.email== users.email)
},

write: function (data) {
let file = resolve(__dirname, '../data', 'users.json');
let info = JSON.stringify(data,null);
return writeFileSync(file, info);
}


}
module.exports = model















