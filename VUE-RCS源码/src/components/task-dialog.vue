 

<template>
    <el-dialog :title="mtitle"  :append-to-body="false" :modal-append-to-body="false">
      <div slot="footer" class="dialog-footer">
           <el-button @click="dialogconfirm">确认</el-button>
      </div>
    </el-dialog>
</template>

<script> 
export default {
  name:'taskDialog',
  props:['mtitle'],
    methods:{ 
      dialogconfirm(){ 
         this.$emit('confirm') 
     }
    }
}
</script>

<style>
.el-dialog{ 
  /* 清除position */    
  
  margin:28rem auto; 
  margin-top:20rem!important;
  background: #fff;
}
</style>
