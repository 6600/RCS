import express                                                        from 'express' 
import logger                                                         from 'morgan';
import cookieParser                                                   from 'cookie-parser';
import bodyParser                                                     from 'body-parser'
import router                                                         from './routes'; 
import conf                                                           from './assets/config/config'
let    http  =         require('http')
let    https =         require('https');
let    fs    =         require('fs'); 
let    path  =         require('path')
 
 
//https://blog.csdn.net/u012060033/article/details/102766342                      线程处理----源码自带，待分析
//API:http://nodejs.cn/api/cluster.html#cluster_how_it_works
const cluster = require('cluster');
const cpuNums = require('os').cpus().length;

const PCPort     =       8210;             //pc网页端口 
const mobilePort =       8211;             //移动端网页端口  

  var app = express();
 // var host = 'localhost';
  var options = {
      key: fs.readFileSync('./assets/httpskeys/server.key'),                                     //https://openssl   生成的key文件poem包
      cert:fs.readFileSync('./assets/httpskeys/server.crt')                                     //https             生成crt包
  }
var httpsServer = https.createServer(options,app);
var httpServer  = http.createServer(app);
//<!--------------------------------------------------->
   
app.use('/',express.static(path.join(__dirname, 'webpage')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

/* 增加跨域处理 */
let allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials','true');
    res.header("Content-Type", "application/json;charset=utf-8");
    if(req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
};
app.use(allowCrossDomain);

router(app); 
app.use(function(req, res, next) {
    // console.log(req)
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500).send('出错啦:' + err.stack);
    next(err);           //打印详细错误
});
/***************************cluster -- begin********************************/
if(cluster.isMaster){
    console.log('启动WebSocket!')
    require('babel-register');
    require('babel-core').transform();
    require('./websocket/socket/wsocket.js');
    for(let i=0;i<cpuNums;i++){    //根据cpu核数加载线程
        cluster.fork();
    }
    cluster.on('exit',(worker)=>{ // console.log(`worker${worker.id} exit.`)
    });
    cluster.on('fork',(worker)=>{   //console.log(`fork：worker${worker.id}`)
    });
    cluster.on('listening',(worker,addr)=>{   //   console.log(`worker${worker.id} listening on ${addr.address}:${addr.port}`)
    });
    cluster.on('online',(worker)=>{
         console.log(`线程${worker.id} is online now`)
    });
} else{
    httpsServer.listen(conf.httpsPort);
    httpServer.listen(conf.httpPort)
}
 