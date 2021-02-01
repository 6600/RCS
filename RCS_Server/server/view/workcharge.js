import dbHelper from '../dbHelper/DBConnection'


  //start 开始日期，end结束日期，type：需要分组的字段,daymon:根据天或月查询
  var QueryTask =function (ColArr,StartTime,FinishTime,AGVID,StartPlace,EndPlace){ 
    let sql =``
    let CollStr = new Array();
        ColArr.forEach(item => {                     //遍历取列名拼接
           CollStr+=item+','
        });
        CollStr = CollStr.substring(0, CollStr.length - 1);  
     AGVID      = AGVID=="全部"?``:`and AGVID='`+AGVID+`'`
     StartPlace = StartPlace=="全部"?``:`and StartPlaceDescription='`+StartPlace+`'`
     EndPlace   = EndPlace=="全部"?``:`and EndPlaceDescription='`+EndPlace+`'`
    let param = AGVID+StartPlace+EndPlace
    sql =`select  `+CollStr+` FROM taskinfo WHERE StartTime >='`
    +StartTime+`' and StartTime<='`+FinishTime+`' `+param+` `
    
    console.log(sql);
   return dbHelper.execPromiseSelect(sql)
  }
  var QueryTaskID =function (id){ 
    let sql =``
  
    sql =`select  * FROM taskinfo WHERE TaskID ='`+id+`' `
    
   // console.log(sql);
   return dbHelper.execPromiseSelect(sql)
  }
  var DeleteTaskID =function (data,id){ 
    let sql =``
  
    sql =`DELETE FROM  taskinfo   WHERE TaskID ='`+id+`';` 

  //  console.log(sql);
   return dbHelper.execPromiseSelect(sql)
  }
    //插入数据：在socket端调用
var UpdateTable=function (table,obj,id){ 
   let ColArr = ['TaskID','AGVID','AGVIP','StartPlaceDescription','EndPlaceDescription'
     ,'TaskTypeName','TaskType','TaskStatus','TaskStatusDescription','StartTime','FinishTime','SetTime','TokenFinishTime'
     ,'TokenStartTime','TokenMaxTime','TokenOffSet','Sender','MaterialNum','MaterialID','Number'
     ,'Unit','LabelNumber','LineID','OrderID']
   let CollStr = new Array();
   let valStr = new Array()
         ColArr.forEach(item => {                     //遍历取列名拼接
            CollStr+=item+','
            valStr+=item+"='"+obj[item]+"',"
         });
         CollStr = CollStr.substring(0, CollStr.length - 1);  
         valStr = valStr.substring(0, valStr.length - 1);  
 
   let sql =`update `+table+` set ` +valStr + ` where TaskID ='`+id+`'`
 //   console.log(sql) 
      return dbHelper.execPromiseSelect(sql)   
   }
  //插入数据：在socket端调用
var InsertTable=function (table,obj){
 // let col = Object.keys(obj).join(',')
 // let vals=Object.values(obj)
  let ColArr = ['TaskID','AGVID','AGVIP','StartPlaceDescription','EndPlaceDescription'
    ,'TaskTypeName','TaskType','TaskStatus','TaskStatusDescription','StartTime','FinishTime','SetTime','TokenFinishTime'
    ,'TokenStartTime','TokenMaxTime','TokenOffSet','Sender','MaterialNum','MaterialID','Number'
    ,'Unit','LabelNumber','LineID','OrderID']
  let CollStr = new Array();
  let valStr = new Array()
        ColArr.forEach(item => {                     //遍历取列名拼接
           CollStr+=item+','
           valStr+="'"+obj[item]+"',"
        });
        CollStr = CollStr.substring(0, CollStr.length - 1);  
        valStr = valStr.substring(0, valStr.length - 1);  
 //console.log(CollStr,valStr)
  let sql =`INSERT INTO `+table+`(`+CollStr+`) VALUES (`+valStr+`)` 
  //  vals.join(',')
  //let param = vals
     return dbHelper.execPromiseSelect(sql)   
  }
 let tasklist = {  
  
  QueryTask:QueryTask,
  QueryTaskID:QueryTaskID,
  DeleteTaskID:DeleteTaskID,
  InsertTable:InsertTable,
  UpdateTable:UpdateTable 
};
  
 export default tasklist;