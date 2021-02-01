 
<script>
import    { Line }                        from 'vue-chartjs'    //Vue 对于 Chart.js 的封装https://shentuzhigang.blog.csdn.net/article/details/104563967
import 'chartjs-plugin-streaming';                              //https://nagix.github.io/chartjs-plugin-streaming/samples/line-horizontal.html
 
export default { 
  extends: Line,   
  props:["width","height","options"],
  computed:{
  
  },
  data () {
    return { 
      TaskStatus:'',//2待执行3正在执行4已完成5异常 
    }
  },
  components: {},
  computed: {}, 
  
  mounted () {
  let that = this
  //查询返回此TaskID信息
    let TaskID = this.$route.query.TaskID 
    this.TaskStatus = this.$route.query.TaskStatus 
 console.log('TaskStatus',this.TaskStatus);
 
  function onRefresh(chart) { 
    if(parseInt(that.TaskStatus)==3){
      that.$emit('velocity',AGVrate())
       	chart.config.data.datasets.forEach(function(dataset) {
	    	dataset.data.push({
		  	x: Date.now(),
		   	y: AGVrate()
		   });
  });
    }


  }
  function AGVrate() {
 	  return that.$store.state.map[that.$route.query.AGVID].length
}
  
   this.renderChart({ 
      datasets: [{ 
        data: [] 
        } 
        ]
     }, {
       title: {                //对标题的配置
        display: false,//是否显示
        text: '小车速率', //title内容
        position:"top",     //title位置
        fontSize:20,   //字体大小 默认为12px
        fontFamily:"'Helvetica Neue', 'Helvetica', 'Arial', sans-serif", //字体家族文本
        fontColor:'#666',
        fontStyle:'bold', //字体样式
       },
      responsive: false, // 长宽，100%.如果要单设长和宽的话，要将responsive 设为false
      maintainAspectRatio: false, // 保持长宽比
      legend:{
        display:false,
      },
       animation: {//设置不做动画 （可以提高性能）
        duration: 0// general animation time
      },
      scales: { 
        xAxes: [{ 
          type: 'realtime',
          realtime: {
					duration: 20000,
					refresh: 2000,
					delay: 2000,
					onRefresh: onRefresh
				}
        }] 
      } 
    }
    ); 
  },

  methods: {}
}

</script>
<style lang='less' scoped>
 canvas{
   width:95%!important;
   height: 280px!important;
 }
</style>