

<template>
 
    <div class="left">
     
     <div class="group"> 
     <el-radio v-model="dayOrmon" label='monline'  @change='change' >月</el-radio></div>
     <div class="group">  
     <el-radio v-model="dayOrmon" label='dayline'  @change='change' >日</el-radio> </div>
    </div>
   
</template>

<script>
export default {
  name:'Lradio',
  data(){
    return{
      dayOrmon:'dayline'
    }
  },
  methods:{  
    change(){
      this.$emit("Radchange",this.dayOrmon);
    }
  }
};
</script>

<style lang='less'>
   .left{
     position:absolute;  
     margin-top:6rem;
     z-index:999;
     display: flex;
     flex-direction:column;
       .group{
        margin-top:20px;
        align-items: center;
      }
   .el-radio{ 
     width:52px;
     text-align: center;
     margin-left:2rem;
  
   }
  }
    
</style>