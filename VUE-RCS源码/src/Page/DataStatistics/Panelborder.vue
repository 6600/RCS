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
   <!-- <span>{{title}}</span> -->
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
     position:relative;
     background-color: #fff;
      height:25rem; 
      border-radius: 0px; 
       span{
          display: block;
          line-height: 40px;
          top: 0;
        width: 100%;
        position: absolute;
        text-align: center;
       }
     } 
.Panelborder:hover{
    cursor: pointer;
  }

</style>