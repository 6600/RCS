 
var Mapmark   =require('./map')
var Update    =require('./map') 
var {path}      =require('./map') 
const io      = require('socket.io-client');   //

//var ws = require("nodejs-websocket"); 
let port = 8210  
var socket = io.connect('http://localhost:'+port); 
//定义mock 模拟socket数据
  
    var agvworktime = {Type:"UpdateAGVWorkTime"	,     ID:"AGV2"	,  IP:"22.22.22.22"	,NormalTimeStart:"2017-08-26 11:36:04"	,NormalTimeEnd:"2017-08-26 12:11:09"	,AbnormalTimeStart:"2017-06-18 16:44:04"	,AbnormalTimeEnd:"2017-06-18 17:01:01"	,date:"1503718564"}
    var agvcharge=    {Type:"UpdateAGVChargeStatus"	, ID:"AGV2",	 IP:"22.22.22.22"	,StartChargeTime:"2017-08-26 11:36:04"	,StopChargeTime:"2017-08-26 12:11:09"}
    var taskinfo =    {Type:'UpdateTaskInfo',         TaskID:'2020-08-22 10:10:01',TaskTypeName:'原料配送任务',TaskStatus:'已完成',AGVID:'C1',StartPlace:'仓库发料区',EndPlace:'2楼线边仓'
       ,SetTime:'2020-08-22 10:08:02',StartTime:'2020-08-22 10:10:01',FinishTime:'2020-08-22 10:20:02',Sender:'people1',Receiver:'people2',OrderID:'工单ID',MaterialID:'物料ID',MaterialNum:'物料数量'}  
  //var interval
  var x1 = 705,y1=600,x2=920,y2=600          //agv1,agv2的 初始位置 
  var i = 1,val = 'AGV';                     //agvstatus ，agvstatus 初始变量  
  var num =0    //发送计数y
  var pathidx = 0 
  var nextpath = path.floor1                //选择楼层
  function InitAGV(){
    //var idx=parseInt(Math.random()*4);       //产生0---4的随机数
    var idx= 0
    
    this.AGV = Mapmark.Mapmark[idx+2]                           //从mark中随机选择一辆车2,3
    this.AGV.x = path.floor1.path[pathidx].x;this.AGV.y=path.floor1.path[pathidx].y
    this.AGV.x += nextpath.offx;this.AGV.y +=nextpath.offy
 
  } 
  InitAGV.prototype = {
    getAGV:function(){ return this.AGV }
  }
  var AGVF = new InitAGV()
  function AGVrand(){  
    console.log(nextpath.path[pathidx+2]);
    if(pathidx>=8)
      pathidx = 0
    if(nextpath.path[pathidx+2]!='undefined'){
    var next  =  nextpath.path[pathidx+1]
    var nextx =  next.x + nextpath.offx
    var nexty =  next.y + nextpath.offy
    var diffx =  nextx - AGVF.AGV.x
    var diffy =  nexty - AGVF.AGV.y 
  //  console.log(AGVF.AGV.x);
        if(Math.abs(diffx)>5||Math.abs(diffy)>5){
          Math.abs(diffx)>5?(diffx>0?AGVF.AGV.x+=10:AGVF.AGV.x-=10):''
          Math.abs(diffy)>5?(diffy>0?AGVF.AGV.y+=10:AGVF.AGV.y-=10):''
        }else{
           if(typeof(next.angle)!="undefined"){
            var diffa = next.angle - AGVF.AGV.Th 
            if(Math.abs(diffa)>4){
              diffa>0?AGVF.AGV.Th+=15:AGVF.AGV.Th-=15
            }else{
              pathidx++
            }
           }else{
             pathidx++
           }
        }
       console.log(pathidx,AGVF.AGV.Th,typeof(next.angle)!='undefined');
 //   var Agvstaus = Update.Update['Agvstaus']
     // Object.assign(Agvstaus, AGVF.getAGV());
        return AGVF.getAGV() 
      }else{
       
        pathidx=0
      }
  }
  function randAGVmap(idx){
    //var idx=parseInt(Math.random()*4);
    //
    var index = idx%2
    var fidx=parseInt(Math.random()*2);
    var xy = [{x:976,y:2201},{x:4478,y:2252}]
    var AGV = Mapmark.Mapmark[2]                           //从mark中随机选择一辆车2,3
        AGV.x = path.floor1.path[pathidx].x;AGV.y=path.floor1.path[pathidx].y
        AGV.x += xy[index].x; AGV.y +=xy[index].y
    return AGV
  }
 // var server = ws.createServer(function(conn){
 //  conn.on("text", function (type) {
 function getmockdata(idx){ // 监听服务端的消息“msg”
 //   console.log('连接成功');
   // clearInterval(interval)
     // Avgstaus.ID = val+i;
      var task = Update.Update['Agvtask']
      
      var datestr = task.TaskID.replace(/-/g,"/"),date = new Date(datestr),min = date.getMinutes()
       var agvdata= AGVrand()

      //var agvdata= randAGVmap(idx)
      task.state = Math.random()>0.5; 
      num++
       i=parseInt(Math.random()*5);// Update['Avgtask'].ID  = val+i;
      date.setMinutes(min+5);task.TaskID=date.toLocaleString()  
       
      console.log('成功发送第'+num+'数据:'+agvworktime.Type+','+agvcharge.Type+''+taskinfo.Type);
   // rcs',[agv(),task,agvworktime,agvcharge,taskinfo]
     return [agvdata]
  }

export default getmockdata 
  //})
  //conn.on("close", function (code, reason) {
  //    console.log("关闭连接")
  //});
  //conn.on("error", function (code, reason) {
  //    console.log(code,reason)
  //});y
  //}).listen(port)


