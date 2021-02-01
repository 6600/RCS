
import express                                                              from        'express'
import ResJson                                                              from        '../assets/utils/ResJson'
import Tasklist                                                             from        '../server/view/Tasklist' 

var logger = require('../assets/log4js').logger;

var router = express.Router();
router.post('/QueryTaskID', function (req, res, next) {
  var resJson = new ResJson() 
	try {
 
    var TaskID       =req.body.TaskID;   console.log(TaskID);
     Tasklist.QueryTaskID(TaskID).then(
      data=>{
      resJson.ReturnData = data 
      logger.info('任务详情页请返回')
      res.json(resJson); 
    })
   
   
	} catch (error) {
		logger.error(error);
		next(error);
	}
});
router.post('/queryTasklist', function (req, res, next) {
  var resJson = new ResJson() 
	try {
    var StarTime    =req.body.StartDateTime;
    var EndTime     =req.body.EndDateTime;
    var AGVID       =req.body.AGVID;
    var StartPlace  =req.body.StartPlace;
    var EndPlace    =req.body.EndPlace;
    var OrderID    =req.body.OrderID; 
    console.log(StarTime,EndTime)
    //promise 执行查询序列：总共9条查询：
    var  ColArr     = ['TaskID','AGVID', 'TaskStatus','TaskStatusDescription','TaskTypeName','Number', 'OrderID', 'StartTime', 'FinishTime', 'Unit' , 'StartPlaceDescription','EndPlaceDescription','TokenStartTime','TokenFinishTime','LabelNumber','TokenUseTime','TokenOffset','TokenMaxTime','CancelCurrentTask', 'MaterialIDs'] 
    Tasklist.queryTasklist(ColArr,StarTime,EndTime,AGVID,StartPlace,EndPlace, OrderID).then( data=>{
      console.log(`查询到数据条数: ${data.length}`)
      resJson.ReturnData = data 
      logger.info('任务列表请求 ')
      res.json(resJson); 
    }) 
	} catch (error) {
		logger.error(error);
		next(error);
	}
});

module.exports = router;
