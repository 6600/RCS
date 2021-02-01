<template>
  <div class="page">
    <div class="pannel">
      <span class='title'>avg状态</span>   <p class='border'></p>
      <swiper :options="swiperOption" class ='mswipper' id='swiper1'> <swiper-slide class="swiper-slide"  v-for='(item,key,idx) in Avgtask' :key="idx">
         <Panel :title='item.name'  :state='item.state' :id='item.ID' :ip='item.ip' width="22rem">
         <div  @mouseover="slideIn('swiper1',idx,'avginfo')" @mouseleave="slideOut('swiper1',idx,'avginfo')">  
          <div class="task">
             <ul> <li :style="{color:'#000'}" v-for="(val,index) in taskInfo[item.ID]" :key="index">{{timeformat(val.StartTime)}}
               <span>{{val.TaskTypeName}}</span>从<span>{{val.StartPlaceDescription}}</span>发往<span>{{val.EndPlaceDescription}}</span>,任务
               <span>{{val.TaskStatusDescription}}</span> </li>
             </ul>
          </div>
         <div class="info avginfo" >
           <div class="item"> <span>车体状态</span> <span>{{item.CurrentPosDescription}}</span> </div>
           <div class="item"> <span>电量</span> <span>{{item.PowerPercent}}</span> </div>
           <div class="item"> <span>异常</span> <span>{{item.WarningStatus}}</span> </div>  
           <div class="item"> <span>用时</span> <span>{{item.UsedTime}}</span> </div> 
        </div> 
        </div>
           </Panel>    </swiper-slide> <div class="swiper-scrollbar" slot="scrollbar"></div>
      </swiper>  
    </div> 
     <div class="pannel"> 
           <span class='title'>电梯/升降/自动门/充电桩状态</span>  <p class='border'></p>

      <swiper :options="swiperOption" class ='mswipper' id='swiper2'>  <swiper-slide class="swiper-slide"  v-for='(item,key,idx) in Markarr1' :key="idx" >
        <!-- panel显示每个设备信息的单元组件 -->
         <Panel :title='item.Type' :id='item.ID' :ip="item.ip" :state='item.state' width='13rem' height='17rem' > 
             <!-- 图标根据item下的name值从.static/img/map/item.name路径下获取 -->
          <div  @mouseover="slideIn('swiper2',key,'coninfo')" @mouseleave="slideOut('swiper2',key,'coninfo')"> 
            <svg class="mysvg" aria-hidden="true"> <use :xlink:href='Icon(item.Type)'></use> </svg>     
            <div class="info coninfo">
            <div class="item" > <span>连接状态</span> <span>{{item.state?'成功':'失败'}}</span> </div>
                <div class="item" v-show="item.Type=='UpdatePileStatus'"> <span>充电状态</span> <span>{{item.ChargeStatus}}</span> </div>
                <div class="item" v-show="item.Type=='UpdatePileStatus'"> <span>运动状态</span> <span>{{item.MovingStatus}}</span> </div>
                <div class="item" v-show="item.Type=='UpdatePileStatus'"> <span>电压</span> <span>{{item.ChargeVoltage}}</span> </div>
                <div class="item" v-show="item.Type=='UpdatePileStatus'"> <span>电流</span> <span>{{item.ChargeCur}}</span> </div>
                 <!-- <div class="item" v-show="item.Type=='station'"> <span>报警</span> <span>{{item.alarm}}</span> </div> -->
                <div class="item" v-show="item.Type=='UpdateLiftStatus'"> <span>顶部底部</span> <span>{{item.Pos}}</span> </div> 
                <div class="item" v-show="item.Type=='UpdateLiftStatus'"> <span>是否有料</span> <span>{{item.HaveMaterial?'是':'否'}}</span> </div> 
                <div class="item" v-show="item.Type=='UpdateEleStatus'"> <span>使用中</span> <span>{{item.InUse?'是':'否'}}</span> </div> 
                <div class="item" v-show="item.Type=='UpdateEleStatus'"> <span>当前楼层</span> <span>{{item.Floor}}</span> </div>
                <div class="item" v-show="item.Type=='UpdateEleStatus'"> <span>是否打开</span> <span>{{item.DoorOpen?'是':'否'}}</span> </div>
            </div> </div> 
           </Panel>   
          </swiper-slide>
       <div class="swiper-scrollbar" slot="scrollbar"></div>  </swiper>     

        <swiper :options="swiperOption" class ='mswipper' id='swiper3'>  <swiper-slide class="swiper-slide"  v-for='(item,key,idx) in Autodoor' :key="idx" >
        <!-- panel显示每个设备信息的单元组件 -->
         <Panel :title='item.Type' :id='item.ID' :ip="item.ip" :state='item.state' width='13rem' height='17rem' > 
             <!-- 图标根据item下的name值从.static/img/map/item.name路径下获取 -->
            <div  @mouseover="slideIn('swiper3',key,'coninfo')" 
                  @mouseleave="slideOut('swiper3',key,'coninfo')"> 
              <svg class="mysvg" aria-hidden="true">
                 <use :xlink:href='Icon(item.Type)'></use> 
              </svg>     
           <div class="info coninfo">
           <div class="item" > <span>连接状态</span> <span>{{item.state?'成功':'失败'}}</span> </div>
               <div class="item" v-show="item.Type=='UpdateAutoDoorStatus'"> <span>开门状态</span> <span>{{item.DoorOpen?'是':'否'}}</span> </div> 
           </div> </div> 
           </Panel>    </swiper-slide>
            <div class="swiper-scrollbar" slot="scrollbar"></div>  </swiper>    
         <swiper :options="swiperOption" class ='mswipper' id='swiper4'>  <swiper-slide class="swiper-slide"  v-for='(item,key,idx) in Alarm_place' :key="idx" >
        <!-- panel显示每个设备信息的单元组件 -->
         <Panel :title='item.Type' :id='item.ID' :ip="item.ip" :state='item.state' width='13rem' height='17rem' > 
             <!-- 图标根据item下的name值从.static/img/map/item.name路径下获取 -->
            <div  @mouseover="slideIn('swiper4',key,'coninfo')" @mouseleave="slideOut('swiper4',key,'coninfo')"> 
              <svg class="mysvg" aria-hidden="true"> <use :xlink:href='Icon(item.Type)'></use> </svg>     
           <div class="info coninfo">
           <div class="item" > <span>连接状态</span> <span>{{item.state?'成功':'失败'}}</span> </div>
               <div class="item" v-show="item.Type=='UpdateAlarmModuleStatus'"> <span>是否报警</span> <span>{{item.Alarm?'是':'否'}}</span> </div> 
               <div class="item" v-show="item.Type=='UpdateAlarmModuleStatus'"> <span>内容</span> <span>{{item.Content}}</span> </div> 
               <div class="item" v-show="item.Type=='UpdatePlaceStatus'"> <span>名称</span> <span>{{item.Name}}</span> </div> 
               <div class="item" v-show="item.Type=='UpdatePlaceStatus'"> <span>库位种类</span> <span>{{item.Species}}</span> </div> 
               <div class="item" v-show="item.Type=='UpdatePlaceStatus'"> <span>有无料车</span> <span>{{item.HaveCar?'是':'否'}}</span> </div> 
               <div class="item" v-show="item.Type=='UpdatePlaceStatus'"> <span>是否被锁定</span> <span>{{item.Lock?'是':'否'}}</span> </div> 
           </div> </div> 
           </Panel>    </swiper-slide>
            <div class="swiper-scrollbar" slot="scrollbar"></div>  </swiper>    
    </div>
  </div>
</template>

<script>
import         Panel                                                    from './Panel.vue'   
import          $                                                       from 'webpack-zepto'
import        {mapState,mapActions,mapMutations}                        from 'vuex'
// import        { log } from 'i:/www/swap/src/js/utils/humane'

export default { 
 components:{ Panel },
 computed:{
    ...mapState( { 
       Avgtask: state     =>    state.map.Avgtask,  
       taskInfo:state     =>    state.TaskList.taskInfo,       //任务日志不超过5条，可更新最新
       Markarr1:state    =>    state.marker.Markarr1,
       Autodoor:state    =>    state.marker.Autodoor, 
       Alarm_place:state =>    state.marker.Alarm_place 
    }),
   Icon(name){ return function(name){           //图标转换
     var rename = name.replace('Update','');
         rename = rename.replace('Status','')
     return this.icons[rename] 
     }                
   },
   timeformat(val){                             //任务时间格式化为   10:00 格式
     return function(val){  
      // console.log(val);
       try{
       if(typeof(val)!='undefined'){
          var arr = val.split(' ');
       var time = arr[arr.length-1].split(':'),time = time[0]+':'+time[1]
        return time  
       }
      }catch(e){
       console.log('timeformat',e);

      }
        } },
   timeColor(val){},
  
 },
 data(){
   return{
     swiperOption:{ 
     scrollbar: {  el: '.swiper-scrollbar' ,hide:true},   slidesPerView: 5,  spaceBetween: 25, freeMode: false },        
      keylabel:{Type:'类型',
      ID:'车号',
      PowerPercent:'电量',
      Type:'类型',
      JackingStatus:'车体状态',
      AbnormalStatus:'异常',
      AbnormalDetail:'异常描述',
      CurrentPos:'当前位置' ,
      CurrentOperate:'当前操作'
      },
      Otherarrs: [
       {  
           name:'elevator',
           state:true,
           connect:true,
           floor:'空'
        },
        {
           name:'lifegate',
           state:false,
           connect:true
        },{
           name:'gate',
           state:true,
           connect:true
          }, 
          {
           name:'station',
           state:false,
           connect:true
          },
          {
           name:'charge',
           state:true,
           connect:true
          }], 
      icons:{
            Ele:'#icon-dianti',
            Edge:'#icon-zhandian',
            Pile:'#icon-u1464',
            Lift:'#icon-shengjiangji',
            AutoDoor:'#icon-men',
            Place:'#icon-tingcheku'
          },  //key图标样式转换
     
   }
 },
  
 mounted(){ 
    var height =$('.page').height(); 
     this.tween.to('.foot',.5,{top:height+200})  
 },
 created(){
   console.log("车体状态",this.taskInfo["C1"][0]);
   console.log("电量",this.taskInfo['C1'].PowerPercent);
    if(this.$route.query.path=='mint'){
      this.swiperOption= {  scrollbar: {  el: '.swiper-scrollbar' ,hide:true},  freeMode: false }
    }else{
     this.swiperOption= {  scrollbar:{  el: '.swiper-scrollbar' ,hide:true},   slidesPerView: 5,  spaceBetween: 25, freeMode: false }
    }
 },
 methods:{
    ...mapMutations(['setConnectStatus','setAvgandTask']),         //,'setAvg','setEle','setLift','setPile','setAutoDoor','setPlace','setPlace'
   //滑动动画效果 
  
   slideIn(id,idx,ele){  
      this.tween.to($('#'+id+' .'+ele)[idx],0.5,{top:ele=="avginfo"?'12rem':'5rem'})  
      },
   slideOut(id,idx,ele){  
     this.tween.to($('#'+id+' .'+ele)[idx],0.5,{top:ele=="avginfo"?'15.5rem':'12.8rem'}) 
     }, 
 }
}
</script>
<style lang='less' scoped>
  .page{ 
   width:92%!important; 
   height:100%;   
    .title{  
      display: block;
      margin:20px;
      background-color: #fff;  
      font-weight: bold;  
      color:rgb(39, 15, 15);  
    }       //字体颜色 
     
    .pannel{ 
      padding-top:5px;  
      height:29rem;  
      border-radius: 5px; 
      margin-bottom:1.5rem;        //连接边框的样式
      p{
        border-bottom: 1px solid lightgray;
        width:97%;
        margin:0 auto;
        }                       //标题下划线样式 
       box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(43, 42, 42, 0.04);           //背景阴影
     .mysvg{
       display: block;
       height:14rem;
       width:14rem;
       margin:0.6rem auto;
       }                     //svg大小居中设置  默认宽度为 17rem;
     span{  
       font-family:"Microsoft YaHei"; 
       -moz-osx-font-smoothing: grayscale;    
       font-size: 1rem;  }  //"MicrosoftJhengHei",华文细黑,STHeiti,MingLiu 
 
     .mswipper{ 
       width:95%;
       height:23rem; 
       margin:30px auto;
       list-style:none;
       display:flex;  
       position:static!important;          
      .swiper-slide{
         width:auto!important
         } 
       }
     .task{                              //
       width: auto; 
       height: 15rem;
       margin:2px auto; 
       border: 1px solid lightgray;
       background-color: #afe8ff;
       ul>li{ 
         margin-bottom:10px;  
       span{
         font-weight: bold;}
        } 
     }
     .info{
       padding: 14px; 
       width:92%;
       position:absolute;
       background-color: rgba(255, 255, 255, 0.8);
       height: 25rem;
     .item{ 
       display:flex;
       justify-content:space-between;
       margin-top:3px; }
     }
     .swiper-scrollbar{
       height:10px;}
     img{ 
       align-content: center;  } 
    }
    //第二个panel的样式
    .pannel:last-child{
      height:auto;
       .mysvg{     
         display: block; 
         height:11rem; 
         width:11rem;
         margin:0.6rem auto;  }   //svg大小居中设置  默认宽度为 17rem;   
     span{	   
       font-size: 1rem;    }                          //字体样式
 
     .info{
        padding: 14px; 
        width:91%;
        position:absolute;
        background-color: rgba(255, 255, 255, 0.8);
        height: 18rem;
        top: 12.8rem; }
    }
  }
</style>