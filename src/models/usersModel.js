const {readFileSync,writeFileSync, fdatasync, lstat} = require('fs')
const { resolve } = require('path');
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
return users.find (user => users.id == user.id)
},

create : function (data) {
let file = resolve(__dirname, '../data', 'users.json');
let info = readFileSync(file);
let users = JSON.parse(info);
return users.find (user=> users.id== user.id);
 /* return Object({
    id: users.length === 0 ? 1 : last.id +1,
    username:data.name,
    lastname:data.lastname,
    email:data.email.toLowerCase(),
    password :data.password,
    isAdmin:data.isAdmin.includes('@lasmarias.com'),
})*/

},

write: function (data) {
let file = resolve(__dirname, '../data', 'users.json');
let info = JSON.stringify(data,null);
return writeFileSync(file, info);
}


}
module.exports = model















