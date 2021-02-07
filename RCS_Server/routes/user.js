import express from 'express'
import dbHelper from '../server/dbHelper/DBConnection'

var router = express.Router();
//登录时的查询操作
function queryuser(user){
  // 查询 用户的最后操作时间距离当前时间的小时
  let sql = ` SELECT * FROM user  WHERE user = ? `;
  let param = [user];
  var res = ''
 return dbHelper.execPromiseSelect(sql,param)  
}
//注册时的查询操作
function reguser(user,pass,phone){
  // 查询 用户的最后操作时间距离当前时间的小时
  let sql = 'INSERT INTO user(user,pass,phone) VALUES(?,?,?)';
  let param = [user,pass, phone];  
  return dbHelper.execPromiseSelect(sql,param) 
 
}

//如果访问login这个接口,就是执行下面这段代码
router.post('/login',function(req,res){
  //前台发送的请求,都在req.query中 
   var users = {}
   var user=req.body.user;
   var pass=req.body.pass;
   queryuser(user).then((data)=>{   
        users = data[0]
       if(users==null){    //send可以直接写json  //前台接收到的格式也是json
        res.send({ok:false,msg:"此用户不存在"});
      }else{
        if(users['pass']!=pass){
          res.send({ok:false,msg:"密码错误"});
        }else{
          res.send({ok:true,msg:"登陆成功"});
        } } 
   }) 
   
});
//
router.post('/checkuser',function(req,res){
   
  var user=req.body.user; 
  return queryuser(user).then((data)=>{
    var users = data[0]  
         console.log(users);
    if(users==null){
      res.send({ok:true,code:20000}); 
    }else{
        res.send({ok:false,code:500,msg:'此用户已存在'}); 
    }
  })  
});
//如果访问reg这个接口,就会执行下面这段代码
router.post('/reguser',function(req,res){
   
  var user=req.body.user;
  var pass=req.body.pass;
  reguser(user,pass).then(data=>{
    data!=null?res.send({ok:true,code:20000}):res.send({ok:false,code:500})
  })  
});

module.exports = router;
