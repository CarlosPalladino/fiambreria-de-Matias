const {readFileSync,writeFileSync, fdatasync} = require('fs')
const { resolve } = require('path');
/*const {hashSync}= require('bycript');*/

const model= {

index : function () {
    let file = resolve(__dirname, '../data','users.json');
    let data = readFileSync(file);
    return JSON.parse(data);
},
one: function (email) {
let file = resolve(__dirname, '../data', 'users.json');
let data = readFileSync(file, {encoding: 'utf8'});
let users = JSON.parse(data);
return users.find (user => user.email == email)
},

create : function (data){
let file = resolve(__dirname,'../data', 'users.json');
let info = readFileSync(file);
let users = JSON.parse(info);
let last =users[users.length - 1];
 return Object({
    id: users.length === 0 ? 1 : last.id +1,
    username:data.name,
    email: data.email,
    lastname:data.lastname,
    password :data.password,
    isAdmin:data.isAdmin.in
}) 
},

write: function (data) {
let file = resolve(__dirname, '../data', 'users.json');
let info = JSON.stringify(data,null);
return writeFileSync(file, info);
}


}
module.exports = model















