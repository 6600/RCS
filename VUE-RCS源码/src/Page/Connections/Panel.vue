
<template>
<div class="conpanel" :style="{width:width,height:height}">
   <div class='header' ><i class= 'iconfont icon-diannao' :style="{color:state?'green':'gray'}"></i>
   <span>{{Labelconvert(title)}}{{id}}</span></div>
   <el-card :body-style="{ padding: '0px' }" :style="{width:width,height:height}">
    
    <slot></slot> 
  </el-card>
</div> 
</template>

<script>
export default {
  name:'Info',
  props:['title','state','id','ip','width','height'],
  data(){
    return{
      label:{'avg':'小车','Ele':'电梯','Lift':'升降梯','AutoDoor':'自动门','Edge':'站点','Pile':'充电桩',Place:'库位'},              //电梯，充电桩，门等标题英文转中文
    }
  },
   computed:{
    Labelconvert(o){             //英文key返回中文中字符
      return function(o){        //computed属性值传参返回值  ({{ip}})
        var rename = (''+o).replace('Update','');rename = rename.replace('Status','')  
        return this.label[rename]
      }
    },
 },
}
</script>

<style lang='less' scoped>
 
  .conpanel{                      //连接边框的样式
    width: 16rem;  
    .header{
      width:15rem;
      height: 30px;
      text-align: center;
    i{float:left;} 
    }
  }
  .el-card{width:100%;   height: 19.5rem; overflow: hidden;position:relative;
}
   
</style>