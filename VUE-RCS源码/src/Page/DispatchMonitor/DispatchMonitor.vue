<template>
  <div class="page">
 
     <div class="top" v-show="flooridx>-1"> 
       <div class='WarningStatus' ><div :class="WarnClass(flooridx,index)"v-for="(val,index) in alertinfo[flooridx]">{{val}}</div> </div></div>
     <div class="main">
          <!--地图显示插件-->
        <div class="Monitor" v-if ="parseInt(flooridx)!=-1">   
             <Monitoringmap class="map"  
             :map='floormap[flooridx]' 
             :MapIdx='flooridx' 
             type='Monitor'
             width='100%'
             height="100%"
             v-on:warninfo='updatewarninfo'
             >
             </Monitoringmap>   
         </div>  
    <!-- 缩略地图 -->
         <ul class="thumbContain" v-else>
           <li v-for="(item,idx) in floormap">
            <div  class="WarningStatus" ><div :class="WarnClass(idx,index)"v-for="(val,index) in alertinfo[idx]">{{val}}</div>  </div>
            <Monitoringmap   class="map"  v-on:warninfo='updatewarninfo'
            :map='item' 
            :MapIdx='idx' 
            type="thumb"
            width='100%'
            height="100%"
            >
            </Monitoringmap>   
           </li>
         </ul> 
        
        <div class="info"> 
          <!-- 调度控制台 -->
        <!-- <ControlBoard></ControlBoard>                                 -->
       </div>
     </div> 
  </div> 
</template>

<script>
import      TaskControl                                                 from './TaskControl' 
import      ControlBoard                                                from './ControlBoard' 
import      Monitoringmap                                               from './Monitoringmap' 
 import      {mapState,mapActions,mapMutations}                          from 'vuex'
//  import { log } from 'i:/www/swap/src/js/utils/humane'
 
 export default { 
   components:{
     TaskControl,
     Monitoringmap,
     ControlBoard
   },
   data(){
     return{   
        alertinfo:[[],[],[],[]], 
        ani:'',
        ani2:''
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
     }), 
     warninfo(){
       if(this.flooridx>-1){
          return this.alertinfo[this.flooridx] 
       }
     }
   },  
   mounted(){  
     var height =this.$('.page').height();  
        this.tween.to('.foot',.5,{top:height+200})  
   },
   methods:{
     ...mapMutations(['remove','InitFloormap']),
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

</style>