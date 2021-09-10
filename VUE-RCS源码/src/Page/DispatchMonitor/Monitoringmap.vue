<template>
    <div class="map" :style="{width:width,height:height}" >
      </div> 
</template>

<script>
//Vue2Leaflet   https://www.jianshu.com/p/9de3a7079d49
import    LeafMap                                                       from '../../assets/js/avgroute'
import    config                                                        from '../../assets/config/config'

import      {mapState,mapActions,mapMutations,mapGetters}               from 'vuex'
import {point, circle, segment }                                        from '@flatten-js/core';        
import Flatten                                                          from '@flatten-js/core'
 
export default {
  name: 'Monitoringmap',
  components: {},
  props:{map:Object,MapIdx:Number,type:String,width:String,height:String},
  data () {
    return { 
      Lmap:null,
      Avgs:[],
      leafmap:'',
      bgimg:'',
      marks:[],
      path:[],
      marklayer :'', 
      pathlayer :'',
      pathicons:[],
      place:[],
      
      placelayer :'',
      placeicons:[],
      LTask:'',
      mapIdx:this.MapIdx,
      Map:this.map,
      AVGonpath:'',
      pathidx:0,
    } },
  computed:{
   ...mapState( {   
     flooridx: state  => state.map.flooridx,                  //此处注意需要区分模块(cart)，不能少 .cart.
     floormap: state  => state.map.floormap,  
     AGVArr:   state  => state.map.AGVArr,   
     Agvstaus: state  => state.map.Agvstaus,                   //即时更新的小车状态 
     EdgeStatus:state => state.map.EdgeStatus,                   //即时更新的边信息
     AGVstatus: state => state.map.AGVstatus,                   //即时更新的边信息

     Updatetask:state => state.map.Updatetask,                 //即时更新的小车任务状态
     mapRang:state    => state.map.mapRang,   
   }), 
   ...mapGetters(['EdgeStatus_get','PlaceStatus_get']),

   returnTask(task,agv){
     let that  = this
     return function(task,agv){
       console.log(task)
       var str = `<div class="status-${task.MovingStatus || 0}" style="width: 180px; font-size:14px;font-weight:bold;" id="popup">
          <div class="xiaoche-id"><span>小车33333ID:</span><span>`+ (task.AGVID) +`</span></div>
          <div><span>任务:</span><span>`+ (task.TaskTypeName || '') +`</span></div>
          <div><span>耗时:</span><span>`+ (task.UsedTime || '')+`</span></div>
          <div><span>状态:</span><span>`+ (task.CurrentOperateDescription || '') + `</span></div>
          <div><span>异常:</span><span>`+ (task.WarningStatus || '') +`</span></div>
          <div><span>电量:</span><span>`+ ((task.PowerPercent) || '') +`</span></div>
        </div>` 
      if(task.WarningStatus!=''){ 
         that.$emit('warninfo',{info:`${task.WarningStatus}， 小车${task.AGVID}`,idx:this.mapIdx}) 
          agv.warn = task.WarningStatus

      }else{
        agv.warn = task.WarningStatus
      }
        return str
     }
   }
  
  },     
  watch:{                                                                   //（1）immediate和handler  这样使用watch时有一个特点，就是当值第一次绑定时，不会执行监听函数，只有值发生改变时才会执行。如果我们需要在最初绑定值的时候也执行函数，则就需要用到immediate属性。
  //  Agvstaus(newV,oldV){   this.UpdateAGV(newV) },  
  //  C1(newV,oldV){    this.UpdateAGV(newV)  },    
  //  C2(newV,oldV){    this.UpdateAGV(newV)  },  
  //  C3(newV,oldV){    this.UpdateAGV(newV)  },  
  //  C4(newV,oldV){    this.UpdateAGV(newV)  },  
    AGVstatus(newV,oldV){
      let data = JSON.parse(newV)      
      data.forEach(item=>{
         this.UpdateAGV(item) 
      })
    },
    Updatetask(newV,oldV){
      let data = JSON.parse(newV)
      console.log('sdsd')
      data.forEach(item=>{
         this.UpdateTask(item)
      })
    },
    EdgeStatus_get(val){                           //vuex state中的数组变化监听方法https://blog.csdn.net/qq997843911/article/details/85055993 
        this.Updatepath(val)  
    },
    PlaceStatus_get(val){                           //vuex state中的数组变化监听方法https://blog.csdn.net/qq997843911/article/details/85055993 
        this.Updateplace(val)  
    },
    flooridx(newV,oldV){  
     // if(parseInt(this.Montype)!=-1){ 
       this.bgimg.remove();  
      this.mapIdx = newV
      this.Map    = this.floormap[newV] 
      if(this.marklayer!=''){
        this.marklayer.clearLayers()   
      } 
      if(this.pathlayer!=''){
       // console.log('pathlayer',this.pathlayer)                                              //https://leafletjs.com/reference-1.6.0.html#layergroup 
        this.pathlayer.clearLayers()          
      }
     if(this.placelayer!=''){
       // console.log('pathlayer',this.pathlayer)                                              //https://leafletjs.com/reference-1.6.0.html#layergroup 
        this.placelayer.clearLayers()          
      }
       this.InitMap() 
    //  } 
     },                                                                  //对象某个属性监听变化参考 ：https://blog.csdn.net/weixin_42667944/article/details/82626840  //数据监听不了
   },
   
   mounted() { 

    var obj = {
        minZoom: 10,
        maxZoom: 15,
        center: [0, 0], 
        zoomControl:this.type=='Monitor'?true:false,
        dragging:   this.type=='Monitor'?true:false,
        crs:   L.CRS.Simple,
        scrollWheelZoom:this.type=='Monitor'?true:false,
        attributionControl: false, 
        transparent:true
      }
     this.type=="Monitor"?obj.zoom=13.3:obj.zoomSnap=12.6
     var zoom =  12.39
     this.type=="Monitor"?zoom=13.3:zoom=12.6
     this.Lmap = L.map(this.$el,obj).setView([51.495, -0.075],zoom);  
     this.Lmap.stop()
     this.InitMap() 

     //单张自定义图标在缩放时调整大小https://www.it1352.com/1019936.html
      this.Lmap.on("zoom", e => { var rate = this.Lmap.getZoomScale(this.Lmap.getZoom(), 14) 
      this.leafmap.markicons.forEach((mark,idx)=>{
         var options =this.leafmap.markicons[idx].getIcon().options; 
        
        //if(typeof(options.iconUrl)!= 'undefined'){ 
        //   options.iconSize=[rate*45,rate*45] 
        //  this.leafmap.markicons[idx].setIcon(L.icon(options))
        //} 
          })         
       })
     },    
     methods:{
       ...mapMutations(['setAvgtask','setAvg','setfloormark','setPathOccupy','setPile','setAutoDoor','setPlaceLocked']),  
     infloor(Agv,type){                                           //小车4个不同地图坐标变换
       var index = 0 
       let x = parseInt(Agv.X)
       let y = parseInt(Agv.Y)
      this.mapRang.forEach((item,idx)=>{ 
         if(x>item.x1&&x<item.x2&&y>item.y1&&y<item.y2){
           index = idx
         } 
      })
      if(index==this.mapIdx){
      if(type=='update'){
           Agv.X =x - this.mapRang[index].x
           Agv.Y =y - this.mapRang[index].y
          }   
          return index
        }else{
          return -1
        } 
       },
     Initpath(){                                           //路径渲染，自己的渲染(可废除)
        var diff = parseInt(this.Agvstaus.Th) - parseInt(this.AVGonpath.Th)                    //判断方向 
        if(Math.abs(diff)<=5){
          this.path.forEach((item,index)=>{
            if(index<this.pathidx)
            this.path[index].Occupy = true
            else
            this.path[index].Occupy = false 
          })
        }else if(Math.abs(diff)>170){
           this.path.forEach((item,index)=>{
            if(index>this.pathidx)
            this.path[index].Occupy = true
            else
            this.path[index].Occupy = false 
          })
        }
       },
  
     Updatepath(data){                                    //根据老王传过来的值渲染         
        console.log('更新路径状态',this.leafmap.pathicons.length,this.leafmap.pathicons)  
       data.forEach(item=>{
        this.leafmap.pathicons.map((path,index)=>{ 
          if(path.ID==item.ID){
            try{            
              this.leafmap.UpdatePath(item.Occupy,path) 
             }catch(err){ console.log(err) }  
            } 
         })
                                            
       })
     },
     Updateplace(data){                                    //根据老王传过来的值渲染
      console.log('准备更新车库', data)      
       data.forEach(item=>{
        this.leafmap.placeicons.map((place,index)=>{ 
          if(place.ID==item.Name){       
            //  console.log('更新车库',item,place)  
            this.leafmap.UpdatePlace(item.Locked, place, this.type)  
          } 
         })                                  
       })
     },
     InitMap(){
       this.pathicons   = [] 
       this.path   = this.Map.path
       this.place  = this.Map.place
       this.mark   = this.Map.mark;
       
       this.leafmap = new LeafMap(this.Lmap) 
        let devOrpub = {   dev:'../../../',   pub:'./'  }
        let layer =  this.Map==undefined?{w:5000,h:3500,url:' '}:this.Map    //加载背景图版
        let url = devOrpub[config.env]+layer.url                                 //适配开发和部署的图片路径
          
          console.log('layer图片路径',url)
          this.bgimg  = this.leafmap.loadlayer(layer,url)     //背景图片  
  
        try{
         var obj = this.leafmap.loadPaths(this.path,this.Map)      //路径图层,每次flooridx时clearlayer 
            this.pathlayer = obj.pathlayer
            this.pathicons = obj.pathicons
         let placeo = this.leafmap.loadPlace(this.place,this.Map,this.type)      //车库图层,每次flooridx时clearlayer 
            this.placelayer = placeo.placelayer
            this.placeicons = placeo.placeicons
             this.leafmap.scrollWheelZoom = false           
               console.log('pathlayer',obj.pathlayer); 
          
          if(this.AGVstatus!=''){
            let lastAGVstatus = JSON.parse(this.AGVstatus)
              lastAGVstatus.forEach((AGV)=>{          // 每次选择不同地图加载小车上次坐标 
            if(this.infloor(AGV,'update')>=0){
              console.log('初始化AGV信息',AGV);
               let obj=this.leafmap.loadMarker(parseInt(AGV.X),parseInt(AGV.Y),"AGV",AGV.ID) 
              this.marklayer=obj.marklayer
              this.markicons=obj.markicons 
               } 
            })
          }
       
        }catch(err){
          console.log(err)
        }

      },
      UpdateAGV(data) {
        console.log('渲染AGVstatus:');
        console.log(data)
        let markerUpdate = false
        this.leafmap.markicons.forEach((AGV, idx) => {
          if (AGV.ID == data.ID) {
            if (this.infloor(data, 'update') >= 0) { //遍历此地图的小车，判断小车坐标是否在此地图内
              let pointXY = L.point(parseInt(data.X), parseInt(data.Y)); ///将像素坐标转成lanlng坐标
              let pointlatlng = this.Lmap.unproject(pointXY, this.Lmap.getMaxZoom() - 1);
              AGV.setLatLng(pointlatlng);
              AGV.setRotationAngle(-parseInt(data.Th))
              //https://github.com/bbecquet/Leaflet.RotatedMarker
              let pop = AGV.getPopup()
              pop.setLatLng(pointlatlng)
              pop._container.setAttribute("status", data['MovingStatus'] || 0)
              if (data.special) {
                console.log(pop._container)
                pop._container.classList.add('special')
                pop._container.classList.remove('no-special')
                setTimeout(() => {
                  pop._container.style.left = data.specialValue[0] + 'px'
                  pop._container.style.bottom = data.specialValue[1] + 'px'
                }, 500);
              } else {
                setTimeout(() => {
                  pop._container.style.bottom = '100%'
                }, 0);
                pop._container.classList.remove('special')
                pop._container.classList.add('no-special')
              }
              AGV._icon.setAttribute("status", data['MovingStatus'] || 0)
              AGV.bindPopup(pop).openPopup()
            } else {
              this.leafmap.markicons.forEach((AGV, idx) => {
                if (AGV.ID == data.ID) {
                  this.leafmap.markicons.splice(idx, 1)
                }
              })
              // console.log(this.mapIdx,'楼的',AGV.ID,'小车','跑到其他楼层');                 //如果跑到其他楼层时，删除此楼层的小车图标
              AGV.remove()
            }
            markerUpdate = true
          }
        })
        if (!markerUpdate && this.infloor(data, 'update') >= 0) { //地图上不存在
          let obj = this.leafmap.loadMarker(parseInt(data.X), parseInt(data.Y), 'AGV', data.ID, data.special)
          //  console.log(data.ID,'小车跑到',this.mapIdx);
          this.marklayer = obj.marklayer
        }
        this.Lmap.stop() //停止地图跟随marker移动 
      },

     UpdateTask(data){                                                                //更新任务状态 信息
        this.leafmap.markicons.forEach((agv,idx)=>{
         console.log('渲染pop',agv);
           if(agv.ID==data.AGVID){    
            console.log('更新小车任务   ');  
            let pop = agv.getPopup()
            pop.setContent(this.returnTask(data,agv)) 
            agv.bindPopup(pop).openPopup() 
          } 
        })
     }
     }
}
</script>

<style lang='less'> 
.map { 
  z-index: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

</style>