 

export default {

  state:{ 
    currentid: {id:0,type:''},
    TaskList: [],
    ScrollTask:[  
      {ID:'C1',TaskID:'2020-08-22 10:10:01',IP:'127.0.0.1',CurrentPos: "仓库发料区",CurrentOperate:'行车中',TaskTypeName:'原料配送任务',StartPlace:'仓库发料区',EndPlace:'2楼线边仓',ScheduledTime:'10:20:05',RemainTime:'10:04'}
      //即时数据 
    ],
    taskInfo: {"C1":[{ID:'C1',TaskID:'2020-08-22 10:10:01',IP:'127.0.0.1',CurrentPos: "仓库发料区",CurrentOperate:'行车中',TaskTypeName:'原料配送任务',StartPlace:'仓库发料区',EndPlace:'2楼线边仓',ScheduledTime:'10:20:05',RemainTime:'10:04'}],
               "C2":[{ID:'C2',TaskID:'2020-08-22 10:10:01',IP:'127.0.0.1',CurrentPos: "仓库发料区",CurrentOperate:'行车中',TaskTypeName:'原料配送任务',StartPlace:'仓库发料区',EndPlace:'2楼线边仓',ScheduledTime:'10:20:05',RemainTime:'10:04'}],
               "C3":[{ID:'C3',TaskID:'2020-08-22 10:10:01',IP:'127.0.0.1',CurrentPos: "仓库发料区",CurrentOperate:'行车中',TaskTypeName:'原料配送任务',StartPlace:'仓库发料区',EndPlace:'2楼线边仓',ScheduledTime:'10:20:05',RemainTime:'10:04'}],
               "C4":[{ID:'C4',TaskID:'2020-08-22 10:10:01',IP:'127.0.0.1',CurrentPos: "仓库发料区",CurrentOperate:'行车中',TaskTypeName:'原料配送任务',StartPlace:'仓库发料区',EndPlace:'2楼线边仓',ScheduledTime:'10:20:05',RemainTime:'10:04'}]}, 
    label:[
   {  "TaskID": "任务ID", 
      "TaskTypeName": "任务类别",
      "TaskStatusDescription": "任务状态",},
     { "AGVID": "小车ID",
      "AGVIP": "小车IP",  
      "LabelNumber": "资安数量",
      "LineID": "产号线",
      "MaterialID": "物料ID",
      "MaterialNum": "物料数量",
      "Number": "数量",
      "OrderID": "订单ID",
     // "RequestType": "TaskUpdate",
      "Sender": "发货人",
 },
   { 
      "StartTime": "任务开始时间",     
      "FinishTime": "任务结束时间",     
      "TokenStartTime": "出岗时间",
      "TokenFinishTime": "入岗时间",
      "SetTime": "下次执行时间", 
      "TokenUseTime": "任务用时",
      "StartPlaceDescription": "开始位置",
      "EndPlaceDescription": "结束位置",
      "TokenMaxTime": "最大用时",
      "TokenOffset": "差异任务",
      "Unit": "单位",
    }
       ],
    keylabel:{
       "TaskID": "任务ID", 
        "TaskTypeName": "任务类别",
       "TaskStatusDescription": "任务状态",
        "AGVID": "小车ID",
       "AGVIP": "小车IP",  
       "LabelNumber": "资安数量",
       "LineID": "产号线",
       "MaterialID": "物料ID",
       "MaterialNum": "物料数量",
       "Number": "数量",
       "OrderID": "订单ID",
         "RequestType": "TaskUpdate",
       "Sender": "发货人",
       "StartTime": "任务开始时间",     
       "FinishTime": "任务结束时间",     
       "TokenStartTime": "出岗时间",
       "TokenFinishTime": "入岗时间",
       "SetTime": "下次执行时间", 
       "TokenUseTime": "任务用时",
       "StartPlaceDescription": "开始位置",
       "EndPlaceDescription": "结束位置",
       "TokenMaxTime": "最大用时",
       "TokenOffset": "差异任务",
       "Unit": "单位",},
    UpdateTask:{},
    TimeRange:'', 
    AGVID:'',
    StartPlace:'',
    EndPlace:'',
    totalCount:2, 
    currentPage:1,  
    AGVID_:'',
    AGVStatus:["待执行","正在执行","异常"], 
    AGVStatus_:["待执行","正在执行","异常"],
    AGV_Option:[  
    { value: 'C1', label: 'C1'},
    { value: 'C2', label: 'C2'},
    { value: 'C3', label: 'C3'},
    { value: 'C4', label: 'C4'}  ],
    Status_Option:[   
        { value: '待执行',   label: '待执行'},
        { value: '正在执行', label: '正在执行'},
        { value: '异常',     label: '异常'},
        { value: '已完成',   label: '已完成'}
    ],
    Start_Option: [   
        { value: '2楼线边仓', label: '2楼线边仓'},
        { value: '3楼线边仓', label: '3楼线边仓'},
        { value: '1楼线边仓', label: '1楼线边仓'},
        { value: '0楼线边仓', label: '0楼线边仓'}
           ],
    End_Option: [   
        { value: '2楼线边仓', label: '2楼线边仓'},
        { value: '3楼线边仓', label: '3楼线边仓'},
        { value: '1楼线边仓', label: '1楼线边仓'},
        { value: '0楼线边仓', label: '0楼线边仓'}
    ],   
  },
  mutations:{
    // websock 对接实时列表进行展示，通过scrollTask变量可视化响应
    SOCKET_UpdateTask(state,data){              //根据后端传来的rcs数据添加更新即时任务列表 
      data.forEach((item)=>{
      var index = -1
      state.UpdateTask = ''
      state.UpdateTask = item

      state.ScrollTask.filter((val,idx)=>{                   //查询更新数据
        if(item.TaskID == val.TaskID){
          console.log(idx);
          index = idx 
          state.ScrollTask[idx] = item
        }
      }) 
      if(index==-1){
        state.ScrollTask.unshift(item)                        //添加新的数据到列表第一条
      }  
    
      var id = item.AGVID         
      if(typeof(state.taskInfo[id])==undefined){
     
         state.taskInfo[id]=new Array()
         state.taskInfo[id].push(item)
       }else{  if(state.taskInfo[id].length>=4){
         state.taskInfo[id].splice(0,1);
         state.taskInfo[id].push(item) 
      }else{ state.taskInfo[id].push(item) 
      } }
    
    })  
    },
    InitScroll(state,data){                                     //刷新列表时初始化
      state.ScrollTask = data  
    }, 
    remove(state,idx){
      if(state.currentid.type=='wait')
      state.taskdata = state.taskdata.filter((item)=>{
        if(state.currentid.id !== item.id) { 
        	return true 	} })  
    },  
    setTaskList(state,data){                                    //查询并返回历史数据列表
      state.TaskList = data 
    },  
   
    //分页组件的相关变量 
      settotalCount(state,value){
        state.totalCount = value 
      },
      setPageSize(state,value){
        state.PageSize = value 
      },
      setcurrentPage(state,value){
        state.currentPage = value 
      },
      //ajax请求参数的存储 
      setAGVID(state,value){
        state.AGVID = value 
      },
      
      setAGVID_(state,value){
        state.AGVID_ = value 
      },
      setAGVStatus(state,value){
        state.AGVStatus = value 
      },
      setEndPlace(state,value){
        state.EndPlace = value 
      },
      setStartPlace(state,value){
        state.StartPlace = value 
      },
      setAGV_Option(state,value){
        state.AGV_Option = value  
      },
      setStatus_Option(state,value){
        state.Status_Option = value  
      },
      setStart_Option(state,value){
        state.Start_Option = value  
      },
      setEnd_Option(state,value){
        state.End_Option = value  
      },
      setTimeRange(state,value){
      state.TimeRange = value 
    },
  },
  actions:{  
  }
}