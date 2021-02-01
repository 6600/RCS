 
 import Vue from 'vue'

 import { mount,shallowMount ,createLocalVue } from '@vue/test-utils' 
 //import TaskList from '../src/Page/TaskList/TaskList.vue'
 import ScrollTaskList                         from '../src/Page/TaskList/ScrollTaskList.vue'
 import index                                  from '../src/Page/index.vue'
 import VueRouter                              from 'vue-router'
 import   axios                                from 'axios'
 import ElementUI                              from 'element-ui'

 import MintUI from 'mint-ui';

const localVue = createLocalVue()
const router = new VueRouter()

localVue.use(MintUI)
localVue.use(ElementUI)
localVue.use(VueRouter)
localVue.use(axios) 

 describe('实时列表websocket测试', () => {   
  it('是一个Taskemail实例', () => {
     const wrapper = mount(ScrollTaskList, {
      localVue,
      router,
      mocks: {
        axios
      }
    })
  //  expect(wrapper.isVueInstance()).toBeTruthy() 
    })
 
 })

 