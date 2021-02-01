
<template>
  <div class="datachart" ref='dataView'>
   <div class="mintSearch" v-show="type =='mint'">
      <mt-datetime-picker ref="spicker" type="datetime"    
         @confirm="dateConfirm()" v-model="mstartTime"></mt-datetime-picker>
     <mt-datetime-picker ref="epicker" type="datetime"  
         @confirm="dateConfirm()" v-model="mendTime"></mt-datetime-picker>

    <mt-button type="default" @click = "openPicker('spicker')" >开始时间</mt-button>
    <mt-button type="default" @click = "openPicker('epicker')" >结束时间</mt-button>     
    <mt-button type="primary" id="search" @click = 'search'>查  询</mt-button>  
   </div> 
      
    <div class="sheader">
     <span class="demonstration">开始日期:</span>
     <el-date-picker  value-format="yyyy-MM-dd" :picker-options="pickerOptionsStart" v-model="startTime" type="date" placeholder="选择日期"></el-date-picker>
     <span class="demonstration">结束日期:</span>
     <el-date-picker  value-format="yyyy-MM-dd" :picker-options="pickerOptionsEnd"   v-model="endTime" type="date" placeholder="结束日期"></el-date-picker>
       <el-button  class='search' type="primary"  size='small' @click='search' >查询</el-button>
       <!-- <el-button type="primary" size='small' @click='exportexcel'>导出</el-button> -->
  </div>
      <!--报错 component lists rendered with v-for should have explicit key  v-show = 'isFirstShow' -->
     <ul class="PieChart">  
         <li v-for="(item,idx) in StaticsData.slice(0,6)"  @click="PieSelect(item,idx)"  >  
         <PieChart :ID='item.ID' :title='item.title' :index="idx"  :Piedata='item.pie' :type='item.type' @pageresponse='Pageonresize'>   </PieChart>   
        </li>    
     </ul>   
      <div class="LineChart">
      <LineChart :select = 'PieSelectIDX' ChartType='稼动率' @pageresponse='Pageonresize'></LineChart>
     </div>
   
  </div>
</template>

<script>
import   LineChart                                              from './LineChart'
import   PieChart                                               from './PieChart'
import      {mapState,mapActions,mapMutations}                  from 'vuex'
//import      moment                                              from 'moment'

export default {
  components:{
    PieChart,
    LineChart
  },
  data() {
      return { 
       pickerOptionsStart: {  
         disabledDate: time => { 
         if(this.endTime) {    
           return time.getTime() > new Date(this.endTime).getTime()  
           }   }   },
       pickerOptionsEnd: { 
          disabledDate: time => { 
          if(this.startTime) {  
            return time.getTime() < new Date(this.startTime).getTime() - 86400000 }   }
           },
       mstartTime:'',
       mendTime:'',
       width:'28rem',
       Label:{1:'原料配送',3:'成品(栈板)配送',4:'栈板配送',5:'手动配送',6:'退料任务',7:'成品料车配送'},
       //  isFirstShow:false                            //是否第一次使用 
         type:''
      }
    }, 
 
  computed:{
    ...mapState( { 
       startTime:    state => state.DataStatistics.startTime,  
       endTime:      state => state.DataStatistics.endTime,      //任务日志不超过5条，可更新最新
       PieSelectIDX: state => state.DataStatistics.PieSelectIDX,   
       StaticsData:  state => state.DataStatistics.StaticsData       

    }),
     startTime:{ 
       get:function(){     return this.$store.state.DataStatistics.startTime   },
       set:function (v){   this.$store.state.DataStatistics.startTime = v }
   },
     endTime:{ 
       get:function(){     return this.$store.state.DataStatistics.endTime   },
       set:function (v){   this.$store.state.DataStatistics.endTime = v }
       }
  },
  created(){     
  //  var  param ={  "startime": "2017-04-04","endtime": "2018-01-31"}
  //  if(this.startTime!=undefin&&this.endTime!=null)
  //       var  param ={  "startime": this.startTime,"endtime": this.endTime}
   //  console.log(this.StaticsData);
   if(typeof(this.$router.query)!= 'undefined')
      this.type = 'mint'
     else
      this.type = ''
    },
  mounted(){  
    this.Pageonresize()                                            //没错页面自适应
    var that = this
    window.onresize = function () {
      that.Pageonresize()  
    } 
    if(this.StaticsData==''||this.StaticsData==[]){                             //判断是否为空值      
      var today =  this.$moment(new Date()).format('YYYY-MM-DD') 
     var  param ={  "startime": today,"endtime": today} 
     this.axios.post('/querystatics',param).then(data=>{ 
         console.log('返回 '+today+'统计数据',data.data.ReturnData);
        if(data.data.ReturnData==[]){
           this.$('.PieChart,.LineChart').hide() 
        }else{
          this.setStatics(data.data.ReturnData) 
          this.SetPieIDX(data.data.ReturnData.length-1) 
        }
     })
    } 
  }, 
  methods:{  
    ...mapMutations(['setstartTime','setendTime','setStatics','SetPieIDX','SetChartType']),
    Pageonresize(){ 
    var height =this.$('.page').height(); 
       this.tween.to('.foot',    .5,{top:height<40?200:height+200}) 
       console.log(height);
    },
    search(){   
      var  param ={  "startime": "2020-09-04","endtime": "2020-10-01"}
      
      if(this.startTime!=''&&this.endTime!=''){
        if(this.type=='mint'){
          var start= this.$moment(this.mstartTime).format("YYYY-MM-DD HH:mm:ss")
          var end= this.$moment(this.mendTime).format("YYYY-MM-DD HH:mm:ss")
          console.log(start,end);
          param ={  "startime": start,"endtime":end}  
        }else{
          param ={  "startime": this.startTime,"endtime": this.endTime} 
        } 
        console.log(param)
       this.axios.post('/querystatics',param)
       .then(data=>{ 
          console.log('返回 '+param.startime,param.endtime,'的统计',data.data.ReturnData); 
          this.setStatics(data.data.ReturnData) 
          this.Pageonresize()

        })
     } 
    },
    PieSelect(item,idx){
      console.log('选择了  ',item.type+'饼图',idx,this.PieSelectIDX); 
      for(let i =0;i<=5;i++){                                              //点击放大的缓动动画 
        this.tween.to('.tweenPie'+i,{scaleX:1,scaleY:1}) 
        this.$('.tweenPie'+i).css({zIndex:0})
      } 
      if(idx!=this.PieSelectIDX){ 
         var zIndex = this.$('.tweenPie'+idx).css('zIndex')
        if(zIndex=='2'){
          this.tween.to('.tweenPie'+i,{scaleX:1,scaleY:1}) 
          this.$('.tweenPie'+i).css({zIndex:0}) 
        }else{
          this.tween.to('.tweenPie'+idx,{scaleX:1.09,scaleY:1.09})
          this.$('.tweenPie'+idx).css({zIndex:2}) 
        }
      }
        this.SetPieIDX(idx)
      if(item.type!='OrderStyle'){
        this.SetChartType(item.type) 
      } 
    },
    openPicker(val) { 
    console.log(val); 
    if(val=='spicker'&&this.startTime==""){
       this.startTime = new Date()  
    } else if(val=='epicker'&&this.endTime==""){
       this.endTime = new Date() 
    }
    this.$refs[val].open();
    },
   dateConfirm(){},
    exportexcel(){}, 
  } 
}
</script>

<style lang='less' scoped>
.page{
  margin-left:6%;
}
ul{
  margin:0 auto;
  width: 100rem;
  display:flex;
  flex-wrap:wrap;
  li{ 
    flex-flow: column; 
    margin-left:15px;
    float:left;
  }
}
  .chartList{
    width: 90%;   
    height: auto;   //可上下滚动
  }
  .datachart{
    height: 100%;
    overflow: auto;
    overflow-x: hidden;
    width: 100%;
    .sheader{ 
      display: flex;
      justify-content: center;
      line-height: 40px;
      font-weight:bold;
      .search{
        margin-left:10px;
      }
    }
  }
  .header{ 
    width:10rem;
    display: flex;
    justify-content: center;
    line-height: 40px;
  }
.el-date-editor.el-input, .el-date-editor.el-input__inner {
    width: 135px;
} 
 
.PieChart,.LineChart{
    width: 95%;
//     border: 1px solid #000;
    height: auto;
    margin: 0;
}
li {
  width: 100%;
}
</style>