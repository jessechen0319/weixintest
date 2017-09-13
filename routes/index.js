var express = require('express');
var router = express.Router();
var wechat = require('wechat');

const SETTING = require('jsonfile').readFileSync(__dirname+"/server/config.json");

crypto = require('crypto'), //引入加密模块
  /* GET home page. */
  router.get('/', function (req, res, next) {
    var signature = req.query.signature,//微信加密签名
      timestamp = req.query.timestamp,//时间戳
      nonce = req.query.nonce,//随机数
      echostr = req.query.echostr;//随机字符串

    //2.将token、timestamp、nonce三个参数进行字典序排序
    var array = [SETTING.ACCESS_TOKEN, timestamp, nonce];
    
    array.sort();

    //3.将三个参数字符串拼接成一个字符串进行sha1加密
    var tempStr = array.join('');
    const hashCode = crypto.createHash('sha1'); //创建加密类型 
    var resultCode = hashCode.update(tempStr, 'utf8').digest('hex'); //对传入的字符串进行加密

    //4.开发者获得加密后的字符串可与signature对比，标识该请求来源于微信
    if (resultCode === signature) {
      res.send(echostr);
    } else {
      res.send('mismatch');
    }
  });

module.exports = router;
