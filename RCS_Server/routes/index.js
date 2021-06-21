const fs = require("fs");
import staticsview from './Staticsview'
import TaskView from './TaskView'
import nodemail from './nodemail'
import user from './user'
import webConfig from '../assets/config/web.js'


/**
 * 顶层路由控制器
 * @param app
 */
const routerDispatcher = function(app) {
  app.use('/config', function (req, res) {
    res.end(JSON.stringify(webConfig));
    
  }); 
  app.use('/', user);
  app.use('/', staticsview);
  app.use('/', TaskView);
  app.use('/', nodemail);
};

export
default routerDispatcher;