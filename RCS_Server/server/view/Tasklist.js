
import dbHelper from '../dbHelper/DBConnection'

  function getOrStr (arrData, keyName) {
    if (arrData == undefined || typeof arrData == 'string' || arrData.length < 1) {
      arrData = ''
    } else if (arrData.length == 1) {
      arrData = `and ${keyName}='${arrData[0]}' `
    } else {
      arrData = `and (${keyName} = '` + arrData.join(`' or ${keyName} = '`) + "') "
    }
    return arrData
  }
  //start 开始日期，end结束日期，type：需要分组的字段,daymon:根据天或月查询
  var queryTasklist =function (ColArr,StartTime,FinishTime,AGVID,StartPlace,EndPlace, OrderID, TaskStatusDescription, name){ 
    let sql =``
    AGVID = getOrStr(AGVID, 'AGVID')
    StartPlace = getOrStr(StartPlace, 'StartPlaceDescription')
    EndPlace   = getOrStr(EndPlace, 'EndPlaceDescription')
    TaskStatusDescription = getOrStr(TaskStatusDescription, 'TaskStatusDescription')
    OrderID = OrderID ? `and OrderID like '%${OrderID}%'` : ``
    const runStr = name == 'now'? ` and (TaskStatusDescription != '已完成' and TaskStatusDescription != '异常')`: ''
    let param = AGVID + StartPlace + EndPlace + OrderID + TaskStatusDescription + runStr
    sql =`select  * FROM taskinfo WHERE SetTime >='` + StartTime+`' and SetTime<='`+FinishTime+`' and TaskTypeName not like '%充电%' `+param+` order by SetTime desc`
    console.log(sql)
    //  console.log('返回查询列表',sql);
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
  var queryAgvtask = function () { 
    let sql =``
  
    sql =`select  * FROM agvtask`
    return dbHelper.execPromiseSelect(sql)
  }
  var queryChargepile = function () { 
    let sql =``
  
    sql =`select  * FROM chargepile`
    return dbHelper.execPromiseSelect(sql)
  }
  var print = function (id) {
    return dbHelper.execPromiseSelect(`UPDATE taskinfo SET PrintNum = IF(PrintNum, PrintNum + 1, 1) WHERE TaskID = '${id}';`)
  }

 let tasklist = { 
  queryTasklist:queryTasklist,
  QueryTaskID:QueryTaskID,
  DeleteTaskID:DeleteTaskID,
  print: print,
  queryAgvtask: queryAgvtask,
  queryChargepile: queryChargepile
};
  
 export default tasklist;