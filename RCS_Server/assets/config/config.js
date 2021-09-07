
var fs    =         require('fs'); 

/**
 * 项目中的一些常量配置类（单例类）
 */
const conf = Object.freeze({
    // mysql的配置项
    mysql: {
        host: "127.0.0.1",
        user:'root',
        password:'123456',
        database:'rcs',
        port: 3306
    },
    httpsPort:8211,
    httpPort:8210,
    socketPort:8212,
    specialArea: {
        C1: [2550,2650,2450,2850,0,0]
    }
});

export default conf;