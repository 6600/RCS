
import  wsTotable                             from '../../server/view/wsTotable' 
import  tasklist                              from '../../server/view/Tasklist' 
import  nodemails                             from '../../server/view/nodemails'  
import  config                                from '../../assets/config/config'
var logger = require('../../assets/log4js').logger;

let emails = ''
nodemails.queryTable().then(data=>{
  data.forEach(item=>{
    emails+=item.value+','
  })
})
emails=emails.substring(0,emails.length-1) 

/** 
 * @name RCSdispatch            RCSdispatch将获取到的UpdateAGVWorkTime，UpdateAGVChargeStatus,TaskUpdate转发到前端;同时将TaskUpdate，UpdateAGVWorkTime存入数据库
 *                              同时将TaskUpdate的超时任务通过nodemailer转发到邮箱.
 * @param {socket} context      websocket上下文，
 * @param {json} data           socket接收到的数据
 */
function RCSdispatch(context,data){
  data = JSON.parse(data)   
  // 特殊位置的小车
  if (data.RequestType == 'UpdateAGVStatus') {
    data.List.forEach(element => {
      if (config.specialArea[element.ID]) {
        const temp = config.specialArea[element.ID]
        console.log(temp, parseInt(element.X), parseInt(element.Y))
        if (((temp[0] < parseInt(element.X)) && (parseInt(element.X) < temp[1])) && ((temp[2] < parseInt(element.Y)) && (parseInt(element.Y) < temp[3]))) {
          console.log(`特殊位置的小车: ${element}`)
          element.special = true
        }
      }
    });
  }
  //转发除了AGVworktime,AGVcharge的其他即时信息到页面端
  if(typeof(data.RequestType)!='undefined'){ 
    if(data.RequestType != 'UpdateAGVWorkTime'&&data.RequestType!='UpdateAGVChargeStatus'){    //这个是不存在下面项的判断，也就是说indexof为-1时可进行socket.brocast类型的传输 // 1,3,4,12,13 //13
      context.clients.forEach(function each(client) { 
      try{
        client.send(JSON.stringify(data));  
       logger.info('[websocket][send]广播'+data.RequestType+'信息'); 
      }catch(e){ 
      }
    });
  }  
   
  //将rcs端的taskinfo agvworktime,agvcharege信息存入数据库
  if(data.RequestType=='TaskUpdate'){
   //根据Type 转换成table表名taskinfo,agvworktime,agvcharge 
  // let table = data.RequestType.replace('Update','');table=table.replace('Status','');table=table.toLowerCase()
    function setData (item) {
      tasklist.QueryTaskID(item.TaskID).then(res=>{ 
        if(res.length==0){
         // console.log(res.length);
          wsTotable.InsertTaskinfo('taskinfo',item).then(res=>{                   
           logger.info('[UpdateTaskinfo][InsertTaskinfo]添加一数据到taskinfo数据表');
          })   
        }else{
          logger.info('[UpdateTaskinfo][UpdateTaskinfo]:存在TaskID:'+item.TaskID+';'); 
          wsTotable.UpdateTaskinfo('taskinfo',item,item.TaskID) 
        }
      }) 
    }
    //数据入库
    if (data.List) {
      data.List.forEach(item=>{     
        setData(item)
      })
    } else {
      setData(data)
    }
        
  }else if(data.RequestType=='UpdateAGVWorkTime'){
    logger.info('[UpdateAGVWorkTime][InsertWorktime]:插入稼动率表;'); 
    if(typeof(data.List)=='undefined'){ 
        wsTotable.InsertWorktime('agvworktime',data)  
    } else{
      data.List.forEach(item=>{
        wsTotable.InsertWorktime('agvworktime',item)  
      })
    } 
  }else if(data.RequestType=='UpdateAGVChargeStatus'){
    logger.info('[UpdateAGVChargeStatus][InsertWorktime]:插入充电信息;'); 
    if(typeof(data.List)=='undefined'){ 
        wsTotable.InsertTable('agvcharge',data)  
    }else{
      data.List.forEach(item=>{
        wsTotable.InsertTable('agvcharge',item) 
  
      })
    } 
   }
  } 
}
export default RCSdispatch