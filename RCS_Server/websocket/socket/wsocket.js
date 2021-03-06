import    RCSdispatch                               from './RCSdispatch'
var       logger = require('../../assets/log4js').logger

const fs = require('fs') 
//websocket配置https://www.cnblogs.com/zzghk/p/10573437.html
const WebSocket = require('ws') 
//   配置https服务

const cfg = {
        ssl: true,
        port: 8212,                              
        ssl_key:  '../../assets/httpskeys/server.key',
        ssl_cert: '../../assets/httpskeys/server.crt'
    };
 
let httpServ = ( cfg.ssl ) ? require('https') : require('http');

let app      = null; 
let processRequest = function( req, res ) {

    res.writeHead(200);
    res.end("All glory to WebSockets!\n");
}; 

//if ( cfg.ssl ) {
//    app = httpServ.createServer({                                 // providing server with  SSL key/cert 抄网上代码的。
//        key: fs.readFileSync( cfg.ssl_key ),
//        cert: fs.readFileSync( cfg.ssl_cert ) 
//    }, processRequest ).listen( cfg.port );
//} else {
//    app = httpServ.createServer( processRequest ).listen( cfg.port );
//}
//const server = new WebSocket.Server({ server: app });                  //启用https
 

const server = new WebSocket.Server({ port: '8212' });       
let ip           
let port        
let clientName
let Datacacha = {'UpdatePlaceStatus':{"":""},'UpdateEdgeStatus':{"":""}}    
server.on('connection', function connection(ws, req) {
   ip         = req.connection.remoteAddress;
   port       = req.connection.remotePort;
   clientName = ip + port; 
 //  console.log('%s is connected', clientName)
   logger.info('[socket][connection]网页端:'+clientName+',连接成功');

  // 发送缓存车库，路径状态给客户端 
 Object.keys(Datacacha).forEach(item=>{
    let List = new Array()
     Object.keys(Datacacha[item]).forEach(val=>{
       List.push(Datacacha[item][val])
     })
      ws.send(JSON.stringify({RequestType:item, List:List}));
   //  logger.info('[socket][connection]发送数据给:'+clientName+'');

   })
//
  ws.on('message', function incoming(data) { 
    RCSdispatch(server,data) 
    data = JSON.parse(data)    
    if(typeof(data.RequestType)!='undefined'){ 
      if(data.RequestType =='UpdatePlaceStatus'||data.RequestType=='UpdateEdgeStatus'){    //这个是不存在下面项的判断，也就是说indexof为-1时可进行socket.brocast类型的传输 // 1,3,4,12,13 //13
       data.List.forEach(item=>{
        Datacacha[data.RequestType][item.ID] = item
       }) 
      // console.log(data)
       logger.info('[socket][connection]缓存UPdatePlace,UpdateEdge数据:'+clientName+'');
    } 
  }
  }); 
});

server.on('open', function open() {
  console.log('connected'); 
});

server.on('close', function close() { 
  logger.info('[socket][close]网页端:'+clientName+',断开连接！'); 
});