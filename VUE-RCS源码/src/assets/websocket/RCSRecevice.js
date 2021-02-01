
import  store                                                     from '../../store/index'

 function RCSRecevice(event){
   var data =  JSON.parse(event.data)     
   var RequestType = data.RequestType

   switch(RequestType){
     case 'UpdateAGVStatus': 
        store.commit('SOCKET_AGVandTask',   data)  
        break;
     case 'UpdateAGVTaskStatus': 
        store.commit('SOCKET_AGVandTask',   data)  
        break;
     case 'TaskUpdate': 
        store.commit('SOCKET_UpdateTask',   data.List);
        break;
     case 'UpdateEdgeStatus': 
        store.dispatch('SOCKET_EdgeStatus', data.List);
        break;
     case 'UpdatePlaceStatus': 
        store.dispatch('SOCKET_PlaceStatus',data.List);
        break; 
    default:
        break;
   }
 
 }

 export default RCSRecevice