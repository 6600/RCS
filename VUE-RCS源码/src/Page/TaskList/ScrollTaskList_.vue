<template>
<div class="page tasklist">
  <div class="mintSearch">
     <mt-datetime-picker ref="spicker" type="datetime" year-format="{value}"
               @confirm="dateConfirm()" v-model="mint.StartTime"></mt-datetime-picker>
     <mt-datetime-picker ref="epicker" type="datetime" year-format="{value}"
               @confirm="dateConfirm()" v-model="mint.EndTime"></mt-datetime-picker>

     <mPicker type="Car"       title= '小车' :data = 'mint.Car'        :Visible="mpopupVisible" @cancel="cancel" @confirm="confirm"></mPicker>
     <mPicker type="StartP"    title= '起始位置' :data = 'mint.StartP' :Visible="mpopupVisible" @cancel="cancel" @confirm="confirm"></mPicker>
     <mPicker type="EndP"      title= '结束位置' :data = 'mint.EndP'   :Visible="mpopupVisible" @cancel="cancel" @confirm="confirm"></mPicker>
     <mt-button type="default" @click = "openPicker('spicker')" >开始时间</mt-button>
     <mt-button type="default" @click = "openPicker('epicker')" >结束时间</mt-button>
     <mt-button type="default" @click = "Picker('Car')">         小车ID</mt-button>
     <mt-button type="default" @click = "Picker('StartP')">      开始位置</mt-button>
     <mt-button type="default" @click = "Picker('EndP')">        结束位置</mt-button>
     <mt-button type="primary"  @click = 'fresh'>                查  询</mt-button> 
  </div>

  <div class="SearchPanel">
  <span>时间</span> 
  <el-time-select  placeholder="起始时间"  v-model="startTime" size='small'  :picker-options="{ start: '00:00', step: '00:15', end: '24:00' }"
  @change="mfilter">
  </el-time-select>
  <el-time-select placeholder="结束时间"  v-model="endTime" size='small'  :picker-options="{start: '00:00',step: '00:15',end: '24:00',minTime: startTime}"
  @change="mfilter">
  </el-time-select>
  <span>小车ID</span>
    <el-select style ='"width:80%"'  size='small'  v-model="AGVID"   @change="mfilter"  multiple collapse-tags placeholder="小车ID"> 
    <el-option v-for="item in AGV_Option" :key="item.value" :label="item.label" :value="item.value"  size='small'>
    </el-option>
  </el-select>
  <span>工单号</span>
  <div class="el-input" style='width:180px' >
    <input type="text" autocomplete="off" v-model="OrderID"  @change="mfilter" placeholder="请输入内容" class="el-input__inner">
  </div>
  <!-- <span>状态</span> -->
   <!-- <el-select style ='"width:60%"' popper-class='status_el' size='small'  v-model="AGVStatus"   @change="mfilter"  multiple collapse-tags placeholder="任务状态">  -->
    <!-- <el-option v-for="item in Status_Option" :key="item.value" :label="item.label" :value="item.value" :disabled="item.value!='已完成'?true:false"  size='small'> -->
    <!-- </el-option> -->
  <!-- </el-select> -->
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
    <el-button type="primary" size='small' @click="fresh"     class = 'searchBtn'> 刷新   </el-button> 
    <el-button type="primary" size='small' @click="Taskemail" class = 'searchBtn'>邮箱地址</el-button> 
    <!-- <el-button type="primary" size='small' @click="add" class = 'searchBtn'>添加</el-button>  :cell-style="cellStyle" -->
   </div>
 <!-- <div class="tableContain">  -->
  <!-- <el-table ref="table" :data="TaskList.slice((currentPage-1)*PageSize,currentPage*PageSize)"  :row-style='rowStyle' :row-class-name='rowname' -->
   <!-- :header-cell-style="{background:'rgb(80, 118, 241)',color:'white'}" @row-click="TaskDetail" > -->
       <!-- <af-table-column  prop="FireTokenID"  type="index"  align="center"  label="序号"      width="50">         </af-table-column>   table-column 表格数据格式化formatter属性： https://blog.csdn.net/yytoo2/article/details/83992175?utm_medium=distribute.pc_relevant_t0.none-task-blog-blogcommendfrommachinelearnpai2-1.edu_weight&depth_1-utm_source=distribute.pc_relevant_t0.none-task-blog-blogcommendfrommachinelearnpai2-1.edu_weight                                                                                                       http://www.caotama.com/341423.html -->
       <!-- <af-table-column  column       prop="TaskID"              align="center"  label="任务号"    width="175">  </af-table-column>     -->
       <!-- <af-table-column  prop="AGVID" label="编号"         align="center"                   width="50">          </af-table-column>  -->
        <!-- <!-- :filters="[{text: 'C1', value: 'C1'}, {text: 'C2', value: 'C2'}, {text: 'C3', value: 'C3'}, {text: 'C4', value: 'C4'}]" -->
       <!-- :filter-method="AGVIDfilter" -->
       <!-- :filter-method="Statusfilter":filters="[{text: '已完成', value: '已完成'}, {text: '待执行', value: '待执行'}, {text: '任务异常', value: '任务异常'}, {text: '正在执行', value: '正在执行'}]" --> -->
       <!-- <af-table-column  prop="TaskStatusDescription"  label="状态" align="center">                              </af-table-column>  -->
       <!-- <af-table-column  prop="Number" label="数量"    align="center"  width="50">                               </af-table-column> -->
       <!-- <af-table-column  prop="Unit"   label="单位"    align="center"  width="50">                               </af-table-column> -->
       <!-- <af-table-column  prop="StartPlaceDescription" :formatter="StartEndPlace"  label="起终位置"   align="center" width="270">    </af-table-column> -->
       <!-- <af-table-column  prop="LabelNumber"        label="资安标签"       align="center"     width="50">         </af-table-column> -->
       <!-- <af-table-column  prop="TaskTypeName"       label="任务类型"       align="center"     width="120">        </af-table-column> -->
       <!-- <af-table-column  prop="TokenStartTime"     label="出岗时间"       align="center"     width="160">        </af-table-column> -->
       <!-- <af-table-column  prop="TokenFinishTime"    label="到岗时间"       align="center"     width="160">        </af-table-column> -->
       <!-- <af-table-column  prop="TokenUseTime"       label="出入岗时间"     align="center"     width="120">        </af-table-column> -->
       <!-- <af-table-column  prop="TokenMaxTime"       label="规定时间"       align="center"     width="80" >        </af-table-column>  -->
       <!-- <af-table-column  prop="TokenOffset"        label="差异"           align="center"     width="90" >        </af-table-column>                     -->
       <!-- <af-table-column  prop="CancelCurrentTask"  label="取消"           align="center"     width="90" >        </af-table-column>                     -->
       <!-- <el-table-column  prop="AGVID" :formatter="comment"  label="备注"  align="center" width="100">       </el-table-column>  -->
  <!-- </el-table> -->
  <!-- <el-pagination background layout="prev, pager, next"   -->
       <!-- @size-change="handleSizeChange"  -->
       <!-- @current-change="handleCurrentChange"  -->
       <!-- :current-page="currentPage"  -->
       <!-- :total="totalCount" -->
       <!-- :page-size="PageSize" > -->
  <!-- </el-pagination>  -->
 <!-- </div> -->
     <!-- :page-size="PageSize" > -->
   <!-- </el-pagination> -->
   <!-- </div> -->
   <div class="tabledetail">
    <el-row> 
      <HeaderList>
      </HeaderList>
    </el-row>
    <el-row>  
    <el-row> 
    </el-row>
      <div class="top"> 
      <div class="tableLeft">  
       <el-table  :data="TaskList.slice((currentPage-1)*PageSize,currentPage*PageSize)"  
       :cell-style="cellStyle"
       :row-style='rowStyle' 
       :row-class-name='rowname'
       :header-cell-style="{background:'rgb(80, 118, 241)',color:'white'}"  border  @row-click="TaskDetail">
            <af-table-column  prop="FireTokenID"  align="center" type="index" label="序号" width="50">                     </af-table-column> 
             <!--table-column 表格数据格式化formatter属性： https://blog.csdn.net/yytoo2/article/details/83992175?utm_medium=distribute.pc_relevant_t0.none-task-blog-blogcommendfrommachinelearnpai2-1.edu_weight&depth_1-utm_source=distribute.pc_relevant_t0.none-task-blog-blogcommendfrommachinelearnpai2-1.edu_weight                                                                                                       http://www.caotama.com/341423.html -->
            <af-table-column  column prop="TaskID" align="center"   label="任务号"       width="180" >                     </af-table-column>    
            <af-table-column  prop="AGVID"         label="编号"     align="center"       width="50"  >                     </af-table-column>
            <af-table-column  prop="OrderID"  label="工单号"   align="center"         width="80"  >                       </af-table-column>
            <af-table-column  prop="StartTime"  label="开始时间"   align="center"         width="120"  >                       </af-table-column>
            <af-table-column  prop="FinishTime"  label="完成时间"   align="center"         width="120"  >                       </af-table-column>
            <af-table-column  prop="TaskStatusDescription"   label="状态" align="center" width="80">                       </af-table-column> 
            <af-table-column  prop="StartPlaceDescription"  :formatter="StartEndPlace"   label="起终位置"      align="center"   width="275">    </af-table-column>
            <af-table-column  prop="TaskTypeName"            label="任务类型"      align="center"   width="120" >           </af-table-column> 
            <af-table-column  prop="TokenUseTime"            label="出入岗时间"    align="center"   width="100">            </af-table-column>
            <af-table-column  prop="TokenMaxTime"            label="规定时间"      align="center"   width="80" >            </af-table-column> 
            <af-table-column  prop="TokenOffset"             label="差异"          align="center"   width="90" >            </af-table-column>           
           <!-- <el-table-column  prop="AGVID" :formatter="comment"  label="备注"  align="center" width="100">          </el-table-column>  -->
        </el-table>
        <el-pagination 
          class='el-pagina'
          background layout="prev, pager, next"  
          @size-change="handleSizeChange" 
          @current-change="handleCurrentChange" 
          :current-page="currentPage" 
          :total="totalCount"
          :page-size="PageSize" >
        </el-pagination>
        </div>
        <div class="tableRight">
          <div class="title">
            Agv运行信息
          </div>
          <div class="canvas-wrapper">
            <canvas id="myChart" width="300" height="100"></canvas> 
          </div>
         <el-table  :data="rowdetail()"   
            :header-cell-style="{background:'rgb(80, 118, 241)',color:'white'}"  border  @row-click="TaskDetail">
            <af-table-column  column prop="labelname"   align="left"   label="信息项"   width="250">            </af-table-column>  
             <!-- <af-table-column 表格数据格式化formatter属性： https://blog.csdn.net/yytoo2/article/details/83992175?utm_medium=distribute.pc_relevant_t0.none-task-blog-blogcommendfrommachinelearnpai2-1.edu_weight&depth_1-utm_source=distribute.pc_relevant_t0.none-task-blog-blogcommendfrommachinelearnpai2-1.edu_weight                                                                                                       http://www.caotama.com/341423.html --> -->
            <af-table-column   column prop="value"      align="left"   label="值"       width="250">         </af-table-column>  
         </el-table>
        </div> 
        </div>  
       </el-row>
       <div class="bottom">
         <div class="title">
            Agv运行信息对比
          </div>
        <div class="canvas-wrapper">
           <canvas id="lineChart" width='1000' height='200' style='width:1083px;height:300px;'></canvas>  
         </div>
       </div> 
   </div> 
 <taskDialog class="loading" v-show="outTime" :mtitle='dialoginfo'  @confirm="closedialog"/>
  
</div>
</template>
<script>

import      { Button,DatetimePicker,Picker }                                       from        'mint-ui'; 
import      {mapState,mapActions,mapMutations}                                     from        'vuex'
var         dateFormat = require('dateformat');            
                                                    //日期格式化插件
import      moment                                                                 from        'moment'
import      taskDialog                                                             from        '../../components/task-dialog'
import      mPicker                                                                from        './Picker' 
import      Chart                                                                  from        'chart.js'
import      HeaderList                                                             from        './HeaderList'
 //列表滚动https://github.com/xrkffgg/Kvue/blob/master/src/components/uiCom/001.vue
// import { log } from 'i:/www/swap/src/js/utils/humane'
  export default {
  components:{Button,DatetimePicker,mPicker,taskDialog},
  computed:{
       //VueX状态管理Module的使用 mapState:https://www.jianshu.com/p/0b42a876561e
     ...mapState( {  
       ScrollTask:   state         => state.TaskList.ScrollTask,        
       UpdateTask:   state         => state.TaskList.UpdateTask,           
       AGV_Option:   state         => state.TaskList.AGV_Option,    
       Status_Option:state         => state.TaskList.Status_Option,    
       Start_Option: state         => state.TaskList.Start_Option,    
       End_Option:   state         => state.TaskList.End_Option,    
  }),
  AGVStatus:{
    get:function (){   return this.$store.state.TaskList.AGVStatus   },
    set:function (v){  
      this.$store.state.TaskList.AGVStatus = v   }
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
    getTimeformat(val){
      return function(val){
        var d = new Date(val);  
        var datetime=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
        return datetime
     }
    },
    StartEndPlace(row, column, cellValue, index){
       let that = this
      return function(row, column, cellValue, index){  
       let currentIdX = (that.currentPage-1)*that.PageSize+index
       let startp = that.ScrollTask[currentIdX].StartPlaceDescription=="undefined"?'':that.ScrollTask[currentIdX].StartPlaceDescription 
       let endp   = that.ScrollTask[currentIdX].EndPlaceDescription  =="undefined"?'':that.ScrollTask[currentIdX].EndPlaceDescription 
     //  console.log(that.ScrollTask[currentIdX].StartPlaceDescription,index); 

        return startp+ "-"+ endp
      }
    },
  //  TaskIDEX(row, column, cellValue, index){
  //    return function(row, column, cellValue, index){
  //      var CellS = cellValue.split('-')
  //     cellValue = row.AGVID +'-'+ CellS[0]+ CellS[1] 
  //      return cellValue
  //    }
  //  },
    TimeEX(row, column, cellValue, index){
      var that = this
      return function(row, column, cellValue, index){                                    //插件 参考https://blog.csdn.net/weixin_44675537/article/details/106360441
  
      if(cellValue!=''){ 
        return  that.$moment(cellValue).format("YYYY/MM/DD HH:mm:ss");
       }
      }
    }, 
    TimeFormat(row, column, cellValue, index){                                           //时间过滤 
      var that = this
      return function(row, column, cellValue, index){      
      if(cellValue!=null){
         var m2  =  that.$moment(cellValue,'HH:mm').diff(that.$moment().startOf('day'),'seconds'); 
         var d   =  that.$moment.duration(m2, 'seconds');
         var neg =  cellValue.indexOf('-')>=0?'-':''
         var hours = Math.floor(d.asHours());
         var mins  = Math.floor(d.asMinutes()) - hours * 60;
         console.log("hours:" + hours + " mins:" + mins);
          //this.moment.duration(x, 'milliseconds').asHours 
       return   neg+hours+'时'+mins+'分'
       }
      }
    },
    Negative(row, column, cellValue, index){
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
 }, 
    data() {
     return {      
       outTime:false,
       dialoginfo:'',
       mpopupVisible:'',
       mint:{                                                            //移动端相关starttime,endtime等相关参数
         StartTime:'',
         EndTime:'',
          Car:'',  
          StartP:'',
          EndP :'',  
         Car: [ {  values: ['全部','C1', 'C2', 'C3', 'C4'],   } ],
         StartP: [ {  values: ['全部','2楼线边仓', '3楼线边仓', '1楼线边仓', '0楼线边仓'],   } ],
         EndP: [ {  values: ['全部','2楼线边仓', '3楼线边仓', '1楼线边仓', '0楼线边仓'],   } ]
       },
       type:'',                    
       width:'250px',    
       startTime:'00:00',
       endTime:'24:00',   
       AGVID:'', 
       StartPlace:'',
       EndPlace:'',
       TaskList:'',

       TaskListView:'',            
       TaskRowDetail:[],           //右侧列表详情

     totalCount:0,
     currentPage:1,
     PageSize:15,              //获取页面的数量 
     }},
    watch:{
     TaskList(){ 
      var height =this.$('.page').height();  
     },
     
     UpdateTask(newV,oldV){
      this.TaskList  = this.ScrollTask
      this.mfilter()
      if(newV.TokenOffset.indexOf('-')<0&&newV.TokenOffset.indexOf(':')>=0){  
        this.outTime = true
        this.sound.play()
        this.dialoginfo ='任务'+newV.TaskID+',超时'+newV.TokenOffset
       }
     }
    },
    created(){ 
       //清除前天记录
      var today = this.$moment().format('YYYY-MM-DD')+' 00:00:00' 
           console.log('清除今天',today,'前的信息');
      this.TaskList = this.ScrollTask.filter(item=>{ 
        if(!this.$moment(item.TokenStartTime).isBefore(today))
          return item
      })
     if(typeof(this.$router.query)!= 'undefined')                //判断是不是移动端页面
      this.type = 'mint'
     else
      this.type = ''  

      this.TaskListView  = this.ScrollTask
      this.TaskRowDetail = this.TaskListView[0] 
    },
    mounted(){
      var height =this.$('.page').height(); 
      this.tween.to('.foot',.5,{top:height+200})  
      this.totalCount = this.TaskList.length  
      this.$refs.table.bodyWrapper.id = 'mtable'
       this.mfilter() 
      
      //2021/1/2
      var ctx  = document.getElementById('myChart').getContext("2d"); 
var ctx2 = document.getElementById('lineChart').getContext("2d"); 
let doudata = {
  datasets: [
    { 
      data: [10, 20, 30],
      backgroundColor:[
       'rgba(255, 0, 0, 1)',
       'rgba(0, 255, 0, 1)',
       'rgba(0, 0, 255, 1)',
      ]
     }    ], 
      labels: [
      '运行时间',
      '工作时间',
      '维护时间'  ]
  };
 let linedata = {                                  //chartjs的相关图表类型api：htt
  datasets: [
    { 
      data: [10, 20, 30],
      backgroundColor:'rgba(255, 0, 0, 1)',
      label:'行驶里程',
      yAxisID: 'A', 
     },{ 
      data: [35, 33, 30],
      backgroundColor:'rgba(0, 255, 0, 1)',
      label:'上线工作时间',
        yAxisID: 'B', 
     },{ 
      data: [10, 20, 30],
      backgroundColor:'rgba(0, 0, 255, 1)',
      label:'执行任务数', 
     },{ 
      data: [10, 20, 30],
      backgroundColor:'rgba(0, 0, 255, 1)',
      label:'故障次数', 
     }    
     ], 
  
      labels: [
      'agv1',
      'agv2',
      'agv3'  ]
  };
  var douChart = new Chart(ctx,{
      // this is the string the constructor was registered at, ie Chart.controller
      type: 'doughnut',
      data: doudata,
  //    options: options
   }); 
  var LineChart = new Chart(ctx2,{
      // this is the string the constructor was registered at, ie Chart.controller
      type: 'bar',
      data: linedata,
      options: {
       scales: {
         yAxes: [{
         id: 'A',
         type: 'linear',
         position: 'left',
          scaleLabel: {
          display: true,
          labelString: '行驶里程(千米/秒)'
        },
         gridLines: {
          offsetGridLines: true
         }
        }, {
         id: 'B',
         type: 'linear',
         position: 'left',
          scaleLabel: {
          display: true,
          labelString: '上线时间'
        },
         gridLines: {
          offsetGridLines: true
         }}, {
         id: 'C',
         type: 'linear',
         position: 'right',
          scaleLabel: {
          display: true,
          labelString: '任务次数'
        },
         gridLines: {
          offsetGridLines: true
         }}, {
         id: 'D',
         type: 'linear',
         position: 'right',
          scaleLabel: {
          display: true,
          labelString: '故障次数'
        },
         gridLines: {
          offsetGridLines: true
         },
         ticks: {
           max: 22,
           min: 0
         }
       }]
     }
    },
  //    options: options
   }); 
  
   //   this.InitScroll(this.TaskList)
    },
    methods: {
    ...mapMutations(['setScrollTask','settotalCount','setcurrentPage','InitScroll','setAGVStatus']),   
    rowname({row, rowIndex}){
      return 'tweenrow'+rowIndex
    },
     // 单元格的 style 的回调方法 
     
    rowStyle({row, column, rowIndex, columnIndex}) {              //超时标红显示动效
     if(row.TokenOffset!=null){ 
     if(row.TokenOffset.indexOf('-')<0&&row.TokenOffset.indexOf(':')>=0){
       this.$nextTick(() => {  
      this.tween.fromTo('.tweenrow'+rowIndex,.5,{backgroundColor:'#ffffff',color:'#ff0000'},{backgroundColor:'#ff0000',color:'#ffffff'})  
     })         
    }else{
    this.$nextTick(() => {  
         this.tween.killTweensOf('.tweenrow'+rowIndex ) 
     })   
       return {backgroundColor:'#ffffff',color:'#000000'}
    }  } 
    },
    // 单元格的 style 的回调方法
    cellStyle({row, column, rowIndex, columnIndex}) {      
    if (columnIndex == 12) { 
       var m1 = this.$moment(row.StartTime);
       var m2 = this.$moment(row.FinishTime); 
       var m3 = row.TokenMaxTime  
        m3!=null?m3=m3.split(':'):m3=[0,0]
       var m3sec = m3[0]*60+m3[1]
       var pre = 1
       var Negative = m3sec - (m2.valueOf()-m1.valueOf()) 
       if(Negative<0) return `color:#ff0000;` 
       else   return `` 
        } else {
            return ''
        } 
    },
    rowdetail(){ 
      let that = this
      return function(){
        console.log('rowdetail',that.TaskRowDetail) 
        let obj = new Array()
        let keys = Object.keys(that.TaskRowDetail)
           keys.forEach(key=>{  
             obj.push({labelname:that.keylabel[key],value:that.TaskRowDetail[key]})
           }) 
           console.log(obj)
           console.log(that.TaskListView)
        return obj
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
           this.PageSize=val
           // 注意：在改变每页显示的条数时，要将页码显示到第一页
           this.currentPage =1
       },
         // 显示第几页
       handleCurrentChange(val) {
           // 改变默认的页数
           this.currentPage=val
       },
      
      fresh(){                                         //表格筛选功能
       let param
       if(this.type=='mint'){
        var start= this.$moment(this.mint.StartTime).format("YYYY-MM-DD HH:mm:ss")
        var end= this.$moment(this.mint.EndTime).format("YYYY-MM-DD HH:mm:ss")
          param = {
           StartDateTime:start,
           EndDateTime:end,
           AGVID:  this.mint.Car,
           OrderID: this.OrderID ? this.OrderID : '',
           StartPlace:this.mint.StartP,
           EndPlace:this.mint.EndP,
           }  
       }else{
          param = {
           StartDateTime:this.$moment().format("YYYY-MM-DD")+' 00:00:00',
           EndDateTime:this.$moment().format("YYYY-MM-DD")+' 24:00:00',
           AGVID: this.AGVID,
           OrderID: this.OrderID ? this.OrderID : '',
           StartPlace: this.StartPlace,
           EndPlace: this.EndPlace,
           }  
       }   
       this.axios.post('/queryTasklist',param).then(data=>{
          console.log('今日列表数据返回 :开始时间',param.StartDateTime,'结束时间  ',param.EndDateTime); 
           this.InitScroll(data.data.ReturnData)
           this.TaskList = data.data.ReturnData 
           console.log( this.TaskList);   
           this.settotalCount(data.data.ReturnData.length) 
           this.mfilter()
       })
     }, 
      tableMove(){
        // 48px 为表格行高
        let t = document.getElementsByClassName('el-table__body-wrapper')
        setTimeout(() =>{
          this.TaskList.splice(4,1)
          t[0].style.transition = 'all .5s'
          t[0].style.marginTop = '48px'
        },500)
        setTimeout(() =>{
          this.TaskList.unshift({ date: this.getNowDate('ss') })
          t[0].style.transition = 'all 0s ease 0s'
          t[0].style.marginTop = '0'
        },1000)
      },
      mfilter(val){                                    
       var startT = this.$moment(new Date()).format("YYYY-MM-DD ")+(typeof(this.startTime)=='object'?'00:00':this.startTime);    //按火令牌的TokenStartTime和datepicker组件获取到的starttime变量进行筛选
       var endT   = this.$moment(new Date()).format("YYYY-MM-DD ")+(typeof(this.endTime)=='object'?'24:00':this.endTime);
       this.TaskList =  this.ScrollTask.filter(item=>{
         return this.$moment(item.SetTime)>=this.$moment(startT) &&this.$moment(item.SetTime)<=this.$moment(endT) 
        })   
      console.log('时间筛选测试','开始时间:',startT,'结束时间:',endT,'筛选结果:',this.TaskList );
      
       this.setAGVStatus(this.AGVStatus)
       var filters =   {                                                       //多条件筛选
        AGVID:this.AGVID,
        TaskStatusDescription:this.AGVStatus,
        StartPlaceDescription:this.StartPlace,
        EndPlaceDescription:this.EndPlace
        }
                                      //console 调试技巧https://www.jb51.net/article/137114.htm
       this.TaskList = this.multiFilter(this.TaskList,filters)
     //   console.log('其他多条件筛选测试:',filters,'筛选结果',this.TaskList)   
     //     this.totalCount = this.TaskList.length 
       this.totalCount = this.TaskList.length  
      }, 
       multiFilter(array, filters) {                                    //多条件的筛选，此部分参考了网上源码，主要是提取对象数组keys序列，以及values序列：https://blog.csdn.net/callmecassie/article/details/94591881
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
      AGVIDfilter(value, row, column) {                     
        const property = column['property'];
        return row[property] === value;
      },
      Statusfilter(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      },
      Taskemail(){ 
        this.$router.push({path:'/Taskemail'  })   
      },
      TaskDetail(row, column, event){ 
        this.$router.push({path:'/TaskDetail',query:{TaskID: row.TaskID,AGVID:row.AGVID,TaskStatus:row.TaskStatus}})
      },
      //自动播放效果
      Picker(val){   this.mpopupVisible = val  },
      confirm(val){   this.mint[this.mpopupVisible]= val  },
      cancel(val){ this.mpopupVisible = val   },
      openPicker(val) {   console.log(val); 
        if(val=='spicker'&&this.mint.StartTime==""){
           this.mint.StartTime = new Date()  
        } else if(val=='epicker'&&this.mint.EndTime==""){
           this.mint.EndTime = new Date() 
        }
        this.$refs[val].open();
        },
      closedialog(){
        this.outTime = false
        this.sound.stop()
      }
    },
  
   }
</script>
 
<style lang='less' scoped>
 //@important('../../')
.foot{
    height:808px; 
} 
.el-table td{
    padding: 5px 0!important; 
}
.el-select__tags{
  widows: 140px!important;
  max-width: 140px!important;
}
.select-option{  width:200px!important; }
   .mintSearch{
     width:85%; 
     #search{
       width:80px;
     }
   }
 .el-table{
     flex-grow: column;
    width: 100%;
     height:780px!important;
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
        width:150px;  
         }
     
      .el-select:first-child{
        width:80px;
      }
      /* 日期选择框的宽度 */
      .el-date-editor.el-input{
        width:100px;
      } 
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
     .el-table__body-wrapper{
     height:auto!important; 
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
  .bottom{ 
    margin:0 auto;
    width: 75%;
    display: flex;
    justify-content:center;
    .ring{ 
      float:left; 
       } }
  .el-table .success-row {
     background:#eef1f6;
     color:#606266; }
  .table_h{ 
    background-color: rgb(148, 148, 148)!important; }
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
</style>