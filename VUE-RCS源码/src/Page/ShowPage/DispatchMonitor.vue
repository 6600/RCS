<template>
  <div class="page">
    <div class="top" v-show="flooridx&gt;-1">
      <div class="WarningStatus">
        <div :class="WarnClass(flooridx,index)" v-for="(val,index) in alertinfo[flooridx]" :key="index">{{val}}</div></div>
    </div>
    <div class="main">
      <div class="show-box">
        <div class="show-box-top">
          <div class="show-box-left">
            <div class="now border">
              <h2>实时任务列表</h2>
              <div class="panel-item">
                <table border="0">
                  <tr>
                    <th>任务ID</th>
                    <th width="60">小车ID</th>
                    <th width="110">任务类型</th>
                    <th width="80">当前状态</th>
                  </tr>
                  <tr v-for="(item, ind) in taskList" :key="ind">
                    <td>{{item.TaskID}}</td>
                    <td>{{item.AGVID}}</td>
                    <td>{{item.TaskTypeName}}</td>
                    <td>{{item.TaskStatusDescription}}</td>
                  </tr>
                </table>
              </div>
            </div>
            <div class="car border">
              <h2>小车状况列表</h2>
              <div class="panel-item">
                <table border="0">
                  <tr>
                    <th>ID</th>
                    <th width="60">电量</th>
                    <th width="80">连接状态</th>
                    <th width="80">当前状态</th>
                    <th width="80">当前位置</th>
                  </tr>
                  <tr v-for="(item, ind) in agvtaskList" :key="ind">
                    <td>{{item.ID}}</td>
                    <td>{{item.PowerPercent}}</td>
                    <td>{{item.RemainTime}}</td>
                    <td>{{item.CurrentOperate}}</td>
                    <td>{{item.CurrentPos}}</td>
                  </tr>
                </table>
              </div>
            </div>
            <div class="charge border">
              <h2>充电桩状况列表</h2>
              <div class="panel-item">
                <table border="0">
                  <tr>
                    <th>充电桩ID</th>
                    <th>小车ID</th>
                    <th width="80">连接状态</th>
                    <th width="40">电压</th>
                    <th width="40">电流</th>
                  </tr>
                  <tr v-for="(item, ind) in chargepileList" :key="ind">
                    <td>{{item.ChargePileI}}</td>
                    <td>{{item.AGVID}}</td>
                    <td>{{item.ConnectStat}}</td>
                    <td>{{item.PowerVoltag}}</td>
                    <td>{{item.PowerCurren}}</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
          <div class="show-box-right border">
            <!--地图显示插件-->
            <div class="Monitor" v-if="parseInt(flooridx)!=-1">
              <Monitoringmap class="map" :map="floormap[flooridx]" :mapidx="flooridx" type="Monitor" width="100%" height="100%" v-on:warninfo="updatewarninfo"></Monitoringmap>
            </div>
            <!-- 缩略地图 -->
            <ul class="thumbContain" v-else>
              <li v-for="(item,idx) in (webConfig.mapRowNum * webConfig.mapColumnNum)" :key="idx" :style="{width: (100 / webConfig.mapRowNum).toFixed(2) + '%', height: (100 / webConfig.mapColumnNum).toFixed(2) + '%'}">
                <template v-if="floormap[idx] && floormap[idx].url">
                  <div class="WarningStatus">
                    <div :class="WarnClass(idx,index)" v-for="(val,index) in alertinfo[idx]" :key="index">{{val}}</div>
                  </div>
                  <Monitoringmap class="map" v-on:warninfo="updatewarninfo" :map="floormap[idx]" :mapidx="idx" type="thumb" width="100%" height="100%"></Monitoringmap>
                </template>
              </li>
            </ul>
          </div>
        </div>
        <div class="show-box-bottom">
          <div class="rate border">
            <h2>稼动率情况</h2>
            <div class="chart-panel">
              <div class="chart-box" v-for="(item,idx) in StaticsData.slice(0,6)" :key="idx">  
                <PieChart v-if="!item.hide" :ID='item.ID' :title='item.title' :index="idx"  :Piedata='item.pie' :type='item.type'></PieChart>   
              </div>
            </div>
          </div>
          <div class="order border">
            <h2>订单柱状图</h2>
            <div class="chart-box" id="chartBox"></div>
          </div>
        </div>
      </div>
      <div class="info"></div>
    </div>
  </div>
</template>

<script>
import      TaskControl                                                 from './TaskControl' 
import      ControlBoard                                                from './ControlBoard' 
import      Monitoringmap                                               from './Monitoringmap' 
import      {mapState,mapActions,mapMutations}                          from 'vuex'
import   PieChart                                               from './PieChart'
import      moment                                                                 from 'moment'
//  import { log } from 'i:/www/swap/src/js/utils/humane'
 
 export default { 
   components:{
     TaskControl,
     Monitoringmap,
     ControlBoard,
     PieChart
   },
   data(){
     return{   
        alertinfo:[[],[],[],[]], 
        ani:'',
        ani2:'',
        taskList: [],
        agvtaskList: [],
        chargepileList: []
    }
   }, 
   watch:{
     flooridx(newV,oldV){ 
      var height
      newV==-1?height = 1116:height = 769 
        this.tween.to('.foot',.5,{top:height+200})  

      this.ani  = ''
      this.ani2 = ''
     }, 
   },
   computed:{
     //VueX状态管理Module的使用 mapState:https://www.jianshu.com/p/0b42a876561e
     ...mapState( { 
      currentid: state  => state.task.currentid,   
      flooridx:  state  => state.map.flooridx,                  
      mapRang:   state  => state.map.mapRang,             
      floormap:  state  => state.map.floormap,
      StaticsData:  state => state.DataStatistics.StaticsData,
      webConfig: state => state.DataStatistics.webConfig
     }), 
     warninfo(){
       if(this.flooridx>-1){
          return this.alertinfo[this.flooridx] 
       }
     }
   },
  created() {
    // 获取数据
    var  param ={"startime": this.$moment().subtract(100, 'd').format('YYYY-MM-DD'),"endtime": this.$moment().add(1, 'd').format('YYYY-MM-DD')} 
    this.axios.post('/querystatics', param).then(data=>{ 
      console.log('返回统计数据',data.data.ReturnData);
        if (data.data.ReturnData==[]) {
          // this.$('.PieChart,.LineChart').hide()
        } else{
          this.setStatics(data.data.ReturnData) 
          // this.SetPieIDX(data.data.ReturnData.length-1) 
        }
    })
    let param2 = {
      name: "now",
      StartDateTime: this.$moment().subtract(100, 'd').format('YYYY-MM-DD'),
      EndDateTime: this.$moment().add(1, 'd').format('YYYY-MM-DD'),
      AGVID:this.AGVID,
      StartPlace: this.StartPlace,
      EndPlace: this.EndPlace,
      OrderID: this.OrderID ? this.OrderID : '',
    }   
    this.axios.post('/queryTasklist', param2).then(res => {
      console.log('--------------------- 数据列表2 ---------------------')
      console.log(res)
      const data = res.data
      this.taskList = data.ReturnData
      let list = [0, 0, 0, 0, 0, 0, 0]
      data.ReturnData.forEach(element => {
        console.log(element)
        if (element.FinishTime) {
          const finistTime = this.$moment(element.FinishTime).startOf('day').fromNow().split(' ')
          if (finistTime[0] && parseInt(finistTime[0]) < 7) {
            list[parseInt(finistTime[0])]++
          }
        }
      });
      var myChart = this.$echarts.init(document.getElementById('chartBox'))
      var option;

      option = {
          xAxis: {
              type: 'category',
              data: [this.$moment().subtract(6, 'd').format('MM-DD'), this.$moment().subtract(5, 'd').format('MM-DD'), this.$moment().subtract(4, 'd').format('MM-DD'), this.$moment().subtract(3, 'd').format('MM-DD'), this.$moment().subtract(2, 'd').format('MM-DD'), this.$moment().subtract(1, 'd').format('MM-DD'), this.$moment().format('MM-DD')]
          },
          yAxis: {
              type: 'value'
          },
          series: [{
              data: list,
              type: 'bar'
          }]
      };

      option && myChart.setOption(option);
    })
    this.axios.get('/queryAgvtask').then(res => {
      console.log('--------------------- 数据列表2 ---------------------')
      console.log(res)
      const data = res.data
      this.agvtaskList = data.ReturnData
    })
    this.axios.get('/queryChargepile').then(res => {
      console.log('--------------------- 数据列表2 ---------------------')
      console.log(res)
      const data = res.data
      this.chargepileList = data.ReturnData
    })
  },
  mounted(){  
    var height =this.$('.page').height();  
    this.tween.to('.foot',.5,{top:height+200})
  },
   methods:{
     ...mapMutations(['remove','InitFloormap', 'setStatics']),
    WarnClass(idx,index){
      return 'f'+idx+index
    },
    updatewarninfo(obj){   

      let idx = obj.idx
      let info = obj.info
      let width = ''
      let that = this
      this.alertinfo[idx].push(info)
      let index = this.alertinfo[idx].length-1
       //this.$('f'+idx+index).css({left:'500px'})

      if(this.flooridx==-1){     
        width = this.$('.thumbContain').width()
           console.log('报警width',width)
        if(this.ani==''){
         this.ani = this.tween.fromTo('.WarningStatus',20,{left:500},{left:0,repeat:-1,yoyo:false})
        }
      
        this.tween.to('f'+idx+index,8,{left:-100,onComplete:function(){     
          that.alertinfo[idx].shift()     
 
         }})
      }else{
         width = this.$('.WarningStatus:first-child').width()
           console.log('报警width',this.$('.WarningStatus:first-child'))

        if(this.flooridx==idx){  
          if(this.ani2==''){
         this.ani2 = this.tween.fromTo('.WarningStatus',20,{left:width},{left:0,repeat:-1,yoyo:false,onComplete:function(){     
           //that.ani2 = ''  
         }})
        }
      
        this.tween.to('f'+idx+index,8,{left:0,onComplete:function(){     
          that.alertinfo[idx].shift()     
 
         }})
        } 
      } 
          console.log('报警width',width)

    }  
   }
}
</script>

<style lang='less' scoped>
 .page{
   width: 100%;
   height: calc(100vh - 120px);
   .leftask{
    width: 30%;
   }
   .main{ 
     width: 100%;
     height:100%;  
    
   .info{
    width: 97%;
    padding-top:8px;
    position:relative;
   }
   } 
   .thumbContain{
     display:flex;
     flex-wrap:wrap; 
     width:100%;
     height: 100%;      
     background:#ddd;
     li{                                //地图宽高比2432x1334    
       position:relative; 
       width: 50%;
        height: 50%;
       flex-flow: column; 
       overflow: hidden;
      
     }
   }
 }
 .WarningStatus{
    position:absolute;
    left:480px;  
    width:100%;
    z-index:999;
    font-family: 'STKaiti';
    div{    
      color:red; 
      font-size: 25px;   
      display:inline-block;
      margin-right:35px!important;
    }
   }
 .top{
   position: absolute;
   top:-1.5rem;
   height: 2rem;
   color:red;
   font-size: 1rem; 
   width: 96%;
   overflow: hidden;
   span{
     position:absolute;
   display: inline-block;
   left:1100px} 
 }
.show-box {
  height: 100%;
  .show-box-top {
    height: calc(100% - 200px);
    display: flex;
  }
  .show-box-left {
    width: 380px;
    height: calc(100% - 20px);
    margin: 10px;
  }
  .show-box-right {
    height: calc(100% - 20px);
    width: calc(100% - 420px);
    margin: 10px;
  }
  .now {
    height: calc(100% - 425px);
  }
  .car {
    height: 200px;
    margin: 10px 0;
  }
  .charge {
    height: 200px;
  }
  h2 {
    background-color: darkslateblue;
    color: white;
    font-size: 16px;
    line-height: 30px;
    padding: 0 10px;
  }
}
.border {
  border: 1px solid #ccc;
  border-radius: 5px;
  overflow: hidden;
  box-sizing: border-box;
}
.show-box-bottom {
  height: 190px;
  margin: 0 10px;
  display: flex;
}
.rate {
  width: calc(100% - 610px);
  margin-right: 10px;
}
.order {
  width: 600px;
}
.panel-item {
  height: calc(100% - 30px);
  overflow: auto;
  padding: 0 5px;
  th,td {
    border-bottom: 1px solid #ccc;
    border-right: 1px solid #ccc;
    line-height: 30px;
  }
  table {
    border-left: 1px solid #ccc;
    border-top: 1px solid #ccc;
    width: 100%;
  }
}
.chart-box {
  width: 100%;
  height: 100%;
}
.chart-panel {
  height: 160px;
}
</style>