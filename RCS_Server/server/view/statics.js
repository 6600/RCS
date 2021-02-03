import dbHelper from '../dbHelper/DBConnection'

//订单统计
var QueryOrderPie = function (start,end,type,obj){
   let sql =`` ,param = [start,end]; 
  if(type!=null){
    type.split(',').forEach(item=>{
      sql +=  ` SELECT count(TaskID) as 'count',`+item+` FROM taskinfo  WHERE date(SetTime) >='`+start+`'&&date(SetTime)<='`+end+`'&&TaskTypeName!='充电任务'&&TaskStatusDescription!='待执行'&&TaskStatusDescription!='正在执行' group by `+item+`;`
   })
  } 

  return dbHelper.execPromiseSelect(sql,param)
    }
  //start 开始日期，end结束日期，type：需要分组的字段,daymon:根据天或月查询
var QueryOrder =function (start,end,type,daymon,limit){ 
  let sql =``
  
  if(daymon!=null){
   daymon.split(',').forEach(item=>{
    let grouby= item =='mon'?grouby="DATE_FORMAT(SetTime,'%y-%m')":"DATE_FORMAT(SetTime,'%y-%m-%d')"
      sql +=` select `+type+`, group_concat(date) as date, group_concat(count) as count from
             (SELECT `+type+`,`+grouby+` as date,count(TaskTypeName) as 'count' 
            FROM taskinfo  WHERE date(SetTime) >='`+start+`'&&date(SetTime)<='`+end+`'&&TaskTypeName!='充电任务'&&TaskStatusDescription!='待执行'&&TaskStatusDescription!='正在执行'
            group by `+type+`,`+ grouby+` order by date) temp group by `+type+` order by ANY_VALUE(temp.date);` 
  })
  }  
 // console.log('订单趋势查询语句： ',sql ) 
 return dbHelper.execPromiseSelect(sql)   
}

//物料统计
var QueryStaticsPie = function (start,end,type){ 
    let sql=` `;
    if(type!=null){ 
      type.split(',').forEach(item=>{
        //mysql的列值转列字段名
        if(item!='MaterialID'){
          sql +=`SELECT count(TaskID) as count,`+item+` from taskinfo  WHERE date(SetTime) >='`+start+`'&&date(SetTime)<='`+end+`' GROUP BY `+item+`;`; 
        }else {
          sql += `SELECT MaterialID,sum(MaterialNum) as count FROM (SELECT 
          SUBSTRING_INDEX(SUBSTRING_INDEX(a.MaterialID,';',b.help_topic_id+1),';',-1) AS MaterialID,SUBSTRING_INDEX(SUBSTRING_INDEX(a.MaterialNum,';',b.help_topic_id+1),';',-1) AS MaterialNum 
          FROM 
          taskinfo  a JOIN mysql.help_topic  b
          WHERE 
          b.help_topic_id < LENGTH(a.MaterialID)-LENGTH(REPLACE(a.MaterialID,';',''))+1&&date(SetTime) >='`+start+`'&&date(SetTime)<='`+end+`'&&TaskTypeName!='充电任务'&&MaterialID!='') temp GROUP BY MaterialID;`
        }
   })
 }
   return dbHelper.execPromiseSelect(sql)
  }

var QueryStatics = function (start,end,type,daymon,limit){ 
  let sql = ``; let grouby
  if(limit!=null)start = `(SELECT DATE_SUB(`+end+`,INTERVAL `+limit+` day))`
   //https://blog.csdn.net/shinebxy/article/details/82180693   limit 前10 或者前10个月  为SELECT DATE_SUB(TaskID,INTERVAL 10 day),SELECT DATE_SUB(TaskID,INTERVAL 10 month)
  //字符串拆解成数组函数 ：https://www.cnblogs.com/gered/p/10797012.html 
  daymon.split(',').forEach(item=>{  
    grouby= item =='mon'?grouby="DATE_FORMAT(SetTime,'%y-%m')":"DATE_FORMAT(SetTime,'%y-%m-%d')"

     sql +=   `select `+type+`,group_concat(date) as date,group_concat(count) as count,SetTime from(select MaterialID,`+grouby+` as date,SUM(MaterialNum) as count,SetTime
              from(SELECT `+grouby+` as TaskID,SetTime,SUBSTRING_INDEX(SUBSTRING_INDEX(task.`+type+`,';',b.help_topic_id+1),';',-1) AS `+type+`,
              SUBSTRING_INDEX(SUBSTRING_INDEX(task.MaterialNum,';',b.help_topic_id+1),';',-1) AS MaterialNum 
              FROM  taskinfo task JOIN mysql.help_topic b  WHERE
              (help_topic_id < LENGTH(task.`+type+`)-LENGTH(REPLACE(task.`+type+`,';',''))+1)&&(date(task.SetTime)>='`+start+`'&&date(task.SetTime)<='`+end+`'&&task.MaterialID!='') 
        order by SetTime) temp GROUP BY `+grouby+`,`+type+` order by `+grouby+`) tempd GROUP BY MaterialID;`
  }) 
  //console.log('物料趋势查询： ',sql )
  return dbHelper.execPromiseSelect(sql)
}
//查询稼动率 5  type :day,mon,根据日期，月份
var QueryWorkPie = function (start,end){    //秒数转时分:SEC_TO_TIME,时分转秒数:TIME_TO_SEC
   let sql = `select AGVID,sum(AbnormalTime) as '异常时间',sum(NormalTime) as '正常时间',sum(NormalTime)/(sum(NormalTime)+sum(AbnormalTime))*100 as '稼动率'
       from (SELECT AGVID,from_unixtime(WorkDate,'%Y-%m') as date,NormalWorkTotal as NormalTime, AbNormalWorkTotal as AbnormalTime  
      FROM agvworktime  WHERE WorkDate >='`+start+`' and WorkDate<='`+end+`') temp group by AGVID order by AGVID`;
   let param = [start,end]; 

 // console.log('稼动率饼图查询： ',sql ) 
   return dbHelper.execPromiseSelect(sql,param)
}

var QueryWork =function (start,end,daymon,id,limit){
  // let idwh = id==null?'':" and AGVID =='"+id+"'"
   let grouby; let sql =``
       daymon.split(',').forEach(item=>{  
       grouby= item =='mon'?grouby="DATE_FORMAT(WorkDate,'%y-%m')":"DATE_FORMAT(WorkDate,'%y-%m-%d')" 
                         
   sql += `SELECT AGVID,'稼动率' as name,group_concat(date) as date,group_concat(稼动率) as val FROM (select AGVID,date,concat(round(NormalTime/sum(NormalTime+AbnormalTime)*100),'%') as '稼动率'
   from (SELECT AGVID,NormalWorkTotal as NormalTime,
    AbNormalWorkTotal as AbnormalTime ,`+grouby+` as date 
   FROM agvworktime  WHERE WorkDate >='`+start+`' and WorkDate<='`+end+`') temp GROUP BY AGVID,date order by AGVID,date) temp GROUP BY ANY_VALUE(AGVID);`;
}) 

 // console.log('稼动率趋势查询： ',sql )
   return dbHelper.execPromiseSelect(sql)  
}
//查询充电状况
var QueryCharge =function (start,end){ 
  let sql = ` SELECT ID,count(ID) as '充电次数',SEC_TO_TIME(unix_timestamp(StopChargeTime)-unix_timestamp(StartChargeTime))as '充电时长'
      FROM agvcharge  WHERE date(StartChargeTime) >=?&&date(StartChargeTime)<=? GROUP BY ID order by StartChargeTime `;
  let param = [start,end];
  
 return dbHelper.execPromiseSelect(sql,param)  
} 
var QueryCharCount =function (start,end){ 
  let sql = ` SELECT ID,count(ID) as '充电次数',SEC_TO_TIME(unix_timestamp(StopChargeTime)-unix_timestamp(StartChargeTime))as '充电时长'
      FROM agvcharge  WHERE date(StartChargeTime) >=?&&date(StartChargeTime)<=? GROUP BY ID order by StartChargeTime `;
  let param = [start,end];
  
 return dbHelper.execPromiseSelect(sql,param)  
} 
//插入数据：在socket端调用
function InsertTable(table,obj){
  let col = Object.keys(obj).join(',')
  let vals=Object.values(obj)
 
  let sqlval = [];vals.filter(
    item=>{sqlval.push('?')});
    sqlval.join(',')
  let sql =`INSERT INTO `+table+`(`+col+`) VALUES (`+sqlval+`)` 
    vals.join(',')
  let param = vals
     return dbHelper.execPromiseSelect(sql,param)   
  }
let statics = {
  QueryOrder     :     QueryOrder,
  QueryOrderPie  :     QueryOrderPie,      //订单统计
  QueryStatics   :     QueryStatics,         //物料统计
  QueryStaticsPie:     QueryStaticsPie,
  QueryWork      :     QueryWork,
  QueryWorkPie   :     QueryWorkPie,
  QueryCharge    :     QueryCharge,
  QueryCharCount :     QueryCharCount,
  InsertTable    :     InsertTable
}

export default statics;