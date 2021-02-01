<template>
   <el-row>
    <el-col v-for="item in CardData"  key='title'>
      <div class="card row">
         <img src="item.card.iconsrc" alt="">
         <span>{{item.card.title}}</span>
         <p v-html="item.card.content"></p>
      </div> 
    </el-col>
   </el-row>
</template>
<script>
export default {
  props:['title'],
  name:'HeaderList', 
  data(){
    return{
      CardData:{
        card:{
          title:'行驶距离',
          iconsrc:'../../static/img/task/dispatch.png',
          content:'系统中所有Agv已行驶'
        },
        card:{
          title:'完成任务',
          iconsrc:'12', 
        },
        card:{
          title:'工作时间',
          iconsrc:'12', 
        },
        card:{
          title:'运载货物',
          iconsrc:'12', 
        },
        }
    }
  }
}
</script>

<style lang='less'>
.card-body {
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    min-height: 1px;
    padding: 1.25rem;
}
.row {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    margin-right: -15px;
    margin-left: -15px;
}
</style>