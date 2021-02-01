/*
 * @Author: your name
 * @Date: 2020-08-16 17:31:47
 * @LastEditTime: 2020-10-09 13:45:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \VUE-RCS监控\VUE-RCS\src\router\index.js
 */
import Vue from 'vue'
import Router from 'vue-router'
  
import Index from '../Page/index'
 

Vue.use(Router)
 const originalPush = Router.prototype.push
 Router.prototype.push = function push(location, onResolve, onReject) {
   if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
   return originalPush.call(this, location).catch(err => err)
 }
export default new Router({
  routes: [
    {
      path: '/',
      
       name: 'login', 
       component: () => import('@/Page/login')
    },
   
    {
      path: '/index',
      name: 'index',

      component: Index,
      children:[
        {path:'/DispatchMonitor',
         name:'DispatchMonitor'
         ,component:() => import('@/Page/DispatchMonitor/DispatchMonitor.vue')},                   //我写的页面
        {path:'/Connections',
         name:'Connection',
         component:() => import('@/Page/Connections/Connection.vue')},     
        {path:'/TaskList',
         name:'TaskList',
         component:() => import('@/Page/TaskList/TaskList.vue')},     
         {path:'/TaskDetail',
         name:'TaskDetail',
         component:() => import('@/Page/TaskList/TaskDetail.vue')},                      
        {path:'/ScrollTaskList',
         name:'ScrollTaskList',
         component:() => import('@/Page/TaskList/ScrollTaskList.vue')},       
         {path:'/Taskemail',
         name:'Taskemail',
         component:() => import('@/Page/TaskList/Taskemail.vue')},      
        {path:'/DataStatistics',
         name:'DataStatistics',
         component:() => import('@/Page/DataStatistics/DataStatistics.vue')},               
        // {path:'/homepage',name:'homepage',component:() => import('@/view/homepage/homepage')}, 
      ]
    }
  ]
})
