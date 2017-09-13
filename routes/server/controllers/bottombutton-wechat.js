//  {
//      "button":[
//      {	
//           "type":"click",
//           "name":"今日歌曲",
//           "key":"V1001_TODAY_MUSIC"
//       },
//       {
//            "name":"菜单",
//            "sub_button":[
//            {	
//                "type":"view",
//                "name":"搜索",
//                "url":"http://www.soso.com/"
//             },
//             {
//                  "type":"miniprogram",
//                  "name":"wxa",
//                  "url":"http://mp.weixin.qq.com",
//                  "appid":"wx286b93c14bbf93aa",
//                  "pagepath":"pages/lunar/index"
//              },
//             {
//                "type":"click",
//                "name":"赞一下我们",
//                "key":"V1001_GOOD"
//             }]
//        }]
//  }
var WechatAPI = require('wechat-api');
const SETTING = require('jsonfile').readFileSync(__dirname+"/../config.json");

const buttonObj =  {
    "button":[
     {
          "name":"菜单",
          "sub_button":[
          {	
              "type":"view",
              "name":"搜索",
              "url":"http://www.soso.com/"
           },
           {
                "type":"miniprogram",
                "name":"wxa",
                "url":"http://mp.weixin.qq.com",
                "appid":"wx286b93c14bbf93aa",
                "pagepath":"pages/lunar/index"
            }]
      }]
};
function sendButtonsToWeiChat(req, res, next){
    var api = new WechatAPI(SETTING.appID, SETTING.appsecret);
    api.createMenu(buttonObj, function(err, result){
        console.error(err);
        console.log(result);
        next();
    });
}

module.exports.sendButtonsToWeiChat = sendButtonsToWeiChat;