
import dbHelper from '../dbHelper/DBConnection'

  function getOrStr (arrData, keyName) {
    if (typeof arrData == 'string' || arrData.length < 1) {
      arrData = ''
    } else if (arrData.length == 1) {
      arrData = `and AGVID='${AGVID[0]}'`
    } else {
      arrData = "and (AGVID = '" + arrData.join(`' or ${keyName} = '`) + "') "
    }
    return arrData
  }
  //start 开始日期，end结束日期，type：需要分组的字段,daymon:根据天或月查询
  var queryTasklist =function (ColArr,StartTime,FinishTime,AGVID,StartPlace,EndPlace, OrderID){ 
    let sql =``
    let CollStr = new Array();
    ColArr.forEach(item => {                     //遍历取列名拼接
        CollStr+=item+','
    });
    CollStr = CollStr.substring(0, CollStr.length - 1);  
    console.log(AGVID)
    AGVID = getOrStr(AGVID, 'AGVID')
    StartPlace = getOrStr(AGVID, 'StartPlaceDescription')
    EndPlace   = getOrStr(AGVID, 'EndPlaceDescription')
    OrderID = OrderID ? `and OrderID='` + OrderID + `'` : ``
    
    let param = AGVID + StartPlace + EndPlace + OrderID
    sql =`select  `+CollStr+` FROM taskinfo WHERE SetTime >='` + StartTime+`' and SetTime<='`+FinishTime+`' and TaskTypeName!='充电任务' `+param+` order by SetTime desc`
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

 let tasklist = { 
  queryTasklist:queryTasklist,
  QueryTaskID:QueryTaskID,
  DeleteTaskID:DeleteTaskID,
 
};
  
 export default tasklist;