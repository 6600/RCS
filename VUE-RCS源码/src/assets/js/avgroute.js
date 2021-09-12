//基于Leaflet的室内地图最短路径查询部分 :https://blog.csdn.net/GISuuser/article/details/79081658
require('leaflet-rotatedmarker')
import {rectangle}                                     from 'leaflet'; 
import {antPath}                                       from 'leaflet-ant-path';

import * as L                                          from 'leaflet'  
import  store                                          from '../../store/index'
import                                                 "leaflet/dist/leaflet.css";

var route = {
  num: false,
  startPoint: null,
  endPoint: null,
  routingLayer: null,
  startMarker: null,
  endMarker: null
};
var map
/**
* 添加路径规划图标
*/

export default function LeafMap(context) {
  this.map = context
};
LeafMap.prototype = {
                  //图层，图片地址
loadlayer:function(layer,url){                      //加载图层
    //url = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597688387190&di=b58f21792b820b8def0443e026c93205&imgtype=0&src=http%3A%2F%2Fpic4.zhimg.com%2Fv2-fef30c9c805c69e19d4fc2fbe0cd5d0c_b.jpg';
  // calculate the edges of the image, in coordinate space
  //左下角  x y             
  console.log(layer.h,layer.w);                                                 //  https://www.jianshu.com/p/151d3df58717
  var southWest = this.map.unproject([0, layer.h], this.map.getMaxZoom()-1);           //换算成经纬度坐标？https://zhuanlan.zhihu.com/p/91843245
 //右上角  x y
  var northEast = this.map.unproject([layer.w, 0], this.map.getMaxZoom()-1);
   var bounds = new L.LatLngBounds(southWest, northEast);
       //   L.DomEvent.disableScrollPropagation();
        // L.DomEvent.addListener('.leaflet-container', 'mousedown dblclick', function (e) {
        //   L.DomEvent.stopPropagation(e);
        // }); 
   var bgimg = L.imageOverlay(url,bounds).addTo(this.map);       //https://www.giserdqy.com/secdev/leaflet/14644/
    this.map.setMaxBounds(bounds);
  // bgimg.setBounds(bounds)
    this.markicons = []
    this.pathicons = []
    this.placeicons = []
     return bgimg
},  
 
/** 
 * @param {*} Paths    
 * @param {*} Map
 * @returns {*}  
 */
loadPaths:function(Paths,Map){                      //加载路径
   let latlngs = new Array() 
   let that = this
 // var polyline 
   let layer = L.layerGroup()
   Paths.forEach(path=>{                             
    latlngs = new Array()
     let s = path.s,e = path.e    
    // console.log(path.s);
    
     let spoint= L.point(s.x-Map.x, s.y-Map.y);
     let epoint= L.point(e.x-Map.x, e.y-Map.y);
     let slang = this.map.unproject(spoint, this.map.getMaxZoom()-1);  
     let elang = this.map.unproject(epoint, this.map.getMaxZoom()-1);  

         latlngs.push(slang); latlngs.push(elang)
     let antPath = L.polyline.antPath;                                 //https://rubenspgcavalcante.github.io/leaflet-ant-path/
     let pathlay = antPath(latlngs, {
　　　　"paused": true,   　　//暂停  初始化状态
　　　　"reverse": false,　　//方向反转
　　　　"delay": 3000,　　　　//延迟，数值越大效果越缓慢
　　　　"dashArray": [10, 20],　//间隔样式
　　　　"weight": 5,　　　　//线宽
　　　　"opacity": 0.5,　　//透明度
　　　　"color": "#BDBDFF",　//颜色
　　　　"pulseColor":"0A00FF" 　　//块颜色
　　  });
     pathlay.ID = path.ID
    //  console.log("path",pathlay)
     pathlay._animatedPathClass = `leaflet-ant-path path-item-${path.ID}`
    layer.addLayer(pathlay).addTo(this.map);  
    this.pathicons.push(pathlay)  
  })    
  return {pathlayer:layer,pathicons:that.pathicons}
//var polyline = L.polyline(latlngs, {color: 'red'}).addTo(map);  
},  

loadPlace:function(Place,Map,type){                      //加载库位 
  let that = this
  let layer = L.layerGroup()
   Place.forEach(place=>{                             
   //latlngs = new Array()
    let spoint= L.point( parseInt(place['X'])-Map.x,parseInt(place['Y'])-Map.y);
    let slang = this.map.unproject(spoint, this.map.getMaxZoom()-1);  
    var myIcon = L.divIcon({ 
      tooltipAnchor: [0, -15],
      popupAnchor: [75,40], 
      className:  place.Locked=="TRUE"?'PlaceLocked':'Place',
      iconSize:type=='Monitor'?20:10,
     // html:place.PlaceID
  });
     
    var marker = L.marker(slang,
      {icon: myIcon, 
       rotationOrigin:'center',
     //  draggable:false, 
     }  )
    marker.bindTooltip(place.PlaceID,  { direction: 'top', permanent:false});
    marker.ID = place.PlaceID
    // console.log("Locked",place.Locked)
   layer.addLayer(marker).addTo(this.map);  
   layer.setZIndex(0)
   this.placeicons.push(marker)  
 })    
 return {placelayer:layer,placeicons:that.placeicons}
 
 },
UpdatePlace:function(Locked,place,type){ 
  
  let icon  = L.divIcon({ 
    tooltipAnchor: [0, -5],
    popupAnchor: [75,40], 
    className:  Locked=="TRUE"?'PlaceLocked':'Place',
    iconSize:type=='Monitor'?20:10,
   // html:place.PlaceID
  });
  console.log('更新渲染车库',place.ID, Locked)
  place.setIcon(icon) 
},
UpdatePath:function(Occupy,path){
  console.log('尝试更新路径颜色!', path._animatedPathId, Occupy)
  const box = document.querySelector('.show-box-right')
  if (!box) {
    console.error('没有盒子')
    return
  }
  if (Occupy=="TRUE") {
    box.querySelector(`.${path._animatedPathId}`).classList.add('active')
  } else {
    box.querySelector(`.${path._animatedPathId}`).classList.remove('active')
  }
},
UpdateMark:function(type){             //更新 avg,电梯，升降支架状态，自动门，库位状态，充电桩状态
   
},  
/**
* 加载marker图标  x坐标，y坐标，类型：ele,agv,autodoor,num编号：用于path,idx
*/
loadMarker:function(x, y, type, id) { 
  var myIcon   
  var myIcon = L.divIcon({ 
      tooltipAnchor: [0, -15],
      popupAnchor: [75,40], 
      className:  'AGV',
      iconSize:30
  });

  var pointXY = L.point(x, y);                                   ///将像素坐标转成lanlng坐标
  console.log(myIcon);
  
  var pointlatlng = this.map.unproject(pointXY, this.map.getMaxZoom()-1);
  // why doesn't this match e.latlng? 
  var marker = L.marker(pointlatlng,
     {icon: myIcon, 
      rotationOrigin:'center',
    //  draggable:false, 
    }
     ).addTo(this.map);
  marker.bindTooltip(id,  { direction: 'top', permanent:true});
  // var content = `<div style=" width:120px;height:80px;font-size:14px;font-weight:bold;" id="popup">
  //                <div><span>任务:</span><span></span></div>
  //                <div><span>耗时:</span><span></span></div>
  //                <div><span>状态:</span><span></span></div>
  //                <div><span>异常:</span><span></span></div>
  //                </div>`;
  var content = '' 
 var popup =  marker.bindPopup(content, {className:'popup',autoClose:false})
     popup.openPopup()  
     marker.Type = 'AGV';
     marker.ID   = id
     marker.warn = ''
     marker.on('click',(e)=>{
       console.log(e.target.Type,e.target.ID);
       store.commit('setClickmark',{ID:e.target.ID,Type:type})  
       popup.openPopup() 
     })
     marker.setZIndexOffset(10000)

    this.markicons.push(marker) 
    var layer =  L.layerGroup(this.markicons)

    var that =this
    layer.addTo(this.map);             //加载start坐标的站点mark  
return {markicons:that.markicons,marklayer:layer}
},

/**
* 清除最短路径结果
*/
  clearPath:function(){
  if (map.hasLayer(route.routingLayer)) {
      map.removeLayer(route.routingLayer);
      map.removeLayer(route.startMarker);
      map.removeLayer(route.endMarker);
  }
  route.startPoint = null;
  route.endPoint = null;
  route.num = false;
}
};