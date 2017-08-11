/*
 * @Author: qiuziz
 * @Date: 2017-08-11 12:15:50
 * */

var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://huihui:14360zhuQQ@localhost:27017/huihui'; // 数据库为 huihui
 
 
function connect(callback) {
    MongoClient.connect(DB_CONN_STR, function(err, db) {
        callback(err, db);
    });
}

module.exports = connect;
