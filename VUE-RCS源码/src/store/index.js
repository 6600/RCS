
import Vue                                                          from 'vue'
import Vuex                                                         from 'vuex'
import user                                                         from './user'
import TaskList                                                     from './TaskList'
import Taskemail                                                    from './Taskemail'
import marker                                                       from './marker'
import DataStatistics                                               from './DataStatistics'
import map from './DispatchMonitor'                                  
import persistedState                                               from 'vuex-persistedstate'

Vue.use(Vuex);
export default new Vuex.Store({
    modules:{ 
        user,
        TaskList,Taskemail,marker ,map,DataStatistics
    },
    plugins: [persistedState()]
})
