
import Vue from 'vue'
export default {

  state:{ 
    startTime:'',
    endTime: '',
    StaticsData:'',
    EchartData:[
      {ID:'AGV1统计',type:'AGVStyle',
      chart:{
        pie:{'使用时间':22,'故障时间':167},
        dayline:[
          {name:'稼动率', val:[0.6,0.4,0.3,0.8,0.9,0.52,0.48] }  ]
    }
  },
     // {ID:'AGV2统计',type:'AGVStyle',chart:{pie:{'使用时间':33,'故障时间':2}  ,dayline:[{name:'稼动率',val:[0.6,0.4,0.3,0.8,0.9,0.52,0.48]}]}},
     // {ID:'AGV3统计',type:'AGVStyle',chart:{pie:{'使用时间':44,'故障时间':6}  ,dayline:[{name:'稼动率',val:[0.6,0.4,0.3,0.8,0.9,0.52,0.48]}]}},
     // {ID:'AGV4统计',type:'AGVStyle',chart:{pie:{'使用时间':22,'故障时间':33} ,dayline:[{name:'稼动率',val:[0.6,0.4,0.3,0.8,0.9,0.52,0.48]}]}},
     //                                         
     // {ID:'订单统计',type:'OrderStyle', 
     // chart:{pie:[{name:'任务状态',val:{'执行中':33,'暂停':671}},{name:'任务类别',val:[0.6,0.4,0.3,0.8,0.9,0.52,0.48]}],
     //     line:[{name:'任务状态',val:[0.6,0.4,0.3,0.8,0.9,0.52,0.48]},{name:'任务类别',val:[0.6,0.4,0.3,0.8,0.9,0.52,0.48]}]}},                                              
     //    {ID:'物料统计',type:'matterStyle', 
     // chart:{pie:[{name:'工单号',val:{'工单1':33,'工单2':671,'工单3':671}}, {name:'物料号',val:{'物料1':33,'物料2':67,'物料3':67}},{name:'产线号',val:{'产线1':33,'产线1':67,'产线1':67}}],
     // line:[{name:'工单号',val:[0.6,0.4,0.3,0.8,0.9,0.52,0.48]},{name:'产线号',val:[0.6,0.4,0.3,0.8,0.9,0.52,0.48]}]}},
  ],     //从后台获取的统计数据
    dayOrmon:'dayline',                            //选择饼图控制日线图显示对应日表
    PieSelectIDX:2,
    ChartType:'matterStyle',
    PieClick:'AGV'
},
  mutations:{
 
    setdayOrmon(state,val){
      state.dayOrmon = val
    },
    SetPieIDX(state,val){
      state.PieSelectIDX = val  
    },
    SetChartType(state,val){
      state.ChartType = val  
    },
    setstartTime(state,val){
      state.startTime = val
    },
    setendTime(state,val){
      state.endTime = val
    },
    setStatics(state,val){
      state.StaticsData = val
    },
    remove(state,idx){
      if(state.currentid.type=='wait')
      state.taskdata = state.taskdata.filter((item)=>{if(state.currentid.id !== item.id) { 	return true 	} })  
    },
    setPieClick(state,val){  
      state.PieClick=val      
    }
  },
  actions:{
    //  [USER_LOGIN]({commit},user){
    //      commit(USER_LOGIN,user)
    //  },
    //  [USER_LOGOUT]({commit}){
    //      commit(USER_LOGOUT)
    //  }
  },
  getters:{ 
    getDayMonLine: state => {//通过方法访问   
     // if(state.PieSelectIDX==4){
       try{
        if(state.ChartType=='TaskName'){
          // var filterdata = this.getDayMonLine.filter(item=>{
          //   return item.TaskTypeName == '成品入库任务'||item.TaskTypeName == '原料配送任务'
          //  }) 
          console.table(state.StaticsData[state.PieSelectIDX],['dayline','monline']);
          
           return state.StaticsData[state.PieSelectIDX].line[0][state.dayOrmon]
          }else if(state.ChartType=='Status'){
           return state.StaticsData[state.PieSelectIDX].line[1][state.dayOrmon]
          }else{
            return state.StaticsData[state.PieSelectIDX][state.dayOrmon]
          }
       }catch(e){
         console.log(e)
            return ''
       }
       console.log('PieSelectIDX',state.PieSelectIDX)

    }, 
  }
 
}