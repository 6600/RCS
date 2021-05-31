const fs = require("fs");
import staticsview from './Staticsview'
import TaskView from './TaskView'
import nodemail from './nodemail'
import user from './user'


/**
 * 顶层路由控制器
 * @param app
 */
const routerDispatcher = function(app) {
  app.use('/config', function (req, res) {
    fs.readFile('./assets/config/web.json', function(err,data){
      if(err) {
        console.log(err);
      }
      res.end(data);
    });
    
  }); 
  app.use('/', user);
  app.use('/', staticsview);
  app.use('/', TaskView);
  app.use('/', nodemail);
};

export
default routerDispatcher;