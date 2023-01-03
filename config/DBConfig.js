const mysql = require("mysql2");
let conn = mysql.createConnection({
    host : '13.209.133.210',
    user : 'iqzzan11',
    password : "8685",
    port : "55270",
    database : "sys",
    dateStrings: 'date'
})
module.exports = conn;