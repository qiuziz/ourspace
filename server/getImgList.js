/*
 * @Author: qiuziz
 * @Date: 2017-08-10 16:19:48
 * */

const qiniu = require("qiniu");
const proc = require("process");
const connect = require('./db');
const express = require("express");
const router = express();

 var accessKey = proc.env.QINIU_ACCESS_KEY;
  var secretKey = proc.env.QINIU_SECRET_KEY;
  var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
  var config = new qiniu.conf.Config();
  //config.useHttpsDomain = true;
  config.zone = qiniu.zone.Zone_z0;
  var bucketManager = new qiniu.rs.BucketManager(mac, config);
  var privateBucketDomain = 'http://ougnpgmkz.bkt.clouddn.com';


  //private
  var deadline = parseInt(Date.now() / 1000) + 3600; //1小时过期

  var bucket = 'ourspace';
  // @param options 列举操作的可选参数
  //                prefix    列举的文件前缀
  //                marker    上一次列举返回的位置标记，作为本次列举的起点信息
  //                limit     每次返回的最大列举文件数量
  //                delimiter 指定目录分隔符
  var options = {
    limit: 10,
    prefix: 'huihui',
  };

 

router.get("/", (req, res) => {
  bucketManager.listPrefix(bucket, options, function(err, respBody, respInfo) {
    if (err) {
      console.log(err);
      throw err;
    }
    var urlList = [], error = {};
    if (respInfo.statusCode == 200) {
      //如果这个nextMarker不为空，那么还有未列举完毕的文件列表，下次调用listPrefix的时候，
      //指定options里面的marker为这个值
      var nextMarker = respBody.marker;
      var commonPrefixes = respBody.commonPrefixes;
      var items = respBody.items;
      items.forEach(function(item) {
        urlList.push({
          id: item.hash,
          url: bucketManager.privateDownloadUrl(privateBucketDomain,item.key, deadline)
        });
      })
    } else {
      error = {
        code: respInfo.statusCode,
        msg: respBody
      }
    }
    res.send(JSON.stringify(urlList.length > 0 ? urlList : error));
  });
});

module.exports = router
