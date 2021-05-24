<template>
  <el-tabs v-model="activeName" type="border-card" tab-position="bottom" @tab-click="handleClick">
    <el-tab-pane label="小车信息" name="first">
      <div class="content">
        <ul>
          <li v-for="(val,key) in avgstatus"><span>{{key}}:</span>{{val}}</li>
        </ul>
      </div>
    </el-tab-pane>
    <el-tab-pane label="运行日志" name="second">
      <div class="content">
        <div class="task">
           <ul> <li v-for="(item,index) in taskInfo[Clickmark.ID]" :key="index">{{item.StartTime}}
             <span>{{item.TaskTypeName}}</span>从<span>{{item.StartPlaceDescription}}</span>发往<span>{{item.EndPlaceDescription}}</span>,预计
             <span>{{item.EstimateArriveTime}}</span>到达,任务状态<span>{{item.TaskStatusDescription}}</span> </li>
             </ul>
        </div> 
      </div>

      </el-tab-pane> 
  </el-tabs>
</template>
<script>
import      {mapState,mapActions,mapMutations}                                    from 'vuex'

  export default {
    name:'ControlBoard',
    props:['avg'],
    data() {
      return {
        activeName: 'first', 
      };
    },
  
    computed:{
       ...mapState( { 
       Clickmark: state  =>    state.map.Clickmark,  
       taskInfo:  state  =>    state.TaskList.taskInfo,       //任务日志不超过5条，可更新最新 
       AGVArr:    state  =>    state.map.AGVArr,   
       timeformat(val){                             //任务时间格式化为   10:00 格式
         return function(val){  var arr = val.split(' ');var time = arr[arr.length-1].split(':'),time = time[0]+':'+time[1]
       return time 
        } }, 
    }),

      avgstatus(){
       if(this.Clickmark.Type=='AGV')
         return this.AGVArr[this.Clickmark.ID]
      },
      avgtask(){
       if(this.Clickmark.Type=='AGV')
         return this.TaskArr[this.Clickmark.ID]
      }
    },
    created(){
      console.log('controlboard 控制面板',this.taskInfo[this.Clickmark.ID],this.Clickmark.ID)
    },
    watch:{
      Clickmark(nval,oval){
       // console.log(this.Avgarrs.filter(item=>{return item.ID == this.mark.ID}))
      }
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  };
</script>
<style lang='less'>
@import url('../../assets/less/mycss.less');
.content{
  height:8rem;padding:.2rem;
  border: 1px solid #DCDFE6;
//  border-radius: 10px 10px 10px 0;
  background-color: #000000;  
  color:white;
  >ul{
    list-style: none;column-count:3;margin:5px 0;
    li{
      margin-top:6px;
      span{margin-right:15px;}
    }
  } 
}
.task{                              //
       width: 95%;
       height: 15rem;
       margin:2px auto;  
       ul>li{ 
         margin-bottom:10px; 
        span{
          font-weight: bold;
          } } 
     }
 
//el tab 信息板样式
.el-tabs{
  margin:.2rem,auto!important; 
  height:9.2rem; 
  background-color: #fff!important;
}
.el-tabs__content{
  padding:5px!important;     //info外边框样式
}
 
.info .el-tabs--border-card>.el-tabs__header{
  background-color: #fff; 
  border-bottom: 1px solid #DCDFE6;   
  margin: 0; 
  }           
 .info .el-tabs--border-card {
    background: #FFF; 
    border-bottom-width:0px;  
    -webkit-box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
    box-shadow: 0 0px 0px 0 rgba(0,0,0,0), 0 0 6px 0 rgba(0,0,0,0);
}
.info .el-tabs--border-card>.el-tabs__header  {    //tab切换标签样式
 position:absolute; 
 bottom:-33px;left:6px;
}
 
   .el-is-bottom{
      border-bottom:1px solid #000000!important;   
   }
  .el-tabs__item:first-child{
  border-radius: 0 0 0 10px;
  }
  .el-tabs__item:last-child{
    border-radius: 0 0 10px 0;
  } 

  .info .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active{ 
   color: #ffffff;
   background-color: #222222;  
   }            //tab激活样式
  .el-tabs--bottom.el-tabs--border-card .el-tabs__item.is-bottom {
    color: #000000;
    border:1px solid #000000!important;  

    margin:0 0!important;
  }
</style>