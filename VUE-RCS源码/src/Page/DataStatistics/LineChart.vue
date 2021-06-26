<template> 
<!--vue动态创建多个图表 https://www.cnblogs.com/owenzh/p/13213248.html -->
 
  <div class="contain" :style={opacity:show?1:0}>
    <Lradio @Radchange='EXdayOrmon'> </Lradio>  
       <!--   -->
    <div ref='BarChart'  v-if = "ChartType=='AGVStyle'"                            :style='lineStyle'></div>  
    <div ref='BarsChart' v-else-if = "ChartType=='TaskName'||ChartType=='Status'"  :style='lineStyle'></div>   
    <div ref='LineChart' v-else-if = "ChartType=='matterStyle'"                    :style='lineStyle'></div>    
    <!-- avg统计 饼图 趋势图---> 
   </div>    
 
</template>

<script> 
import    Lradio                     from  './Lradio'
import    {mapState,mapActions,mapMutations,mapGetters}                  from 'vuex'

import 'echarts-liquidfill'

export default {
  name:'Linechart',
  props:['title','data','type','width'],
  components:{
    Lradio
  },
  data(){
    return{    
      typename:['成品入库任务','原料配送任务','己完成','任务异常'],
      show:false
     }
  }, 
  computed:{ 
    ...mapState( {  
       StaticsData:  state=> state.DataStatistics.StaticsData,
       PieSelectIDX: state=> state.DataStatistics.PieSelectIDX,    
       dayOrmon:     state=> state.DataStatistics.dayOrmon,    
       ChartType:    state=> state.DataStatistics.ChartType
       
    }),
    ...mapGetters(['getDayMonLine']),
    lineStyle(){
      return "top:1.5rem;width:100%;height:25rem;marin-top:2rem;margin:0 auto";
      }, 
  },
  watch:{
    PieSelectIDX(newV,oldV){
      this.drawAllChart(0) 
    },
    ChartType(newV,oldV){
      this.drawAllChart(0) 
    },
    StaticsData(newV,oldV){
       this.init()  
       
    }
  },
 
  mounted(){
    // echarts 无法获取属性“getAttribute” :https://www.cnblogs.com/eternityz/p/12272490.html 
    if(this.StaticsData!=''){
      this.init()  
    }
  }, 
  methods:{   
  ...mapMutations(['setdayOrmon']), 
  init(){
    this.$nextTick(() =>{  
      if(this.StaticsData!=[]){
        this.drawAllChart(0,this.dayOrmon)         
     }
    // this.drawChart('趋势图',this.data);                                //画line趋势图   
    }); 
  },
  EXdayOrmon(val){                                                        //切换日月份
     this.setdayOrmon(val) 
     this.drawAllChart(this.PieSelectIDX)      
  }, 
  //画柱线图        根据点击选择的piex
  drawAllChart(idx,dayOrmon){ 
     var Barchart,Option  
     console.log('当前为'+this.ChartType+'类型'); 
     this.$nextTick(() => {
     try{  
       switch(this.ChartType){
         case 'AGVStyle':  
           Barchart = this.$echarts.init(this.$refs.BarChart);            //稼动率 
           break;
         case 'TaskName':                                                                 //任务类别  
           Barchart = this.$echarts.init(this.$refs.BarsChart);  
           break; 
         case  'Status':                                                                 //任务状态
           Barchart = this.$echarts.init(this.$refs.BarsChart);   
           break;
         case 'matterStyle': Barchart = this.$echarts.init(this.$refs.LineChart);       //物料
           break;
       }
         
     }catch(error){ 
       console.log('图表初始化失败 ',error)
     }      
     Barchart.clear();
     if(this.getDayMonLine!=''){                                 //当数据取值为空时
      this.show = true
      switch(this.ChartType){
        case 'AGVStyle':  
        Option = this.AGVBarConvert(this.getDayMonLine)
        Barchart.setOption(this.AGVBarOption(Option));  
          break;
        case 'TaskName':    
        console.log(this.getDayMonLine)
         Option = this.SeriesConvert('TaskTypeName',this.getDayMonLine) 
          Barchart.setOption(this.setStausBar(Option));   
          break;
         case 'Status':    
             Option = this.SeriesConvert('TaskStatusDescription',this.getDayMonLine) 
             Barchart.setOption(this.setStausBar(Option));  
  
          break;
      } 
    
     var zoomSize = 6;                                                     //点击放大缩小事件
     Barchart.on('click', function (params) {
         console.log(dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)]);
         Barchart.dispatchAction({
        type: 'dataZoom',
        startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
        endValue: dataAxis[Math.min(params.dataIndex + zoomSize / 2, this.getDayMonLine.length - 1)]
        });
      });
    window.onresize = function(){ 
       Barchart.resize();   
      }
    this.$emit('pageresponse') 
    }else{
      this.show = false
    }
   });
  },
  AGVBarConvert(data){
     console.log('柱状图数据初始',data,dataRes)
    var dataAxis = typeof(data.date.split(','))=="undefined"?[data.date]:data.date.split(',')
    var dataRes =  typeof(data.val.replace(/[\%]/g,'').split(','))=='undefined'?[data.val.replace(/[\%]/g,'')]:data.val.replace(/[\%]/g,'').split(',')
    var yMax = 100;
    var dataShadow = []; 
    for (var i = 0; i < dataRes.length; i++) {
        dataShadow.push(yMax);
    }
     var result = {dataAxis:dataAxis,dataRes:dataRes,dataShadow:dataShadow} 
    return result
  },
  AGVBarOption(BarOption){ 
    var that = this ;
    var barOption = {
      title: {
          text: '小车稼动率趋线图',
          //subtext: BarOption.rate
      },
    xAxis: {
        data: BarOption.dataAxis,
        type : 'category',                                                   //x坐标设置
        axisLabel: {  
         
          rotate:30,
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
            data: BarOption.dataShadow,
            animation: false
        },
        {
            type: 'bar',
            itemStyle: {
                 normal: {
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
  
  SeriesConvert(name,data){                                           
     console.log('订单数据初始化',this.PieSelectIDX,data)
     var series = new Array()               //返回柱状图序列
     var date = new Array()
     var legend = new Array(),xAxis
     data.forEach(item=>{  date.push(...item.date.split(','))  })     //获取去重xdate坐标
        xAxis = Array.from(new Set(date))          
     xAxis.sort(function(a,b){return b < a ? 1 : -1 })      //排序
     data.forEach(item=>{
      // {TaskTypeName: "原料配送任务", count: "1,1,1,2,2,5,3,3,6,2" ,date: "20-09-10,20-09-11,20-09-14,20-09-17,20-09-18,20-09-15,20-09-19}
      var counts = item.count.split(','),obj
        
      var fixdata = {}
        item.date.split(',').forEach((date,idx)=>{            
           fixdata[date]=counts[idx]
        })
      var ordered = {};
      Object.keys(fixdata).sort().forEach(function(key) {            //根据key日期排序
       ordered[key] = fixdata[key];
       });
       console.log(ordered);
       var values = new Array()
       xAxis.forEach(date=>{                                         //y数据缺失填充0
         ordered[date]==undefined?values.push('0'):values.push(ordered[date]) 
       })
       if(typeof(item.TaskTypeName)!='undefined')
        legend.push(item.TaskTypeName)
       else
        legend.push(item.TaskStatusDescription) 
        obj = {name:item[name],data:values}
        series.push(obj) 
     })  
     console.log('日期',xAxis,'y数据',series) 
     var result = {xAxis:xAxis,series:series,legend:legend} 
    return result
  },
                                                                       //订单统计柱状图
  setStausBar(BarOption){                             
     
    var that = this ;
    var posList = [
    'left', 'right', 'top', 'bottom',
    'inside',
    'insideTop', 'insideLeft', 'insideRight', 'insideBottom',
    'insideTopLeft', 'insideTopRight', 'insideBottomLeft', 'insideBottomRight'
];
  var app = {};
  app.configParameters = {
    rotate: {
        min: -90,
        max: 90
    },
    align: {
        options: {
            left: 'left',
            center: 'center',
            right: 'right'
        }
    },
    verticalAlign: {
        options: {
            top: 'top',
            middle: 'middle',
            bottom: 'bottom'
        }
    },
    position: {
        options: this.$echarts.util.reduce(posList, function (map, pos) {
            map[pos] = pos;
            return map;
        }, {})
    },
    distance: {
        min: 0,
        max: 100
    }
};

app.config = {
    rotate: 90,
    align: 'center',
    verticalAlign: 'middle',
    position: 'insideBottom',
    distance: 40,
    onChange: function () {
     var labelOption = {
        normal: {
            rotate: app.config.rotate,
            align: app.config.align,
            verticalAlign: app.config.verticalAlign,
            position: app.config.position,
            distance: app.config.distance
        }
     }; 
    }
}; 
   
   BarOption.series.forEach(item=>{
       item.type='bar'
       item.barGap= 0
    })

var option = {
    color: [ '#228B22','#006699','#003366', '#4cabce', '#e5323e'],
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    legend: {
        data: BarOption.legend
    },
    toolbox: {
        show: true,
        orient: 'vertical',
        left: 'right',
        top: 'center',
        feature: {
          mark: {show: true},
          dataView: {show: true, readOnly: false},
          magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
          restore: {show: true},
          saveAsImage: {show: true}
        }
    },
    xAxis: [
        {
          type: 'category',
          axisTick: {show: false},
          data: BarOption.xAxis
        }
    ],
    yAxis: [
        {
          type: 'value'
        }
    ],
    dataZoom: [
        {
          type: 'inside'
        }
    ],
    series:  BarOption.series
};
return option
  // Barchart.setOption(option)
  },
  matLineConvert(data){
    console.log('物料数据初始化',this.PieSelectIDX,data)
  var LineOption           =    {}
      LineOption.serise    =    [] 
      LineOption.formatter =   this.type=='avg'?'{b} : {c} 小时({d}%)':''
      LineOption.date      =   data.date.split(',')                        //日期
      LineOption.series    =   data.series.split(',')                       //序列
      
      data.forEach((item)=>{
        LineOption.serise.push(
          {name:item.name,type:'line', stack: '总量',data:item.series})
        })
 
   return obj
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
    }
  }
}
</script>
  
<style lang='less' scoped>
  .contain{
    display: flex;
    flex-flow: column; 
    text-align: center;
   // margin:0 auto;
    height: 100%;
    width:100%; 

    .top{ 
      margin-top:1rem;
      } 
  }
  
  .canvcon{
    width:800px;
    height: 100%;
    align-items:center;
    display: flex;  
  }
  .pie{
    height:100%; 
    display: flex;
    justify-content: space-around;
    align-items:center;
    flex-wrap: wrap;                                                              //超出换行 flex ,元素两边空格
  }
   
</style>