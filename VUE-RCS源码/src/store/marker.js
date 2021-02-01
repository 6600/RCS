import Vue from 'vue'
export default {

  state:{ 
    Markarr1 :           //电梯，充电桩，升降架
    [{Type:"UpdateEleStatus",  ID: 'E1', ip: '22.22.2.22', state:true,Floor: '1',DoorOpen:true,InUse:true},
     {Type:"UpdateEleStatus",  ID: 'E2', ip: '52.22.2.22', state:true,Floor: '1',DoorOpen:true,InUse:true},
     {Type:"UpdateLiftStatus", ID: 'Lift1', ip: '12.22.2.22', state:true,Pos: 'Bottom',HaveMaterial:true},
     {Type:"UpdateLiftStatus", ID: 'Lift2', ip: '21.22.2.22', state:true,Pos: 'Bottom',HaveMaterial:true},
     {Type:"UpdatePileStatus", ID: 'ChargePile1', ip: '232.22.2.22', state:true,MovingStatus: '1',ChargeStatus:'InCharging',ChargeCur:'1.5',ChargeVoltage:"50"},
     {Type:"UpdatePileStatus", ID: 'ChargePile2', ip: '222.22.2.22', state:true,MovingStatus: '1',ChargeStatus:'InCharging',ChargeCur:'1.5',ChargeVoltage:"50"} ],
     Autodoor:[        //自动门
      {Type:"UpdateAutoDoorStatus",  ID: 'F2Line',    ip: '22.22.2.22', state:true,DoorOpen:true},
      {Type:"UpdateAutoDoorStatus",  ID: 'F2Product', ip: '22.22.2.22', state:true,DoorOpen:true},
      {Type:"UpdateAutoDoorStatus",  ID: 'F3Line',    ip: '22.22.2.22', state:true,DoorOpen:true},
      {Type:"UpdateAutoDoorStatus",  ID: 'F3Product', ip: '22.22.2.22', state:true,DoorOpen:true},
      {Type:"UpdateAutoDoorStatus",  ID: 'F4Line',    ip: '22.22.2.22', state:true,DoorOpen:true},
      {Type:"UpdateAutoDoorStatus",  ID: 'F4Product', ip: '22.22.2.22', state:true,DoorOpen:true}, 
     ],
     Alarm_place:[      //警报器，车库存
      {Type:"UpdateAlarmModuleStatus",  ID: 'AM1', ip: '22.22.2.22', state:true,Alarm:true,Content	: "车已到站"},
      {Type:"UpdateAlarmModuleStatus",  ID: 'AM2', ip: '22.22.2.22', state:true,Alarm:true,Content	: "车已到站"},
      {Type:"UpdatePlaceStatus",  ID: 'A05K101', ip: '22.22.2.22', state:true,Name:'仓库发料库位1',HaveCar:true,Lock:true},
      {Type:"UpdatePlaceStatus",  ID: 'A05K102', ip: '22.22.2.22', state:true,Name:'仓库发料库位2',HaveCar:true,Lock:true},
    ],
    marker:{Type:'AGV',ID:0}                   //地图里选中的图标
  },
  
  mutations:{
     
    SOCKET_ConnectStatus(state,data){
      // console.log(data)
      switch (data.Type) {
   
        case data.Type!='UpdateAutoDoorStatus'&&data.Type!='UpdatePlaceStatus'&&data.Type!='UpdateAlarmModuleStatus':      
             var idx= state.Markarr1.findIndex(item=>{return data.ID==item.ID})
             if(idx>-1){  state.Markarr1[idx] = Object.assign(state.Markarr1[idx],data); } 
             else {state.Markarr1[state.Markarr1.push(data)-1].task =[];  } 
        break;
        case 'UpdateAutoDoorStatus': 
             var idx= state.Autodoor.findIndex(item=>{return data.ID==item.ID})
             if(idx>-1){  state.Avgarrs[idx] = Object.assign(state.Avgarrs[idx],data); } 
             else {state.Avgarrs[state.Avgarrs.push(data)-1].task =[];  } 
        break;   
        case data.Type=='UpdatePlaceStatus'||data.Type=='UpdateAlarmModuleStatus':     
            var idx= state.Alarm_place.findIndex(item=>{return data.ID==item.ID})
            if(idx>-1){  state.Alarm_place[idx] = Object.assign(state.Alarm_place[idx],data); } 
            else {state.Alarm_place[state.Avgarrs.push(data)-1].task =[];  } 
        break; 
        default:
          break;
      } 
    },
    setmark(state,val){
      state.marker = val
    },
  setEle(state,data){
    var idx= state.Markarr1.findIndex(item=>{return data.ID==item.ID})
    if(idx>-1){  state.Markarr1[idx] = Object.assign(state.Markarr1[idx],data); } 
    else {state.Markarr1[state.Markarr1.push(data)-1].task =[];  } 
  },
  setLift(state,data){
    var idx= state.Markarr1.findIndex(item=>{return data.ID==item.ID})
    if(idx>-1){  state.Markarr1[idx] = Object.assign(state.Markarr1[idx],data); } 
    else {state.Markarr1[state.Markarr1.push(data)-1].task =[]; 
    } 
  },
  setPile(state,data){
    var idx= state.Markarr1.findIndex(item=>{return data.ID==item.ID})
    if(idx>-1){  state.Markarr1[idx] = Object.assign(state.Markarr1[idx],data); } 
    else {state.Markarr1[state.Markarr1.push(data)-1].task =[]; 
    } 
  },
  setAutoDoor(state,data){
    var idx= state.Autodoor.findIndex(item=>{return data.ID==item.ID})
    if(idx>-1){  state.Avgarrs[idx] = Object.assign(state.Avgarrs[idx],data); } 
    else {state.Avgarrs[state.Avgarrs.push(data)-1].task =[];  } 
   k;   
  },
  setPlace(state,data){
    var idx= state.Alarm_place.findIndex(item=>{return data.ID==item.ID})
    if(idx>-1){  state.Alarm_place[idx] = Object.assign(state.Alarm_place[idx],data); } 
    else {state.Alarm_place[state.Alarm_place.push(data)-1].task =[]; 
    } 
  },
  setAlarm(state,data){
    var idx= state.Alarm_place.findIndex(item=>{return data.ID==item.ID})
    if(idx>-1){  state.Alarm_place[idx] = Object.assign(state.Alarm_place[idx],data); } 
    else {state.Alarm_place[state.Avgarrs.push(data)-1].task =[]; 
    } 
  },     
  },
  actions:{
    //  [USER_LOGIN]({commit},user){
    //      commit(USER_LOGIN,user)
    //  },
    //  [USER_LOGOUT]({commit}){
    //      commit(USER_LOGOUT)
    //  }
  }
}