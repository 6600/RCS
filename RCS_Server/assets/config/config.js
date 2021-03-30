
var fs    =         require('fs'); 

/**
 * 项目中的一些常量配置类（单例类）
 */
const conf = Object.freeze({
    // mysql的配置项
    mysql: {
        host: "bj-cynosdbmysql-grp-kqvvbnw0.sql.tencentcdb.com",
        user:'root',
        password:'CjMom&xcaq3iPixQ',
        database:'rcs',
        port: 28556
    },
    httpsPort:8211,
    httpPort:8210,
    socketPort:8212,
    specialArea: {
        C1: [2550,2650,2450,2850,0,0]
    }
});

export default conf;