<!--
 * @Author: your name
 * @Date: 2020-08-20 14:32:51
 * @LastEditTime: 2020-09-30 22:48:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \VUE-RCS监控\VUE-RCS\src\Page\DataStatistics\Panelborder.vue
-->
<template>
<div class="contain"> 
  
  <div   :class="panelclass" class="Panelborder"  :style="{width:width,height:height}"  >
   <span>{{title}}</span>
   <slot></slot>
 </div>
</div>
  
</template>

<script>
import      {mapState,mapMutations}                                         from 'vuex'

export default { 
  name:'Panelborder',
  props:['title','Chartype',"width",'height','index'],
  data(){
    return{
      //width:'25rem',
     // height:'20rem'
    }
  },
  computed:{
    ...mapState({
      SelectIdx: state=> state.statics.SelectIdx
    }),
    panelclass(){
      return 'tweenPie'+this.index
    }
  },
 
}
</script>

<style lang='less' scoped>

.Panelborder{
     position:relative;   margin-top: 8px; margin-bottom:1.5rem; 
     box-shadow: 0 2px 4px rgba(0, 0, 0, .6), 0 0 6px rgba(43, 42, 42, 0.04); //背景阴影
     background-color: #fff;
      padding:0px  10px 0px 0px;
      height:25rem; 
      border-radius: 0px; 
       span{
         font-weight: 700;
          text-align: left;
          display: block;
          line-height: 40px;
          padding: 0 10px;
       }
     } 
.Panelborder:hover{
    cursor: pointer;
  }

</style>