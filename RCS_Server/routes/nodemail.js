import express                                                           from        'express'
import ResJson                                                           from        '../assets/utils/ResJson'
import nodemails                                                         from        '../server/view/nodemails'

var logger = require('../assets/log4js').logger;
//源码参考：https://blog.csdn.net/YmwWow/article/details/83476942
//官网：https://nodemailer.com/about/
//新浪邮箱报错代码 ：http://www.email-cm.com/news/html/1051.html
var router = express.Router();
router.post('/verifyemail', function (req, res, next) {
  var resJson = new ResJson() 
	try {
 
    var email  =req.body.email;   console.log(email); 
    var code =   createSixNum();//这里是我写的生成的随机六位数，等等下面给代码
    var date = new Date();//获取当前时间

    var mail = {
        // 发件人
        from: 'liyueyangzp@sina.com',
        // 主题
        subject: '接受凭证',//邮箱主题
        // 收件人
        to:email,//前台传过来的邮箱
        // 邮件内容，HTML格式
        text: '用'+code+'作为你的验证码'//发送验证码
    };

    nodemails.sendmail(mail).then(data=>{
        resJson.verifycode = code 
        logger.info('验证码发送成功 ')
        res.json(resJson); 
      }).catch(err=>{
        logger.error(err);
	    	next(err);
      });//发送邮件
	} catch (error) {
		logger.error(error);
		next(error);
	}
});
router.post('/queryemail', function (req, res, next) {
  var resJson = new ResJson() 
	try {  
    nodemails.queryTable().then(data=>{
      resJson.returnData = data
      logger.info('返回邮箱表 ')
      res.json(resJson); 
    }).catch(err=>{
      logger.error(err);
      next(error);
    });
    
	} catch (error) {
		logger.error(error);
		next(error);
	}
});
router.post('/updatemail', function (req, res, next) {
  var resJson = new ResJson() 
	try { 
    var emails  =JSON.parse(req.body.emails);  
    nodemails.InsertTable(emails).then(data=>{
      resJson.code = '20000' 
      console.table('更新Taskmail表成功')
      res.json(resJson); 
    }).catch(err=>{
      logger.error(err);
      next(error);
    });
    
	} catch (error) {
		logger.error(error);
		next(error);
	}
});
function createSixNum(){
    var Num="";
    for(var i=0;i<6;i++)
    {
        Num+=Math.floor(Math.random()*10);
    }
    return Num;
}
module.exports = router;
