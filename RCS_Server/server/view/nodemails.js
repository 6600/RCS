 //nodemailer.js
const nodemailer = require('nodemailer');
import dbHelper from '../dbHelper/DBConnection' 
   
//发送邮件
var sendmail = function (mail){
    //创建一个smtp服务器
   const config = {
       host: 'smtp.sina.com',
       port: 465,
       auth: {
           user: 'liyueyangzp@sina.com', //注册的163邮箱账号
           pass: 'a8751f75328f102e' //邮箱的授权码，不是注册时的密码,等你开启的stmp服务自然就会知道了
       }
   };
   // 创建一个SMTP客户端对象
   const transporter = nodemailer.createTransport(config);
       return new Promise((resolve,reject)=>{  
  transporter.sendMail(mail, function(error, info){
    
      if(error) {
          return reject(error);
      }
         return resolve(info.response) 
  }); })
};
  //更新email表 
  var InsertTable = function (datas){   
    let sql  =`truncate table taskemail;`
   // console.log(datas);
     datas.forEach(item => {
        var str = item.email.split('@')
        var email = str[0]
        var address = str[1]
        sql +=`INSERT INTO taskemail(email,verify) VALUES ('`+item.email+`','`+item.verifycode+`');` 
     }); 
        return dbHelper.execPromiseSelect(sql)   
     }
       //更新email表 
  var queryTable = function (){   
    let sql   =`select email as value,verify as verifycode FROM taskemail` 
        return dbHelper.execPromiseSelect(sql)   
     }
var nodemails = {
    sendmail:sendmail,
    InsertTable:InsertTable,
    queryTable:queryTable
}
export default nodemails 