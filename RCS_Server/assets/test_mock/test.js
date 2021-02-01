       //插入taskinfo数据到数据库：在socket端调用
       var InsertTaskinfo=function (table,obj){
   
        let ColArr = ['TaskID','AGVID','AGVIP','StartPlaceDescription','EndPlaceDescription'
          ,'TaskTypeName','TaskType','TaskStatus','TaskStatusDescription','StartTime','FinishTime','SetTime','TokenFinishTime'
          ,'TokenStartTime','TokenMaxTime','TokenOffSet','Sender','MaterialNum','MaterialID','Number'
          ,'Unit','LabelNumber','LineID','OrderID']
        let CollStr = new Array();
        let valStr = new Array()
              ColArr.forEach(item => {                   
                 CollStr+=item+','
                 valStr+="'"+typeof(obj[item])==undefined?'':obj[item]+"',"        //遍历拼接列名及值，值为undefined时转''
              });
              CollStr = CollStr.substring(0, CollStr.length - 1);  
              valStr = valStr.substring(0, valStr.length - 1);  
       //console.log(CollStr,valStr)
        let sql =`INSERT INTO `+table+`(`+CollStr+`) VALUES (`+valStr+`)` 
        //  vals.join(',')
        //let param = vals
           return dbHelper.execPromiseSelect(sql)   
        }