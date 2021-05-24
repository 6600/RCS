<template>
   <div class="mpanel">
    <el-tag   class="header" :class = "{mhead:type=='success'?true:false}" :type="type"  effect="dark">{{title}}</el-tag> 
    <el-table class='table'  :data="tableData"  highlight-current-row  @current-change="handleCurrentChange"  height="250"   border   style="width: 300px">
      <el-table-column  prop="id"      label="任务名称"  width="120">  </el-table-column>
      <el-table-column  prop="line"    label="产品线"  width="80">  </el-table-column>
      <el-table-column  prop="type"    label="任务类型"  width="100"> </el-table-column>
    </el-table> 
  <slot></slot>
  </div> 
</template>

<script> 
export default {
    name:'TaskControl',
    props:['title','tableData','type'],
    data(){
     return{
        currentRow: null
     }
    },
    methods:{
       handleCurrentChange(val) {   
         if(val!=null)
           this.$store.state.task.currentid ={id: val.id ,type:this.type==''?'wait':'tasking'
           } 
       }
    }
}
</script>

<style lang='less'>
  .mpanel{ 
    width: 19.5rem;
    border: 1px solid #EBEEF5;
    margin-top:10px;
    box-shadow: gray; 
     padding:5px 0px;   
    .header{
      text-align:center; }
    .header,.el-table,.el-button{
      position: relative;
      display: block;
      width:90%;
      margin:5px auto; 
       }
    .el-table{
      .el-table__row{
        height: 20px;
      }
    }
  }
  .el-table--scrollable-x .el-table__body-wrapper{
    overflow-x: hidden;
  }
  .mhead{
    margin:1rem auto!important;
  }
</style>