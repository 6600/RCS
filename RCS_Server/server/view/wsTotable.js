import dbHelper from '../dbHelper/DBConnection'
import webConfig from '../../assets/config/web.json'

//更新taskinfo数据到数据库：在socket端调用
var UpdateTaskinfo = function(table, obj, id) {
   let ColArr = ['TaskID', 'AGVID', 'AGVIP', 'StartPlaceDescription', 'EndPlaceDescription', 'TaskTypeName', 'TaskType', 'TaskStatus', 'TaskStatusDescription', 'StartTime', 'FinishTime', 'SetTime', 'TokenFinishTime', 'TokenStartTime', 'TokenUseTime', 'TokenMaxTime', 'TokenOffset', 'Sender', 'MaterialNum', 'MaterialID', 'Number', 'Unit', 'LabelNumber', 'LineID', 'OrderID', 'CancelCurrentTask']
	if (webConfig && webConfig['taskinfoTable']) {
		ColArr = webConfig['taskinfoTable']
	}
   let CollStr = new Array();
   let valStr = new Array()
   ColArr.forEach(item=> { //遍历取列名拼接
		CollStr += item + ','
      var objitem = typeof(obj[item]) == 'undefined' ? " ": obj[item]
      valStr += item + "='" + objitem + "'," //遍历拼接列名及值，值为undefined时转''
	});
	// CollStr = CollStr.substring(0, CollStr.length - 1);  
	valStr = valStr.substring(0, valStr.length - 1);

	let sql = `update ` + table + ` set ` + valStr + `where TaskID = '`+id+`'`
	//   console.log('更新记录',sql) 
	return dbHelper.execPromiseSelect(sql)
}
//插入taskinfo数据到数据库：在socket端调用
var InsertTaskinfo = function(table, obj) {

   let ColArr = ['TaskID', 'AGVID', 'AGVIP', 'StartPlaceDescription', 'EndPlaceDescription', 'TaskTypeName', 'TaskType', 'TaskStatus', 'TaskStatusDescription', 'StartTime', 'FinishTime', 'SetTime', 'TokenFinishTime', 'TokenStartTime', 'TokenUseTime', 'TokenMaxTime', 'TokenOffset', 'Sender', 'MaterialNum', 'MaterialID', 'Number', 'Unit', 'LabelNumber', 'LineID', 'OrderID', 'CancelCurrentTask', 'MaterialIDs']
   if (webConfig && webConfig['taskinfoTable']) {
		ColArr = webConfig['taskinfoTable']
	}
   let CollStr = new Array();
   let valStr = new Array()
   ColArr.forEach(item=> {
		CollStr += item + ','
		var objitem = typeof(obj[item]) == 'undefined' ? " ": obj[item]

		valStr += "'" + objitem + "'," //遍历拼接列名及值，值为undefined时转''
	});
	CollStr = CollStr.substring(0, CollStr.length - 1);
	valStr = valStr.substring(0, valStr.length - 1);
	let sql = `INSERT INTO ` + table + ` (` + CollStr + `) VALUES(` + valStr + `)`
	// console.log('添加记录',sql) 
	return dbHelper.execPromiseSelect(sql)
}

//插入agvworktime,agvcharge：在socket端调用
var InsertWorktime = function(table, obj) {
   obj['AbNormalWorkStartTime'] = obj['WorkDate'] + " " + obj['AbNormalWorkStartTime'] + ":00"
   obj['AbNormalWorkEndTime'] = obj['WorkDate'] + " " + obj['AbNormalWorkEndTime'] + ":00"
   obj['NormalWorkStartTime'] = obj['WorkDate'] + " " + obj['NormalWorkStartTime'] + ":00"
   obj['NormalWorkEndTime'] = obj['WorkDate'] + " " + obj['NormalWorkEndTime'] + ":00"

   let ColArr = ['AGVID', 'AGVIP', 'AbNormalWorkEndTime', 'AbNormalWorkStartTime', 'AbNormalWorkTotal', 'NormalWorkEndTime', 'NormalWorkStartTime', 'NormalWorkTotal', 'WorkDate']
   let CollStr = new Array();
   let valStr = new Array()
   ColArr.forEach(item=> {
		CollStr += item + ','
      var objitem = typeof(obj[item]) == 'undefined' ? " ": obj[item]
      valStr += "'" + objitem + "'," //遍历拼接列名及值，值为undefined时转''
	});
	CollStr = CollStr.substring(0, CollStr.length - 1);
	valStr = valStr.substring(0, valStr.length - 1);

	let sql = `DELETE FROM ${table} WHERE AGVID='${obj['AGVID']}' and WorkDate='${obj['WorkDate']}';INSERT INTO ${table} (${CollStr}) VALUES(${valStr});`

	// console.log('添加worktime',obj) 
	return dbHelper.execPromiseSelect(sql)

}

var InsertTable = function(table, obj) {

   let CollStr = Object.keys(obj)
   let valStr = Object.values(obj)
   CollStr.forEach(item=> {
		CollStr += item + ','
      var objitem = typeof(obj[item]) == 'undefined' ? " ": obj[item]
      valStr += "'" + objitem + "'," //遍历拼接列名及值，值为undefined时转''
	});
	CollStr = CollStr.substring(0, CollStr.length - 1);
	valStr = valStr.substring(0, valStr.length - 1);
	let sql = `INSERT INTO ` + table + ` (` + CollStr + `) VALUES(` + valStr + `)`
	return dbHelper.execPromiseSelect(sql)
}
let wsTotable = {
	InsertTaskinfo: InsertTaskinfo,
	UpdateTaskinfo: UpdateTaskinfo,
	InsertWorktime: InsertWorktime,
	InsertTable: InsertTable
};

export
default wsTotable;