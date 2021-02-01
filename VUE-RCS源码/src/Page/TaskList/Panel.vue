
<template>
<div class="Taskpanel" :style="{width:width,height:height}"> 
   <el-card :body-style="{ padding:mpadding,height:'auto'}"> 
    <slot></slot> 
  </el-card>
</div> 
</template>

<script>
export default {
  name:'Panel',
  props:['title','state','id','type','width','height'],
  data(){
    return{
               // 字段转中文
    }
  },  

   computed:{
    Labelconvert(o){             //英文key返回中文中字符
      return function(o){        //computed属性值传参返回值  ({{ip}})
        var rename = (''+o).replace('Update','');rename = rename.replace('Status','')  
        return this.label[rename]
      }
    },
    mpadding(){
     return this.type=="Chart"?'10px':'25px'      
    }
 },
}
</script>

<style lang='less' scoped>
  .Taskpanel{                      //连接边框的样式
  position: relative;
    width: 16rem;  
    margin-bottom:1rem;
    .header{
      width:15rem;
      height: 30px;
      text-align: center;
    i{float:left;} 
    }
  }
  .el-card{width:100%; overflow: hidden;position:relative;
}
   
</style>