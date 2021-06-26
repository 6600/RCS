
<template> 
<div class="test"> 
   <panelborder :title="title" width="100%" height="100%" :chartype="type" :index="index"> 
    <div class="contain"> 
      <div class="order canvcon" v-if="type == 'OrderStyle'"> 
        <div class="pie" v-show="radio=='1'"> 
        <div @click="selectPie('Status')" style="width:30%;height:100%;">
          <div ref="OTaskStatus" style="width:100%;height:100%;"></div> 
        </div> 
        <div @click="selectPie('TaskName')" style="width:70%;height:100%;"> 
          <div ref="OTaskName" style="width:100%;height:100%;"></div> 
        </div> 
        <!-- <div ref='OOrderID' style="top:-1rem;"  :style="StaticPieStyle"></div>      --> 
        </div> 
      </div>

    </div> 
   </panelborder> 
  </div> 
</template>

<script> 
import    Panelborder                from  './Panelborder' 
import    Lradio                     from  './Lradio' 
import                                'echarts-liquidfill'
// import { log } from 'i:/www/swap/src/js/utils/humane'
import { mapMutations, mapState } from 'vuex'

export default {
  name:'PieChart2',
  props:['title','ID','index','Piedata','type','width'],
  components:{
    Panelborder,
    Lradio
  },
  data(){
    return{ 
      view:Boolean, 
      radio:'1',  
      radio2:'1',  
       chart:'',  
       bar:'',
       TasktableH:'auto',  
       BarChart:''
     //  Charge:{useTime:'12',useCount:'23'}
     }
  }, 
  computed:{ 
   ...mapState( { 
       StaticsData: state=> state.DataStatistics.StaticsData 
    }),
    Charge(){
      if(this.type=='AGVStyle'){
        var length = this.StaticsData.length
        console.log(this.StaticsData, length);
        if(this.StaticsData[length-1].charge.table.length>0){
          var charge ={...this.StaticsData[length-1].charge.table.find(val=>val.ID==this.ID)} 
          delete charge.ID
          console.log(charge['充电时长']);
       var hourminsec = charge['充电时长'].split(':')
           charge['充电时长'] = hourminsec[0]+'小时'+hourminsec[1]+'分'
           //+Math.floor(hourminsec[2])+'秒'
        return  charge     //获取充电信息 
        } else{
          return {'充电时长':0,'充电次数':0}
        }
      } 
    },
    RatechargeSty(){
      return "width:50%;height:100%;"
    },
    OrderPieStyle(){
      return "width:18rem;height:26rem;"
    },
    matterPieStyle(){
      return "margin:0 auto;width:100%;height:100%;"
    },
    Pierefs(idx){
     return function(idx){ 
       var that = this;
        var refs = {
                   AGVStyle:[ 
                            {text:"稼动率",ref:that.$refs.Pie},
                            {text:"仪表盘",ref:that.$refs.meterRate}
                            ],
                   OrderStyle:[
                            {text:"任务类别",ref:that.$refs.OTaskName},
                            {text:"任务状态",ref:that.$refs.OTaskStatus},
                            {text:"工单号",ref:that.$refs.OOrderID}
                              ]
                   } 
      console.log(this.type,idx,refs[this.type][idx]);
        return refs[this.type][idx]
     }
    },
    sectohour(val){                                      //秒转时分秒 (网上的源码)
      return function(value){             
        var theTime = parseInt(value);// 秒
        var middle= 0;// 分
        var hour= 0;// 小时
       if(theTime > 60) {
          middle= parseInt(theTime/60);
          theTime = parseInt(theTime%60);
       if(middle> 60) {
            hour= parseInt(middle/60);
            middle= parseInt(middle%60);
        }
    }
    var result = "";
    if(middle > 0) { 
      result = ""+parseInt(middle)+"分"+result;
    }
    if(hour> 0) {  
      result = ""+parseInt(hour)+"小时"+result;
    }
    return result;
   }
    },
    
  }, 
  watch:{
     Piedata(){
       this.init()
     }
  },
  mounted(){
    // echarts 无法获取属性“getAttribute” :https://www.cnblogs.com/eternityz/p/12272490.html 
     this.init() 
  }, 
  methods:{   
    ...mapMutations(['SetChartType']),
  getNameVal(data){                                      //{key:value}转{name:value}
  //  let finalArr = [];
    let obj = {} 
    //  data.forEach(pie => {              
        Object.keys(data).forEach(keyName => {
         if (keyName !== 'count') {
           obj.name  = data[keyName]
         } else {
           obj.value = data[keyName]
         }   
         }); 
   // }); 
      return  obj
 },
 //初始化pie列表，初次加载和每次调用查询时进行drawPieChart更新
  init(){
     let that = this
     let ConvData,Option
     this.$nextTick(() =>{
       
        if(this.type=='AGVStyle'){                                          //画四辆小车的稼动率饼图 
          ConvData = this.PieCovertOption(this.Piedata);                  //获取返回setOption的：formatter,serise
          Option = this.PieOption(this.Pierefs(0),ConvData)
          this.drawPieChart(this.Pierefs(0),this.Piedata,Option);         //画饼图  
          this.drawPieChart(this.Pierefs(1),this.Piedata,this.MeterOption(this.Piedata));         //画稼动率仪表盘
        }else{                                                    //画订单和物料的趋线图 
           this.Piedata.forEach((Piedata,idx)=>{   
           if((idx<=1&&this.type=='OrderStyle')){

             ConvData = this.PieCovertOption(Piedata);                  //获取返回setOption的：formatter,serise
             Option = this.PieOption(this.Pierefs(idx),ConvData)
             this.drawPieChart(this.Pierefs(idx),Piedata,Option); 

           }
       }) 
         } 
    });   
  },
  up2radio(val){
     this.radio2 = val 
      this.drawChart('趋势图',this.data.dayline)
  },
  PieCovertOption(data){         
  var resJson = {} 
   if(this.type=='AGVStyle'){  
     console.log(data);
      resJson.legend = ['正常时间','异常时间']
      resJson.series = [{name:'正常时间',value:data['正常时间']},{name:'异常时间',value:data['异常时间']}];
    
   }else{
     
       var series = new Array()                                     //字段名序列
       var pie =  data.forEach(Piedata=>{  
         series.push(this.getNameVal(Piedata))                    //通过key获取到的item如果为空 
       }) 
         resJson.series = series 
   } 
 
 //   this.legend= Object.keys(data),obj.serise = []                //设置传入legend ,serise,itemsty到obj对象
     resJson.itemStyle ={  opacity: 0.7,
              borderWidth: 3,
             borderColor: '#235894' }
   return resJson
  },
      //饼图ID_name:
  PieOption(Pieref,Option){
    var that = this
     var option = {
     title:{  
        text:this.type=='OrderStyle'?Pieref.text:'', 
        textstyle:{fontFamily :'sans-serif',fontSize :'20px' }  },   //标题字体样式
     
       itemStyle: this.type=='AGVStyle'?Option.itemStyle:'' ,
      tooltip: {
        trigger: 'item',
        formatter: function (params) { 
            var value = params.value  
            var name  = params.name
            if(that.type=="AGVStyle")return name+'</br>'+that.sectohour(value) 
               else return name+'</br>数量:'+value+''              
        }                                      //this.type=='avg'?'{b} : {c} 小时({d}%)':''               
                                                                //{a}：系列名。{b}：数据名。{c}：数据值。{d}：百分比。{@xxx}：数据中名为'xxx'的维度的值，如{@product}表示名为'product'` 的维度的值。{@[n]}：数据中维度n的值，如{@[3]}` 表示维度 3 的值，从 0 开始计数。
    },
                                                                 //['正常时间','异常时间']   
                                                                 //[{name:'正常时间',value:5},{name:'异常时间',value:11}] 
     calculable: true,
     series: [ {
         name: '稼动率',    
         type: 'pie',  
         data:Option.series,
          radius :this.type=="AGVStyle"?'60%':'60%',
          label: {                                                 //饼内百分比样式format:{c}
          normal: {
          //  position: 'inner',
           show : true,
           textStyle : {  fontWeight : 300 ,  fontSize : 14  },  //文字的字体大小
           formatter: '{d}%' 
           } },
           },  ]
  }
   return option
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
      //   text: '特性示例：渐变色 阴影 点击缩放',
      //   subtext: 'Feature Sample: Gradient Color, Shadow, Click Zoom'
      },
   grid:{
       top:"20px",
       left:"10px",
       right:"15px",
       bottom:"50px"
       },
    axisTick: {
        show: false,  //是否显示网状线 默认为true
        alignWithLabel: true
    },
    tooltip:{
        formatter: function(v){  
             let  value  =v.value; 
             return '数量：'+value;    //文字垂直显示
          },
    },
    xAxis: {
        data: BarOption.dataAxis,
        type : 'category',                                                   //x坐标设置

        axisLabel: {  
         formatter: function(v){  
             let  value  =v.value; 
             return value;    //文字垂直显示
          },
         textStyle: { //数值样式
			  		color: 'blue',
			    	fontSize: 12
			  	}
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
                 align: 'center',
                 verticalAlign: 'middle',
                 position: 'insideBottom',
                 distance: 100,
                formatter: function(v){ 
                 let  seriesName=v.name;
                 let  value  =v.value; 
                  return seriesName.split('').join('\n');    //文字垂直显示
                  },
				     		textStyle: { //数值样式
				     			color: 'blue',
				        	fontSize: 12
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

 
  drawPieChart(Pieref,pieData,Option) {
    if (!Pieref.ref) {
      console.error('dom不存在!')
      return
    }
     var that = this 
     try{
       var PieChart= this.$echarts.init(Pieref.ref);                //compute:Pierefs 获取返回this.refs
     }catch(error){ 
       console.log('图表初始化失败',error)
     }      

    // console.log(Option);
     PieChart.setOption(Option)    
      window.addEventListener('resize', function() { 
         PieChart.resize(); 
        })

  }, 
  MeterOption(data){                         //稼动率仪表盘Option  样式参考 https://blog.csdn.net/csm17805987903/article/details/85046355
  console.log('饼图数据',data);
  let rate = Math.floor(data['稼动率'])
   let option = {
        tooltip: {
            formatter: '{a} <br/>{b} : {c}%'
        },
      //toolbox: {
      //    feature: {
      //        restore: {},
      //        saveAsImage: {}
      //    }
      //},
        series: [
            {
                name: '业务指标',
                type: 'gauge',
                detail: {
                  fontSize: 14,
                       formatter: '{value}%',
                       offsetCenter: [0, '76%']           //稼动率50% 位置
                       }, 
                center: ["50%", "50%"],                   // 仪表位置
                radius: "60%",                            //仪表大小，
                axisLabel : {                            //文字样式（及“10”、“20”等文字样式）
                     color : "black",
                     distance :0                         //文字离表盘的距离
                 },
            title : {
              show : true,
              offsetCenter: [0, '110%'],                  // x, y，单位px
              textStyle: {                                 // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                  fontWeight: 'bolder'
                }
            },
            
           data: [
                {label: {
                   textStyle: { fontSize: 12  },
                   position:'insideBottom'
                 },
                  value: rate,                  //barchart https://blog.csdn.net/qq_34908167/article/details/78500921
                  
                 name: '稼动率'}],
                 textStyle : {  fontSize : 12  },  //文字的字体大小

            }
        ]
    };
    return option
  },
  chartssize(container, charts) {            //图表自适应宽高
      function getStyle(el, name)
      {
        if (window.getComputedStyle) {
          return window.getComputedStyle(el, null);
        } else {
          return el.currentStyle;
        }
      }
      let wi = getStyle(container, 'width').width;
      let hi = getStyle(container, 'height').height;
      charts.style.height = hi;
    },
  selectPie(val){ 
    this.SetChartType(val)  
  }
  }
}
</script>
  
<style lang='less' scoped>
.test {
  width: 100%;
  height: 100%;
}
  .contain{
    display: flex;
    flex-flow: column;  
    text-align: center;
    margin:0 auto;
    height: 100%;
    .top{ 
      margin-top:1rem;
      } 
  }
  .canvcon{
    height: 100%;
    align-items:center;
    display: flex;
   .Charge{
     position:absolute;
     top:2.8rem;
     right:1rem; 
     width:10rem;
     height:auto;
     font-size: 1rem;
     span{
       margin-left:1px;
       margin-top:1px;
       line-height: 1.5rem;
       text-align: center;  
       width: 4.8rem;   
       display: inline-block;
       }
     .header{
         span{ 
           height:  1.5rem; 
           background-color: 	#32CD32;
           color: #ffffff;
         } 
       }
     li{  
       span{ 
         font-size: 13px; 
         font-weight: normal;
       }
     }
   }  
  }
  .pie{
    margin:0 auto;
    height:90%;
    display: flex;
    justify-content: space-around;
    align-items:center;
    width: 100%;
    flex-wrap: wrap;     //超出换行 flex ,元素两边空格
  }
</style>