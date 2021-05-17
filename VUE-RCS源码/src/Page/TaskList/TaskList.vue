<template>
<div class="page tasklist"> 
  <div class="mintSearch">
     <mt-datetime-picker ref="spicker" type="datetime" year-format="{value}"
               @confirm="dateConfirm()" v-model="mint.StartTime"></mt-datetime-picker>
     <mt-datetime-picker ref="epicker" type="datetime" year-format="{value}"
               @confirm="dateConfirm()" v-model="mint.EndTime"></mt-datetime-picker> 
     <mPicker type="Car"    title= '小车' :data = 'mint.Car'        :Visible="mpopupVisible" @cancel="cancel" @confirm="confirm"></mPicker>
     <mPicker type="StartP" title= '起始位置' :data = 'mint.StartP' :Visible="mpopupVisible" @cancel="cancel" @confirm="confirm"></mPicker>
     <mPicker type="EndP"   title= '结束位置' :data = 'mint.EndP'   :Visible="mpopupVisible" @cancel="cancel" @confirm="confirm"></mPicker>
     <mt-button type="default" @click = "openPicker('spicker')" >开始时间</mt-button>
     <mt-button type="default" @click = "openPicker('epicker')" >结束时间</mt-button>
     <mt-button type="default" @click = "Picker('Car')">         小车ID</mt-button>
     <mt-button type="default" @click = "Picker('StartP')">      开始位置</mt-button>
     <mt-button type="default" @click = "Picker('EndP')">        结束位置</mt-button>
     <mt-button type="primary" id="search" @click = 'search'>    查  询</mt-button> 
  </div>
  <div class="SearchPanel">
     <span class="demonstration">时间范围</span>
  <div class="block">
    <el-date-picker style="width:220px"
      value-format="yyyy-MM-dd HH:mm:ss"
      v-model="TimeRange" size='small'
      type="datetimerange"
      range-separator="至" 
      start-placeholder="开始日期"
      end-placeholder="结束日期" >
    </el-date-picker>
  </div>
  <span>小车ID</span>
  <el-select style ='"width:80%"'  size='small'  v-model="AGVID"   @change="mfilter"  multiple collapse-tags placeholder="小车ID"> 
    <el-option v-for="item in AGV_Option" :key="item.value" :label="item.label" :value="item.value"  size='small'>
    </el-option>
  </el-select>
  <span>工单号</span>
  <div class="el-input" style='width:180px' >
    <input type="text" autocomplete="off" v-model="OrderID"  @change="mfilter" placeholder="请输入内容" class="el-input__inner">
  </div>
  <span>状态</span>
  <el-select style ='"width:60%"'  size='small'  v-model="AGVStatus_"   @change="mfilter"  multiple collapse-tags placeholder="任务状态"> 
    <el-option v-for="item in Status_Option" :key="item.value" :label="item.label" :value="item.value"  size='small'>
    </el-option>
  </el-select>
  <span>起点</span>
  <el-select  v-model="StartPlace"   placeholder="起始位置" size='small' @change="mfilter" multiple collapse-tags
  style = '{width:50px}'
  :popper-append-to-body="true" 
  > 
  <el-option v-for="item in Start_Option"  :key="item.value" :label="item.label" :value="item.value">
  </el-option>
  </el-select>
  <span>终点</span>
  <el-select v-model="EndPlace" style ='{width:50px}' placeholder="终点位置"  size='small' @change="mfilter" multiple collapse-tags
   prop-class="select-option">
    <el-option
      v-for="item in End_Option"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
    <el-button type="primary" size='small' @click="search"      class = 'searchBtn'>查询</el-button> 
    <el-button type="primary" size='small' @click="exportexcel" class = 'searchBtn'>导出</el-button> 
  </div>
  <div class="tableContain">   
  <el-table  :data="TaskList.slice((currentPage-1)*PageSize,currentPage*PageSize)"  :cell-style="cellStyle" class="tableContain"  
  :row-style='rowStyle'
   :row-class-name='rowname'
  :header-cell-style="{background:'rgb(80, 118, 241)',color:'white'}"  border  @row-click="TaskDetail">
       <af-table-column  prop="FireTokenID"  align="center" type="index" label="序号" width="50">                </af-table-column> 
       <!--知识点table-column 表格数据格式化formatter属性： https://blog.csdn.net/yytoo2/article/details/83992175?utm_medium=distribute.pc_relevant_t0.none-task-blog-blogcommendfrommachinelearnpai2-1.edu_weight&depth_1-utm_source=distribute.pc_relevant_t0.none-task-blog-blogcommendfrommachinelearnpai2-1.edu_weight                                                                                                       http://www.caotama.com/341423.html --> -->
       <af-table-column  column prop="TaskID" align="center"   label="任务号"   width="180" >                    </af-table-column>     
       <af-table-column  prop="AGVID"  label="编号"   align="center"         width="50"  >                       </af-table-column>
       <af-table-column  prop="OrderID"  label="工单号"   align="center"         width="80"  >                       </af-table-column>
       <af-table-column  prop="StartTime"  label="开始时间"   align="center"         width="120"  >                       </af-table-column>
       <af-table-column  prop="FinishTime"  label="完成时间"   align="center"         width="120"  >                       </af-table-column>
       <af-table-column  prop="PrintNum"  label="打印"   align="center"         width="80"  >                       </af-table-column>
       <af-table-column  prop="TaskStatusDescription"   label="状态" align="center" width="80">                  </af-table-column>  
       <af-table-column  prop="Number" label="数量"     align="center" width="50">                               </af-table-column> 
       <af-table-column  prop="Unit"   label="单位"     align="center" width="50">                               </af-table-column> 
       <af-table-column  prop="LabelNumber"             label="资安标签"          align="center  " width="50">   </af-table-column> 
       <af-table-column  prop="StartPlaceDescription"   label="起始位置"      align="center"   width="175">    </af-table-column>
       <af-table-column  prop="EndPlaceDescription"   label="中止位置"      align="center"   width="175">    </af-table-column> 
       <af-table-column  prop="TaskTypeName"            label="任务类型"      align="center"   width="120" >           </af-table-column> 
       <af-table-column  prop="TokenStartTime"          label="出岗时间"      align="center"   width="160">            </af-table-column> 
       <af-table-column  prop="TokenFinishTime"         label="到岗时间"      align="center"   width="160">            </af-table-column> 
       <af-table-column  prop="TokenUseTime"            label="出入岗时间"    align="center"   width="120">            </af-table-column> 
       <af-table-column  prop="TokenMaxTime"            label="规定时间"      align="center"   width="80" >            </af-table-column>  
       <af-table-column  prop="TokenOffset"             label="差异"          align="center"   width="90" >            </af-table-column>  
       <af-table-column  prop="CancelCurrentTask"       label="取消"          align="center"   width="90" >            </af-table-column>
       <!-- <el-table-column  prop="AGVID" :formatter="comment"  label="备注"  align="center" width="100">             </el-table-column>   -->
   </el-table> 
    <el-pagination background layout="prev, pager, next"   
     @size-change="handleSizeChange"  
     @current-change="handleCurrentChange"  
     :current-page="currentPage"  
     :total="totalCount" 
     :page-size="PageSize" > 
  </el-pagination> 
  </div> 
 
</div>
</template>
<script>
import      { Button,DatetimePicker,Picker }                                       from 'mint-ui'; 
import      {mapState,mapActions,mapMutations}                                     from 'vuex'
var         dateFormat = require('dateformat');                                                         //日期格式化插件
import      moment                                                                 from 'moment'
import      mPicker                                                                from './Picker'
import      Chart                                                                  from 'chart.js'
import      HeaderList                                                             from './HeaderList'

//  import { log } from 'i:/www/swap/src/js/utils/humane'
  export default {
  components:{Button,DatetimePicker,mPicker,HeaderList},
  computed:{
       //VueX状态管理Module的使用 mapState:https://www.jianshu.com/p/0b42a876561e
     ...mapState( {  
       TaskList:     state      => state.TaskList.TaskList,  
       totalCount:   state      => state.TaskList.totalCount,  
       currentPage:  state      => state.TaskList.currentPage,   
       AGV_Option:   state      => state.TaskList.AGV_Option,    
       Status_Option:state      => state.TaskList.Status_Option,    
       Start_Option: state      => state.TaskList.Start_Option,    
       End_Option:   state      => state.TaskList.End_Option,   
       label:        state      => state.TaskList.label,   
       keylabel:     state      => state.TaskList.keylabel,
       user:  state  =>state.user,
  }),  
    TimeRange:{ 
     get:function(){   return this.$store.state.TaskList.TimeRange   },
     set:function (v){  
       this.$store.state.TaskList.TimeRange = v }
   },

  AGVID:{
    get:function (){   return this.$store.state.TaskList.AGVID   },
    set:function (v){  
      this.$store.state.TaskList.AGVID = v
    }
  },
  OrderID:{
    get:function (){   return this.$store.state.TaskList.OrderID   },
    set:function (v){  
      this.$store.state.TaskList.OrderID = v
    }
  },
  StartTime:{
    get:function (){   return this.$store.state.TaskList.StartTime   },
    set:function (v){  
      this.$store.state.TaskList.StartTime = v
    }
  },
  FinishTime:{
    get:function (){   return this.$store.state.TaskList.FinishTime   },
    set:function (v){  
      this.$store.state.TaskList.FinishTime = v
    }
  },
  PrintNum:{
    get:function (){   return this.$store.state.TaskList.PrintNum   },
    set:function (v){  
      this.$store.state.TaskList.PrintNum = v
    }
  },
    StartPlace:{
    get:function (){   return this.$store.state.TaskList.StartPlace   },
    set:function (v){
      this.$store.state.TaskList.StartPlace = v  }
    }, 
    AGVStatus_:{
    get:function (){   return this.$store.state.TaskList.AGVStatus_   },
    set:function (v){
      this.$store.state.TaskList.AGVStatus_ = v  }
    },  
    EndPlace:{ 
     get:function (){   return this.$store.state.TaskList.EndPlace   },
     set:function (v){   
       this.$store.state.TaskList.EndPlace = v  }
   },
    getTimeformat(val){
      return function(val){
        var d = new Date(val);  
        var datetime=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
        return datetime
     }
    },
    StartEndPlace(row, column, cellValue, index){                                        //起终位置
      let that = this
      return function(row, column, cellValue, index){
        if (!that.TaskListView[currentIdX]) return ''
        let currentIdX = (that.currentPage-1)*that.PageSize+index
        let startp = that.TaskListView[currentIdX].StartPlaceDescription=="undefined"?'':that.TaskListView[currentIdX].StartPlaceDescription 
        let endp   = that.TaskListView[currentIdX].EndPlaceDescription  =="undefined"?'':that.TaskListView[currentIdX].EndPlaceDescription 
         //    console.log(that.TaskList[currentIdX].StartPlaceDescription,index); 
        return startp+ "-"+ endp
      }
    }, 
    TimeEX(row, column, cellValue, index){
      var that = this
      return function(row, column, cellValue, index){                                    //插件 参考https://blog.csdn.net/weixin_44675537/article/details/106360441
       if(cellValue!='')
       return  that.$moment(cellValue).format("YYYY/MM/DD     HH:mm:ss");
      }
    },
    Timediff(row, column, cellValue, index){                                              //出入岗时间
      var that = this
      return function(row, column, cellValue, index){                                    //插件 参考https://blog.csdn.net/weixin_44675537/article/details/106360441
      var m1 = that.$moment(row.StartTime);
      var m2 = that.$moment(row.FinishTime);
      var time = m2.valueOf()-m1.valueOf()
      var hours = parseInt((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = parseInt((time % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = (time % (1000 * 60)) / 1000; 
      return  minutes+'分'
    }
    },
    TimeFormat(row, column, cellValue, index){
      var that = this
      return function(row, column, cellValue, index){      
      if(cellValue!=null){
         var m2 =   that.$moment(cellValue,'HH:mm').diff(that.$moment().startOf('day'),'seconds'); 
         var d = that.$moment.duration(m2, 'seconds');
         var neg = cellValue.indexOf('-')>=0?'-':''
         var hours = Math.floor(d.asHours());
         var mins = Math.floor(d.asMinutes()) - hours * 60;
         console.log("hours:" + hours + " mins:" + mins);
          //this.moment.duration(x, 'milliseconds').asHours 
       return   neg+hours+'时'+mins+'分'
       }
      }
    },
    Negative(row, column, cellValue, index){
      var that = this
      return function(row, column, cellValue, index){                                    
     // var m1 = that.$moment(row.TokenStartTime);
     // var m2 = that.$moment(row.TokenFinishTime); 
     // var m3 = row.TokenMaxTime
     // 
//
     //  m3!=null?m3=m3.split(':'):m3=[0,0]
     // var m3sec = m3[0]*60+m3[1]
     // var pre = 1
     // var Negative = m3sec - (m2.valueOf()-m1.valueOf()) 
     //   Negative<0?pre=-1:pre=1
     //  var hours = parseInt((Negative % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
     //  var minutes = parseInt((Negative % (1000 * 60 * 60)) / (1000 * 60));
     //  var seconds = (Negative % (1000 * 60)) / 1000;
     // if(typeof(cellValue)!='undefined'){
     //   var m2 =   that.$moment(cellValue,'HH:mm').diff(that.$moment().startOf('day'),'seconds'); 
     //   var d = that.$moment.duration(m2, 'seconds');
     //   var neg = cellValue.indexOf('-')>=0?'-':''
     //   var hours = Math.floor(d.asHours());
     //   var mins = Math.floor(d.asMinutes()) - hours * 60;
     //   console.log("hours:" + hours + " mins:" + mins);
     //     //this.moment.duration(x, 'milliseconds').asHours 
     //   return   neg+hours+'时'+mins+'分'
     // }
     }
    },
    MaxTime(row, column, cellValue, index){
      return function(row, column, cellValue, index){
    //  console.log(row.TokenMaxTime);
      var val 
      if(row.TokenMaxTime==undefined){
        val = '0分'
      }else{ 
        var rows = row.TokenMaxTime.split(':')
        val = rows[0]+'分'
      } 
      return val
    }},
    rowdetail(){ 
      let that = this
      return function(){
        console.log('rowdetail',that.TaskRowDetail) 
        let obj = new Array()
        let keys = Object.keys(that.TaskRowDetail)
           keys.forEach(key=>{  
             obj.push({labelname:that.keylabel[key],value:that.TaskRowDetail[key]})
           })  
           console.log(that.TaskListView)
        return obj
      }  
    }
 }, 
    data() { 
     return {    
       mpopupVisible:'', 
       TaskListView:[{}],
       mint:{
         StartTime:'',
         EndTime:'',
          Car:'',  
          StartP:'',
          EndP :'',  
         Car:    [ {  values: ['C1', 'C2', 'C3', 'C4'],   } ],
         StartP: [ {  values: ['2楼线边仓', '3楼线边仓', '1楼线边仓', '0楼线边仓'],   } ],
         EndP  : [ {  values: ['2楼线边仓', '3楼线边仓', '1楼线边仓', '0楼线边仓'],   } ]
       },
       type:'mint',
       PageSize:15,                                  
       width:'250px',         
      //  TaskRowDetail:[],           //右侧列表详情
      
       cardInfo:[
         {title:'行驶距离',
          icon:'',
          updatetime:''
          }
       ]
     }},
    watch:{
     TaskList(){ 
      var height =this.$('.page').height();  
     }
    },
    created(){ 
     if(typeof(this.$router.query)!= 'undefined')
      this.type = 'mint'
     else
      this.type = '' 

   //   this.TaskListView  = this.TaskList
   //   this.TaskRowDetail = this.TaskListView[0] 
    },
    mounted(){
      var height =this.$('.page').height();
      this.tween.to('.foot',.5,{top:height+300})    

      //图表
    //var ctx  = document.getElementById('myChart').getContext("2d"); 
    //var ctx2 = document.getElementById('lineChart').getContext("2d"); 
    //let doudata = {
    //  datasets: [
    //    { 
    //      data: [10, 20, 30],
    //      backgroundColor:[
    //       'rgba(255, 0, 0, 1)',
    //       'rgba(0, 255, 0, 1)',
    //       'rgba(0, 0, 255, 1)',
    //      ]
    //     }    ], 
    //      labels: [
    //      '运行时间',
    //      '工作时间',
    //      '维护时间'  ]
    //  };
    // let linedata = {                                  //chartjs的相关图表类型api：https://www.chartjs.org/docs/latest/charts/bar.html  (英文文档)。
    //  datasets: [
    //    { 
    //      data: [10, 20, 30],
    //      backgroundColor:'rgba(255, 0, 0, 1)',
    //      label:'行驶里程',
    //      yAxisID: 'A', 
    //     },{ 
    //      data: [35, 33, 30],
    //      backgroundColor:'rgba(0, 255, 0, 1)',
    //      label:'上线工作时间',
    //        yAxisID: 'B', 
    //     },{ 
    //      data: [10, 20, 30],
    //      backgroundColor:'rgba(0, 0, 255, 1)',
    //      label:'执行任务数', 
    //     },{ 
    //      data: [10, 20, 30],
    //      backgroundColor:'rgba(0, 0, 255, 1)',
    //      label:'故障次数', 
    //     }    
    //     ], 
    //  
    //      labels: [
    //      'agv1',
    //      'agv2',
    //      'agv3'  ]
    //  };
    //  var douChart = new Chart(ctx,{
    //      // this is the string the constructor was registered at, ie Chart.controllers.MyType
    //      type: 'doughnut',
    //      data: doudata,
    //  //    options: options
    //   }); 
    //  var LineChart = new Chart(ctx2,{
    //      // this is the string the constructor was registered at, ie Chart.controllers.MyType
    //      type: 'bar',
    //      data: linedata,
    //      options: {
    //       scales: {
    //         yAxes: [{
    //         id: 'A',
    //         type: 'linear',
    //         position: 'left',
    //          scaleLabel: {
    //          display: true,
    //          labelString: '行驶里程(千米/秒)'
    //        },
    //         gridLines: {
    //          offsetGridLines: true
    //         }
    //        }, {
    //         id: 'B',
    //         type: 'linear',
    //         position: 'left',
    //          scaleLabel: {
    //          display: true,
    //          labelString: '上线时间'
    //        },
    //         gridLines: {
    //          offsetGridLines: true
    //         }}, {
    //         id: 'C',
    //         type: 'linear',
    //         position: 'right',
    //          scaleLabel: {
    //          display: true,
    //          labelString: '任务次数'
    //        },
    //         gridLines: {
    //          offsetGridLines: true
    //         }}, {
    //         id: 'D',
    //         type: 'linear',
    //         position: 'right',
    //          scaleLabel: {
    //          display: true,
    //          labelString: '故障次数'
    //        },
    //         gridLines: {
    //          offsetGridLines: true
    //         },
    //         ticks: {
    //           max: 22,
    //           min: 0
    //         }
    //       }]
    //     }
    //    },
    //  //    options: options
    //   }); 
    },

    methods: {
      ...mapMutations(['setTaskList','settotalCount','setcurrentPage']),   
    rowname({row, rowIndex}){
        return 'tweenrow'+rowIndex
      },
    rowStyle({row, column, rowIndex, columnIndex}) {              //超时标红显示动效
      if (row.TokenOffset != null) {
        if (row.TokenOffset.indexOf('-') >= 0) {
          this.$nextTick(() => {
            this.tween.killTweensOf('.tweenrow' + rowIndex)
          })
          return {
            backgroundColor: '#ffffff',
            color: '#000000'
          }
        } else {
          this.$nextTick(() => {
            this.tween.fromTo('.tweenrow' + rowIndex, .5, {
              backgroundColor: '#ffffff',
              color: '#ff0000'
            },
            {
              backgroundColor: '#ff0000',
              color: '#ffffff'
            })
          })
        }
      }
    },
       // 单元格的 style 的回调方法
    cellStyle({row, column, rowIndex, columnIndex}) {
      if (columnIndex == 16) {
        if (row.TokenOffset[0] == '-') {
          return `color: #ff0000;`
        }
        return ``
      } else {
        return ''
      }
    },
    TimeTableChange(TimeArr) {
       this.startime= this.getTimeformat(TimeArr[0])
       this.endtime = this.getTimeformat(TimeArr[1]) 
     },
     // 分页
      // 每页显示的条数
    handleSizeChange(val) {
        // 改变每页显示的条数 
        this.setPageSize(val)
        // 注意：在改变每页显示的条数时，要将页码显示到第一页
        this.setcurrentPage(1)
    },
       // 显示第几页
    handleCurrentChange(val) {
        // 改变默认的页数
        this.setcurrentPage(val)
    }, 
      search(){ 
       let param
       //移动端mint 开始，结束时间param
       if(this.type=='mint'){
        var start= this.$moment(this.mint.StartTime).format("YYYY-MM-DD HH:mm:ss")
        var end  = this.$moment(this.mint.EndTime).format("YYYY-MM-DD HH:mm:ss")
        param = {
           StartDateTime:start,
           EndDateTime:end,
           AGVID:this.AGVID,
           OrderID: this.OrderID ? this.OrderID : '',
           StartPlace:this.mint.StartP,
           EndPlace:this.mint.EndP,
           }  
       }else{
          let endDateTime = this.$moment(this.TimeRange[1]).format('HH:mm:ss') === '00:00:00'?this.$moment(this.TimeRange[1]).format('YYYY-MM-DD')+' 24:00:00':this.$moment(this.TimeRange[1]).format("YYYY-MM-DD HH:mm:ss")
       //  console.log(this.$moment(this.TimeRange[1]).format('HH:mm:ss'));
         
         param = {
           StartDateTime:this.TimeRange[0],
           EndDateTime:endDateTime,
           OrderID: this.OrderID ? this.OrderID : '',
           AGVID: this.AGVID,
           StartPlace: this.StartPlace,
           EndPlace: this.EndPlace,
           TaskStatusDescription: this.AGVStatus_
         }  
       } 
         
      //pc端开始，结束时间 param
      this.axios.post('/queryTasklist',param).then(data=>{
        this.currentPage = 1
      //console.log('统计数据返回:','开始时间  ',param.StartDateTime,'结束时间  ',param.EndDateTime);
      //console.log(data.data.ReturnData);
        console.log(`获取信息条数${data.data.ReturnData.length}`)
        this.setTaskList(data.data.ReturnData)
        this.TaskListView = this.TaskList
        console.log(`设置信息条数${this.TaskListView.length}`)
        this.settotalCount(this.TaskListView.length) 
        this.mfilter()                                //地点，小车ID 过滤器
      })
      },
     mfilter(val){                                    
      var filters =   {
        AGVID:this.AGVID,
        TaskStatusDescription:this.AGVStatus_, 
        StartPlaceDescription:this.StartPlace,
        EndPlaceDescription:this.EndPlace,
        OrderID: this.OrderID
      }                                       //console 调试技巧https://www.jb51.net/article/137114.htm
      // this.TaskListView=this.multiFilter(this.TaskList,filters) 
      console.log(`设置信息条数${this.TaskListView.length}`)
      this.settotalCount(this.TaskListView.length)  
    }, 
    multiFilter(array, filters) {                                    //多个起点，终点筛选：https://blog.csdn.net/callmecassie/article/details/94591881
      const filterKeys = Object.keys(filters)
      // filters all elements passing the criteria
      return array.filter((item) => {
        // dynamically validate all filter criteria
        return filterKeys.every(key => {
          //ignore when the filter is empty Anne
          if(!filters[key].length) return true
          return !!~filters[key].indexOf(item[key])
        })
      })
    },
      //自动播放效果
     Picker(val){ 
       this.mpopupVisible = val 
     },
     confirm(val){
       this.mint[this.mpopupVisible]= val
     },
     cancel(val){
       this.mpopupVisible = val  
     },
     openPicker(val) { 
       console.log(val); 
       if(val=='spicker'&&this.mint.StartTime==""){
          this.mint.StartTime = new Date()  
       } else if(val=='epicker'&&this.mint.EndTime==""){
          this.mint.EndTime = new Date() 
       }
       this.$refs[val].open();
       },
     TaskDetail(row, column, event){
       console.log(row, column)
       if (column.label == '打印') {
         this.dayin(row)
         return
       }
        this.$router.push({path:'/TaskDetail',query:{TaskID: row.TaskID,AGVID:row.AGVID,TaskStatus:row.TaskStatus}})
      }, 
    formatJson(filterVal,jsonData){
     	return jsonData.map(v=>filterVal.map(j=>v[j]))
     },
     dayin: function (rowData) {
       function fake_click(obj) {
            var ev = document.createEvent("MouseEvents");
            ev.initMouseEvent(
                "click", true, false, window, 0, 0, 0, 0, 0
                , false, false, false, false, 0, null
                );
            obj.dispatchEvent(ev);
        }
        function download(name, data) {
          var urlObject = window.URL || window.webkitURL || window;
      
          var downloadData = new Blob([data]);
      
          var save_link = document.createElementNS("http://www.w3.org/1999/xhtml", "a")
          save_link.href = urlObject.createObjectURL(downloadData);
          save_link.download = name;
          fake_click(save_link);
        }
        console.log(this.user)
        download(rowData['TaskID'] + '.txt', JSON.stringify({
          username: this.user.username,
          phone: this.user.phone,
          TaskID: rowData['TaskID'],
          TaskTypeName: rowData['TaskTypeName'],
          StartPlaceDescription: rowData['StartPlaceDescription'],
          EndPlaceDescription: rowData['EndPlaceDescription']
        }))
        this.axios.post('/print', {'TaskID':rowData['TaskID']})
     },
    exportexcel(){
      let array = this.TaskList
       import ('../../assets/js/excelOut.js').then(excel=>{
        const tHeader=['任务号','编号', '工单号', '开始时间', '结束时间','状态', '数量', '单位', '资安标签', '起始位置', '中止位置', '任务类型','出岗时间','到岗时间','出入岗时间','规定时间','差异','取消'];//表头
				const title=['任务列表',''];//标题(要和表头列数相等)
        const filterVal=['TaskID','AGVID', 'OrderID', 'StartTime', 'FinishTime', 'TaskStatusDescription', 'Number', 'Unit', 'LabelNumber','StartPlaceDescription', 'EndPlaceDescription', 'TaskTypeName','TokenStartTime','TokenFinishTime','TokenUseTime','TokenMaxTime',
        'TokenOffset','CancelCurrentTask'];//表头对应字段
				const list =array;
        const data = this.formatJson(filterVal,list);
         
				data.map((i,index)=>{
					if(!i) {
            data[index]=''
          }
        })
        let that = this
        let filename = this.$moment(this.TimeRange[0]).format('YYYY/MM/DD')+"-"+ this.$moment(this.TimeRange[1]).format('YYYY/MM/DD')
				const merges=['A1:Q1'];//合并单元格
				excel.export_json_to_excel({
					title:title,
					header:tHeader,
					data,
					merges,
					filename:filename,
					autoWidth:true,
					bookType:'xlsx',
					myRowFont:'2'
				})
		})
      },
      dateConfirm(){}
    },
  
   }
</script>
<style lang='less' scoped>
@import url('../../assets/less/tablefix.less');
.page{
  height:100%;
}
.foot{
  height:100%; 
} 
.el-table td{
    padding: 5px 0!important; 
} 
.select-option{  
  width:200px!important; 
  }
   .mintSearch{
     width:85%; 
     #search{
       width:80px;
     }
   } 
  .tasklist{ 
    .SearchPanel{ 
      margin:0 auto;
      width: 88%;
      display:flex;  
      span{
        font-weight: bold;
        //height:90px;
        line-height: 30px;
      }
      .el-select{  
        width:130px;  
         }
      .el-select:first-child{
        width:80px;
      }
      /* 日期选择框的宽度 */
      .el-date-editor.el-input.el-input__inner, .el-date-editor.el-input__inner {
         width: 130px; }
      
      .searchBtn{
        margin-left:30px;
      }
      .demonstration{
        font-weight: bold;
        font-family: 'PingFang SC', "Helvetica Neue", Helvetica, "microsoft yahei", arial, STHeiTi, sans-serif;
      }
    }
     .el-pagination{
      text-align: center;
    } 
     .el-pagina{
       text-align: left;
       margin-left:15%;
     }
     .el-table__body-wrapper{
     height:auto!important; 
    }
    }
  
  .tabledetail{  
    .title{
       text-align: center;
       font-size:1.5rem; 
       font-weight: bold;
       color:#606266; 
     }
   .top{    
   .tableLeft{ 
     float:left;
     width:auto; 
   } 
   .tableRight{
      float:left; 
      width:29%; 
      margin-left:2rem;   
      ul{
       li{ 
        display: inline-block;
        border: 1px solid gray; 
        text-align: left; 
        padding: 5px 5px; 
        span{
          display: inline-block;     
          width:15rem;
        }
      }
     } 
    }
   }
   .bottom{
     width: 90%;
     height:5rem;
     border-top: 1px solid lightgrey; 
   }
  }
  .el-table .warning-row { 
   background: #eef1f6;
   color:black;
   height: 2rem; 
   }
  .tablebox{
    th{                                                                                                // https://blog.csdn.net/bingot/article/details/91039287
      padding:0!important;
      height:40px;
      line-height: 30px;
      text-align: center; 
    }
    td{
      padding:0!important;
      height:35px;
      line-height: 50px;  
      text-align: center;
    }
  }
 //.bottom{ 
 //  margin:0 auto;
 //  width: 75%;
 //  display: flex;
 //  justify-content:center;
 //  .ring{ 
 //    float:left; 
 //     } 
 //     }
  .el-table .success-row {
     background:#eef1f6;
     color:#606266; }
  .table_h{ 
    background-color: rgb(148, 148, 148)!important; }
</style>
