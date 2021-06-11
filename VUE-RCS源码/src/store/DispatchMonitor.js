import {point, circle, segment }                                        from '@flatten-js/core';    //api:https://alexbol99.github.io/flatten-js/Segment.html       
import Vue from 'vue';
function infloor(mapRange,x,y){
  let index = 0
   mapRange.forEach((item,idx)=>{ 
    if(parseInt(x)>item.x1&&parseInt(x)<item.x2&&parseInt(y)>item.y1&&parseInt(y)<item.y2){
      index = idx
    } 
 })
 return index
}
export default {

  state:{ 
    floormap:[],

    flooridx:0,                                                   //存储选择的几层楼

    AGVstatus:'',                                                 //AGV小车和小车任务信息，可根据socket传过来的值更新 
    AGVArr:{},                                                   //缓存最新的小车坐标
    EdgeStatus:[],
    PlaceStatus:[],

    EdgeCache:[{},{},{},{}],                                                //缓存边路径
    PlaceCache:[{},{},{},{}],                                               //缓存车库
          
            //存储小车任务状态
    Avgtask: {"C1": {ID:'C1',TaskID:'2020-08-22 10:10:01',IP:'127.0.0.1',CurrentPos: "仓库发料区",CurrentOperate:'行车中',TaskTypeName:'原料配送任务',StartPlace:'仓库发料区',EndPlace:'2楼线边仓',ScheduledTime:'10:20:05',RemainTime:'10:04'},
              "C2": {ID:'C2',TaskID:'2020-08-22 10:10:01',IP:'127.0.0.1',CurrentPos: "仓库发料区",CurrentOperate:'行车中',TaskTypeName:'原料配送任务',StartPlace:'仓库发料区',EndPlace:'2楼线边仓',ScheduledTime:'10:20:05',RemainTime:'10:04'},
              "C3": {ID:'C3',TaskID:'2020-08-22 10:10:01',IP:'127.0.0.1',CurrentPos: "仓库发料区",CurrentOperate:'行车中',TaskTypeName:'原料配送任务',StartPlace:'仓库发料区',EndPlace:'2楼线边仓',ScheduledTime:'10:20:05',RemainTime:'10:04'},
              "C4": {ID:'C4',TaskID:'2020-08-22 10:10:01',IP:'127.0.0.1',CurrentPos: "仓库发料区",CurrentOperate:'行车中',TaskTypeName:'原料配送任务',StartPlace:'仓库发料区',EndPlace:'2楼线边仓',ScheduledTime:'10:20:05',RemainTime:'10:04'}}, 
    Updatetask:{ID:'C4',x:920,y:383,Type:'AGV',state:true},
   
    mapRang:   [{x1:976, x2:3408, y1:2201,y2:3535  ,x:976 ,y:2201},     //大图坐标转4张小图坐标   
                {x1:4478,x2:6910, y1:2252,y2:3586  ,x:4478,y:2252},
                {x1:968, x2:3400, y1:4517,y2:5851  ,x:968 ,y:4517},
                {x1:4443,x2:6975, y1:4516,y2:5850  ,x:4443,y:4516}
               ], 
    Clickmark:{ID:'C1',Type:'AGV'}, 
  },
 
  mutations:{
    SOCKET_AGVandTask(state,data){                                // E:\VUE_RCS监控\VUE-RCS监控\RCS_Server
      if(data.RequestType=='UpdateAGVStatus') {                     
        data.List.forEach((item,idx)=>{
          //  console.log('接受的小车status',item);   
           let id = item.ID 
           if(typeof(state.AGVArr[item.ID])!="undefined"&&typeof(state.AGVArr[item.ID])!="undefined"){
            let sp = point(parseInt(state.AGVArr[item.ID].X),parseInt(state.AGVArr[item.ID].Y))
            let ep = point(parseInt(item.X),parseInt(item.Y))
            let length = segment(sp,ep).length  
           // console.log('速率',sp,length);  
            data.List[idx].length = length
            state.AGVArr[item.ID] = item  
           } 
          })
          Vue.set(state, 'AGVstatus', JSON.stringify(data.List))
          console.log('vuex收到AGVstatus:'); 
          // console.log('C1.X:',state.AGV1.X,'C1.Y:',state.AGV1.Y,'C2.X',state.AGV2.X,'C2.Y:',state.AGV2.Y)
          // console.log('AGV1.Y:',state.AGV1.Y,'AGV2.Y:',state.AGV2.Y,'AGV3.Y:',state.AGV3.Y,'AGV4.Y:',state.AGV4.Y)
      }else if(data.RequestType == 'UpdateAGVTaskStatus'){          //更新AGV任务状态
        state.Updatetask = '[]'
        setTimeout(() => {
          Vue.set(state, 'Updatetask', JSON.stringify(data.List))  
        }, 0);
                
       //   data.List.forEach(item=>{ 
       //     // console.log('接受到 agvtaskinfo',state.Updatetask) 
       //      state.Avgtask[item.AGVID] = item 
       // }) 
      }
    },
    setEdgeStatus(state,data){    
      state.EdgeStatus = data 
      console.log(data)
      data.forEach(path=>{      
        let idx = infloor(state.mapRang,path.X,path.Y) 
        state.EdgeCache[idx][path.ID] = path
        state.floormap[idx]['path'].forEach((item,index)=>{
          if(item.ID==path.ID){
            state.floormap[idx]['path'][index].Occupy = path.Occupy  
            console.log('vuex收到EdgeStatus:',idx,index,state.floormap[idx]['path'][index].Occupy, path.Occupy);  
          }
        })
      }) 
    },
 
    setPlaceStatus(state,data){  
      state.PlaceStatus = data       
      data.forEach(place=>{     
       let idx = infloor(state.mapRang,place.X,place.Y)   
       state.PlaceCache[idx][place.ID] = place 
       state.floormap[idx]['place'].forEach((item,index)=>{
        //  console.log(item.PlaceID, place)
        if(item.PlaceID==place.Name){
          Vue.set(state.floormap[idx]['place'][index], 'Locked', place.Locked)    
          console.log('vuex收到PlaceStatus:',idx,index,state.floormap[idx]['place'][index].Locked, place.Locked );  
        }
      })
      }) 
   },
 
    setClickmark(state,val){
      state.Clickmark = val
    },
    setFloorIdx(state,val){
      //console.log(val);
       if(val!='thumb')
         state.flooridx = val-1
       else 
         state.flooridx = -1
    }, 
    setMapRang(state,val){
      state.mapRang = val
    },     
    setPathRange(state,val){
      state.pathRange = val 
    }, 
    setPlaceRange(state,val){
      state.placeRange = val 
    },
    InitFloormap(state,val){
      state.floormap    = val 
      console.log('加载地图相关数据',state.floormap )
    },
    
    setmap(state,val){
      state.floormap.forEach((item,idx)=>{
         item.mark.forEach((it,index)=>{
           if(it.ID == val.ID){
             state.floormap[idx].mark[index] = val
           }
         })
      })
    }, 

    setfloormark(state,val){
      state.floormap[val.idx].mark[val.data.ID] = val.data
    },
    setAvg(state,data){
      var idx= state.Avgarrs.findIndex(item=>{return data.ID==item.ID})
      if(idx>-1){  state.Avgarrs[idx] = Object.assign(state.Avgarrs[idx],data); } 
      else {state.Avgarrs[state.Avgarrs.push(data)-1].task =[]; 
      } 
    },
    setAvgtask(state,data){ 
      if(state.Avgtask[data.ID]==undefined){
        var id = data.ID
        state.Avgtask[data.ID]=new Array()
        state.Avgtask[data.ID].push(data)
      //  state.$set(state.Avgtask,data.ID,new Array()) 
      }else{  if(state.Avgtask[data.ID].length>=4){
        state.Avgtask[data.ID].splice(0,1);
        state.Avgtask[data.ID].push(data) 
      }else{ state.Avgtask[data.ID].push(data) 
      } }
    }
  },
  actions:{                            //参考文章:https://blog.csdn.net/qq_19343775/article/details/105177574?utm_medium=distribute.wap_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-1.wap_blog_relevant_pic&depth_1-utm_source=distribute.wap_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-1.wap_blog_relevant_pic
     // 根据type commit不同mutation   ，这里是重点，从websocket派发到vuex对应模块的对应state属性中
  SOCKET_EdgeStatus({ commit }, data) {
      commit('setEdgeStatus', data);
    },
  SOCKET_PlaceStatus({ commit }, data) {
    commit('setPlaceStatus', data);
    },
  },
   getters : {
    EdgeStatus_get:  state => state.EdgeStatus,
    PlaceStatus_get: state => state.PlaceStatus,
   }, 
}