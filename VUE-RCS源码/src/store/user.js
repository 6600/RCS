/*
 * @Author: your name
 * @Date: 2020-08-16 17:31:47
 * @LastEditTime: 2020-09-17 17:13:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \VUE-RCS监控\VUE-RCS\src\store\user.js
 */
import Vue from 'vue'

export const USER_LOGIN='USER_LOGIN'
export const USER_LOGOUT='USER_LOGOUT'
  //
export default {
    state:{
      username:''
    },
    mutations:{
        [USER_LOGIN](state,user){
          console.log(user);
          state.username = user 
           
        },
        [USER_LOGOUT](state){
           }
    },
    actions:{
        [USER_LOGIN]({commit},user){
            commit(USER_LOGIN,user)
        },
        [USER_LOGOUT]({commit}){
            commit(USER_LOGOUT)
        }
    }
}