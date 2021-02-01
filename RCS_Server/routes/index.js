import staticsview                                                                 from './Staticsview'
import TaskView                                                                    from './TaskView'
import nodemail                                                                    from './nodemail'
import user                                                                        from './user'
 
/**
 * 顶层路由控制器
 * @param app
 */
const routerDispatcher = function (app) {

    /**
     * 测试路由
     */
   //app.use('/test', function (req, res) {
   //    res.end('test');
   //}); 
     app.use('/', user);
     app.use('/', staticsview);
     app.use('/', TaskView);
     app.use('/', nodemail);
    };

export default routerDispatcher;
