
import express                                            from 'express'
import ResJson                                            from '../assets/utils/ResJson'
import statics                                            from '../server/view/statics' 

var logger = require('../assets/log4js').logger;
var router = express.Router();

router.post('/querystatics',
function(req, res, next) {
  var resJson = new ResJson()
  var data = {}
	try {
		var start = req.body.startime;
		var end = req.body.endtime;
		//promise 执行查询序列：总共9条查询： 
		Promise.all([statics.QueryWorkPie(start, end), statics.QueryWork(start, end, 'day,mon', null, null),

		statics.QueryOrderPie(start, end, 'TaskTypeName,TaskStatusDescription,OrderID', {
			'TaskTypeName': '成品入库任务,手动送料任务'
		}), //总计饼图     
		statics.QueryOrder(start, end, 'TaskTypeName', 'day,mon', null), // 返回日走线图  月走线图      
		statics.QueryOrder(start, end, 'TaskStatusDescription', 'day,mon', null), statics.QueryStaticsPie(start, end, 'TaskTypeName,MaterialID,OrderID'), statics.QueryStatics(start, end, 'MaterialID', 'day,mon', null), // 返回日走线图  月走线图   
		statics.QueryCharCount(start, end)]).then(data => {
			//和前端接口对应 {name:'avg1',type:'avg',data:{pie:{'使用时间':22,'故障时间':167},line:[{name:'稼动率',val:[0.6,0.4,0.3,0.8,0.9,0.52,0.48]}]}},
			resJson.ReturnData = new Array();
      var row
      data[0].forEach((item, idx) => { //稼动率返回json结构拼接
        
				row = {
					ID: item.AGVID,
					title: '小车' + item.AGVID,
					type: 'AGVStyle',
					pie: data[0][idx],
					dayline: data[1][0][idx],
					monline: data[1][1][idx]
				}
				resJson.ReturnData.push(row)
      })
      let len = 0
      data[2].forEach(item => {
				len = item.length
      })
      data[5].forEach(item => {
				len = item.length
      })
      console.log(len);
			if (len != 0) { //订单统计返回
				resJson.ReturnData.push({
					ID: '订单统计',
					title: '订单统计',
					type: 'OrderStyle',
					pie: data[2],
					//[任务类别,任务状态,工单id]
					line: [{
						dayline: data[3][0],
						monline: data[3][1]
					},
					{
						dayline: data[4][0],
						monline: data[4][1]
					}]
				})
				//物料统计返回json结构拼接
				resJson.ReturnData.push({
					hide: true,
					ID: '物料统计',
					title: '物料统计',
					type: 'matterStyle',
					pie: data[5],
					//[任务类别,工单ID,物料号]       
					dayline: data[6][0],
					monline: data[6][1],
					charge: {
						ID: '充电状况',
						table: data[7]
					}
				})
			}

      logger.info('统计数据请求返回成功')
      res.json(resJson);
		})

	} catch(error) {
		logger.error(error);
		next(error);
	}
});

module.exports = router;
