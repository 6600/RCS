
<template>
  <div class="page">
   <div class="header"> <span class='title'>任务详情</span><div class='Taskreturn' @click="Taskreturn"> 
     <i class = 'iconfont icon-fanhui'></i><div>返回列表</div></div> 
     </div>
      <Panel width='95%' height='400px' type="Taskinfo">
      <!-- <ul class='section1'> -->
        <!-- <li v-for="(value,key) in label[0]"><span class='labelname'>{{value}}</span><span class='value'>{{Task[key]}}</span></li> -->
      <!-- </ul> -->
      <div class="paneltop">
          <div class="section1">  <span class='labelname'>打印任务</span>   <button @click="dayin">打印</button></div>
          <div class="section1">  <span class='labelname'>任务ID</span>   <span class='value'>{{Task['TaskID']}}</span>        </div>
          <div class="section1">  <span class='labelname'>任务类别</span> <span class='value'>{{Task['TaskTypeName']}}</span>  </div> 
          <div class="section1">  <span class='labelname'>任务状态</span> <el-tag size= 'medium ' :type="TypeStatus(Task.TaskStatusDescription)" class='value'>{{Task['TaskStatusDescription']}}</el-tag></div> 
        
          <ul class='section2'>
            <li v-for="(value,key) in label[1]"><span class='labelname'>{{value}}</span><span class='value'>{{Task[key]}}</span></li>
          </ul>
        <div class="avgicon">
          <!--svg使用方式 https://blog.csdn.net/zjq_1314520/article/details/90338949 -->
          <svg class="icon" aria-hidden="true">
             <use xlink:href="#icon-zhinengkeji-icon-9"></use>
          </svg>
          <!-- <i class= 'iconfont icon-zhinengkeji-icon-9 zhinengkeji'></i> -->
       </div> 
      </div>
     
       <ul class='section3'>
        <li v-for="(value,key) in label[2]"><span class='labelname'>{{value}}</span><span class='value'>{{Task[key]}}</span></li>
      </ul>
      <ul class='section4'>
        <li>筐条码列表</li>
        <li><span v-for="(value2,key2) in (Task['MaterialIDs'] ? Task['MaterialIDs'].split(';') : [])" :key="key2">{{value2}}</span></li>
      </ul>
    </Panel> 
    <div class="chart">
      <div class="rateText">
        <span class="title">小车速率：</span> <span>{{velocity}}/秒</span>
        
       </div> 
       <div class="ChartContain">
         <TimeChart @Taskinit="Taskinit" @velocity='velocityListener'>    
       </TimeChart> 
       </div> 
      <Panel width='36%' height='280px' type="Chart">
        <span>物料数量</span>
       <div ref='MMaterialID'    :style="matterPieStyle" ></div>      
       </Panel>
    </div> 
    <!-- <Panel width='95%' height='500px' type="TaskStep"> -->
      <!-- wait / process / finish / error / success -->
      <!-- <div class="stepHeader"> -->
         <!-- <el-steps :space="200" :active="2" finish-status="process" :align-center='true'> -->
        <!-- <el-step title="待执行"   icon="iconfont step icon-dengdaizhihang"></el-step> -->
        <!-- <el-step title="正在执行" icon="iconfont step icon-yunshuzhongwuliu"></el-step> -->
        <!-- <el-step title="已完成"   icon="iconfont step icon-ziyuan"></el-step>  -->
       <!-- </el-steps> -->
      <!-- </div> -->
      <!-- <div class="content"> -->
        <!-- <div style="height: 300px;"> -->
          <!-- <el-steps direction="vertical" :active="1"> -->
<!--             -->
           <!-- <el-step v-for="item in " title="1"></el-step> -->
           <!-- <el-step title="2"></el-step> -->
           <!-- <el-step title="3"></el-step> -->
          <!-- </el-steps> -->
        <!-- </div> -->
      <!-- </div> -->
    <!-- </Panel> -->

  </div>
</template>
<script>
import     Panel                                                                   from './Panel'
import     TimeChart                                                               from './TimeChart'
import                                                                            'echarts-liquidfill' 
import      {mapState,mapActions,mapMutations}                                     from 'vuex'

  export default {
  components:{Panel,TimeChart}, 
  computed:{
       //VueX状态管理Module的使用 mapState:https://www.jianshu.com/p/0b42a876561e 
    ...mapState( {  
       label:     state      => state.TaskList.label,
       username:  state  =>state.user.username,
       phone:  state  =>state.user.phone,
    }),  
    TypeStatus(val){
    return function(val){ 
      switch(val){
        case '待执行':
          return 'danger'
          break;
        case '正在执行':
          return 'info'
          break;
        case '已完成':
          return 'success'
          break;
        case '异常':
          return 'warning'
          break;
      }
    } 
    }, 
    matterPieStyle(){
      return "margin:0 auto;width:95%;height:16rem;"
    }
 }, 
    data() {
     return {   
      TaskID:'',
      AGVID:'',
      Task:{ },
      velocity:'',
      Barchart:'', 
    }},
    watch:{
     TaskList(){ 
      var height =this.$('.page').height();  
     }
    },
    created(){  
      let TaskID = this.$route.query.TaskID  
       console.log('TaskID :',TaskID); 
      
      this.axios.post('/QueryTaskID',{'TaskID':TaskID}).then(data=>{ 
       console.log('返回TaskID信息 :',TaskID, data.data); 
      if(typeof(data.data.ReturnData[0])!='undefined'){  
     //  this.$emit('Taskinit',data.data.ReturnData[0])
        this.Task = data.data.ReturnData[0]
        this.initChart() 
        
      }
    }).catch(error=>{
        console.error('返回TaskID信息 :',error); 
    }) 
    },
    mounted(){
      var height =this.$('.page').height(); 
      this.tween.to('.foot',.5,{top:height+300})   
    },

    methods: {
      velocityListener(data){
        this.velocity = data
      },
     Taskreturn(){
       this.$router.back()
     },
     dayin: function () {
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
        download(this.Task['TaskID'] + '.txt', JSON.stringify({
          username: this.username,
          phone: this.phone,
          TaskID: this.Task['TaskID'],
          TaskTypeName: this.Task['TaskTypeName'],
          StartPlaceDescription: this.Task['StartPlaceDescription'],
          EndPlaceDescription: this.Task['EndPlaceDescription']
        }))
        this.axios.post('/print', {'TaskID':TaskID})
     },
     Taskinit(data){
       this.Task = data
      //this.initChart()
     },
     Piedata(){
       let array= new Array()
       try{
         let MaterialID = this.Task.MaterialID.split(';')
         let MaterialNum = this.Task.MaterialNum.split(';') 
         MaterialID.forEach((item,idx)=>{
           array.push({MaterialID:item,count:MaterialNum[idx]})
         }) 
       }catch(e){  
       }
       return array
     },
     initChart(){
       let that = this
      this.$nextTick(() =>{
      this.Barchart = this.$echarts.init(this.$refs.MMaterialID),Option
         console.log(that.Piedata());
       
        Option = this.matBarConvert(this.Piedata())
        this.Barchart.setOption(this.matBarOption(Option));  
        window.addEventListener('resize', function() { 
             that.Barchart.resize(); 
       })
      })
     
     },
     matBarConvert(data){
     console.log('柱状图数据初始',data,dataRes)  
     var dataAxis =new Array()
     var dataRes = new Array()
     data.forEach(item=>{
       dataAxis.push(item.MaterialID)
       dataRes.push(item.count)
     })
  
     var result = {dataAxis:dataAxis,dataRes:dataRes} 
    return result
  },
   matBarOption(BarOption){ 
    var that = this ;
    var barOption = {
      title: {
     //  text: '物料',
      //   subtext: 'Feature Sample: Gradient Color, Shadow, Click Zoom'
      },
   grid:{
       top:"20px",
       left:"10px",
       right:"15px",
       bottom:"50px"
       },
    xAxis: {
        data: BarOption.dataAxis,
        type : 'category',                                                   //x坐标设置
        axisLabel: {  
         
          //rotate:30,
        },
        axisTick: {
            show: false
        },
        axisLine: {
            show: false
        },
        z: 10
    },
    yAxis: { 
        axisLine: {
            show: false
        },
        axisTick: {
            show: false
        },
        axisLabel: {
         inside: true,
         textStyle: {
             color: '#999'
         }
        }
    },
    dataZoom: [
        {
            type: 'inside'
        }
    ],
    series: [
         { // For shadow
             type: 'bar',
             itemStyle: {
                 color: 'rgba(0,0,0,0.05)'
             },
             barGap: '-100%',
             barCategoryGap: '40%',
            data:[100,100,100,100],
             animation: false
         },
         
        {
            type: 'bar',
            itemStyle: {
                 normal: {
				     	 label: {
				       	show: true, //开启显示
				     		position: 'top', //在上方显示
				     		textStyle: { //数值样式
				     			color: 'black',
				        	fontSize: 16
				     		}
				     	}
				     },
            color: that.$echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                    {offset: 0, color: '#83bff6'},
                    {offset: 0.5, color: '#188df0'},
                    {offset: 1, color: '#188df0'}
                ]
            )
            },
            emphasis: {
                itemStyle: {
                 color: that.$echarts.graphic.LinearGradient(
                     0, 0, 0, 1,
                     [
                         {offset: 0, color: '#2378f7'},
                         {offset: 0.7, color: '#2378f7'},
                         {offset: 1, color: '#83bff6'}
                     ]
                 )
                }
            },
            data: BarOption.dataRes
        }
    ]
}
   return barOption
  },

    },
  
   }
</script>
<style lang='less' scoped>
@import url('../../assets/less/tablefix.less');

.page{
  height:808px;
  width:100%;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
 -webkit-font-smoothing: antialiased;                         //字体参考https://www.w3school.com.cn/css/css_font-family.asp
  -moz-osx-font-smoothing: grayscale;
  font-weight: 500;
 
.paneltop{
 // display: flex;
 position: relative;
  .avgicon{
    .zhinengkeji{
       font-size: 10rem;
     }
     text-align: center;
     vertical-align: center;
    .icon{
      width:10rem;
      height: 10rem;
     }
    position: absolute;
    margin:0 auto;
    align-items: center;
    top:0.5rem;
    right:0.5rem;
    width:15rem;
    height: 15rem;
   }
}
  .section1{
    margin-bottom:10px;
  }
  .section2,.section3{
    width:100%; 
    margin-top:1rem;
    column-count:3;
    margin-bottom:5px;
    border-bottom: 1px solid #e3e3e3;
  }
  .section3 {
    padding-bottom: 10px;
  }
  .section4 {
    margin: 10px 0;
    span {
      margin-right: 5px;
    }
  }
  .content{
    margin:0 auto;
    border-radius: 1rem;
    height:450px;
    background-color: #329fe2; 
      }
  .section3{
     column-count:3; }
  ul>li{
    margin-bottom:10px;
  }
  .labelname{
    display: inline-block;
    width:7rem;
    span{
      font-size: 1rem;
    }
  }
  .value{
    display: inline-block; 
    width:auto;
  }
  .step{
    width:3rem;
    height:3rem;
    border-radius :3rem;
    border: 1px solid #000;
    text-align: center;
    line-height: 3rem;
  }
  .header{
    width:95%;
    margin-bottom:1rem; 
   .title{
      font-size: 25px; 
      font-weight:bold;  
    } 
   .Taskreturn{
     height:30px;
     line-height:30px; 
     
     //position:relative;
     div{  
     //   position: absolute;
        top: 5px;
       padding-top:10px; 
       display: inline-block;
      }
     cursor: pointer;
     float:right;
        }
  } 
  .chart{
    display: flex;
    width:95%;
    text-align: center;
    font-weight: bold;
    .rateText{
      width:10rem;
       .title{
        margin-top:5rem;
      }
      span{
        display: block; 
        text-align: center;
       }
    }
    .ChartContain{
      width:85%;
    }
  }
}
</style>