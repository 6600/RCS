
// import  {test}                                                    from '../../../../test_mock/mocksocket';
import  RCSRecevice                                               from './RCSRecevice';
import  Method                                                    from '../js/Mythod';
  
let webSocketIP = ``;
let socket = '';
let isFirst = true;
  
const onopenWs = event => {
    // 发送欢迎信息给客户端  
     //  test(socket,500) 
} 

const onmessageWs = event => { 
  RCSRecevice(event)
  window.dispatchEvent(new CustomEvent('onmessageWS', { 
      detail: { 
        data: event, 
        isFirst: isFirst 
      } 
  })) 
  if(isFirst) { 
    isFirst = false; 
  } 
}

const oncloseWs = event => { 
    console.log("断开链接", event); 
   // clearInterval(setIntervalWesocketPush) 
}

const onerrorWs = event => { 
    console.log("出现错误", event); 
   // clearInterval(setIntervalWesocketPush) 
}

//Method.getIP()                   //现场部署IP
//Method.getRemoteIP()                   //开发测试IP
export const createSocket =tid => {
  isFirst = true;
  webSocketIP = `ws://${Method.getIP()}:${tid}`
  console.log(webSocketIP)

  socket = new WebSocket(webSocketIP);
  socket.onopen = onopenWs;
  socket.onclose = oncloseWs;
  socket.onerror = onerrorWs;
  socket.onmessage = onmessageWs;
}