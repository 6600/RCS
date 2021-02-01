
<template>
    <el-dialog title="确定要退出？"  :append-to-body="false" :modal-append-to-body="false">
      <div slot="footer" class="dialog-footer">
          <el-button @click="dialogclose">取消</el-button>
          <el-button @click="dialogconfirm">确认</el-button>
      </div>
    </el-dialog>
</template>

<script>
import {mapActions} from 'vuex'
import {USER_LOGOUT} from '../store/user'
export default {
    methods:{
        dialogclose(){
            this.$emit('close')
        },
        ...mapActions([USER_LOGOUT]),
        dialogconfirm(){ 
          this.$router.replace({path:'/'}) 
          this.dialogclose()
        }
    }
}
</script>

<style>
.el-dialog{ 
  /* 清除position */          
  margin:0 auto; 
  background: #fff;
}
.el-dialog__wrapper{
  z-index:999!important;
  
}
</style>
