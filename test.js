const fs = require("fs");

// 读取数据库(读出来的数据是字符串，变成数组)
const usersString = fs.readFileSync("./db/users.json").toString();
const usersArray = JSON.parse(usersString)
// 不要用眼睛编程
// console.log(typeof usersString)
// console.log(usersString)
// console.log(typeof usersArray)  //object 数组是对象
// console.log(usersArray instanceof Array)
// console.log(usersArray)

// 写数据库(将数组变成字符串再写入json)
const user3 = {id:3, name: 'changh', password: 'changh'}
usersArray.push(user3)
const string = JSON.stringify(usersArray)
fs.writeFileSync('./db/users.json', string)



