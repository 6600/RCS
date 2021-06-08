
import Vue from 'vue'
export default {

  state:{ 
    startTime:'',
    endTime: '',
    StaticsData:'',
    //从后台获取的统计数据
    dayOrmon:'dayline',                            //选择饼图控制日线图显示对应日表
    PieSelectIDX:2,
    ChartType:'matterStyle',
    webConfig: {}
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
    },
    setWebConfig(state,val) {  
      state.webConfig = val      
    },
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