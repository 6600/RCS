
<template>
  <div class="Taskemail">
    <div class="contain">
      <el-form
        :model="dynamicValidateForm"
        ref="dynamicValidateForm"
        label-width="70px"
        class="demo-dynamic"
      > 
      <div class="formitem"  v-for="(email, index) in dynamicValidateForm.emails">
         <el-form-item 
          :label="'邮箱' + index"
          :key="email.key"
          :prop="'emails.' + index + '.value'"
          :rules="[
            { required: true, message: '请输入邮箱地址', trigger: 'blur' },
            {
              type: 'email',
              message: '请输入正确的邮箱地址',
              trigger: ['blur', 'change'],
            },
          ]"
        >
          <el-input v-model="email.value"></el-input >
          <el-button @click.prevent="removeemail(email)" >删除</el-button>
          <el-button type="success" @click.prevent="verifyemail('dynamicValidateForm',index)" v-show="email.code!=true&&!email.show">验证</el-button>
        </el-form-item>
         <el-form-item  
           v-show = "email.show" 
         >
         <el-input v-model="email.code" size='small' placeholder="六位数字" class= 'code' ></el-input > 
         <el-button  size='small' type="primary" @click="confirm(index)"  >确定</el-button>
         <el-button  size='small' type="primary" @click="verifyemail('dynamicValidateForm',index)" :disabled="parseInt(email.sec)>0" >重新发送<span v-show="parseInt(email.sec)>0">({{email.sec}}秒)</span></el-button>
         </el-form-item>
      </div>
       
       </el-form>
    </div>
    <div class="btn_group">
      <el-button type="primary" @click="submitForm('dynamicValidateForm')"
        >保存</el-button
      >
      <el-button type="primary" @click="addemail">新增邮箱</el-button>
      <!-- <el-button type="primary" @click="resetForm('dynamicValidateForm')"
        >取消</el-button
      > -->
    </div>
  </div>
</template>

<script>
import      {mapState,mapActions,mapMutations}               from 'vuex'

export default {
  data() {
    return {
      dynamicValidateForm: {
        emails: [
          {
            value: "526928635@qq.com",
          }
        ] ,
           email: ''
      }, 
      iscount:false                           //正在倒计时
    };
  },
  computed:{
   ...mapState( {  
       ValidateForm:state    => state.Taskemail.ValidateForm,    
  }),   
  },
  mounted(){
  //  this.dynamicValidateForm= this.ValidateForm
    this.axios.post('/queryemail').then(res=>{  
       res.data.returnData=  res.data.returnData.map(item=>{
        item.show=false //是否显示 
        item.code='' //验证码
        item.sec =0 //倒计时
         return item
       })
      this.dynamicValidateForm.emails = res.data.returnData 
    })
    console.log(this.dynamicValidateForm);
  },
  methods: {
     ...mapMutations(['setTaskemail' ]),    
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) { 
          var emails = new Array()
          this.dynamicValidateForm.emails.forEach((item,index)=>{
          this.dynamicValidateForm.emails[index].sec=0
            emails.push({email:item.value,verifycode:item.verifycode})
          })
          this.setTaskemail(this.dynamicValidateForm) 
           
          this.axios.post('/updatemail',{emails:JSON.stringify(emails)}).then(res=>{ 
          this.dynamicValidateForm.emails[index].verifycode =res.data.verifycode
    })
          alert("保存成功");
         // this.$router.back(-1)

        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    removeemail(item) {
      var index = this.dynamicValidateForm.emails.indexOf(item);
      if (index !== -1) {
        this.dynamicValidateForm.emails.splice(index, 1);
      }
    },
    verifyemail(formName,index){                                       //验证邮箱
      this.$refs[formName].validate((valid) => {
     if (valid) { 
       if (index !== -1) {
        this.dynamicValidateForm.emails[index].show =true
        this.dynamicValidateForm.emails[index].sec = 60
        var email = this.dynamicValidateForm.emails[index].value  
        var inter = setInterval(()=>{
          if(this.dynamicValidateForm.emails[index].sec  <= 0){
             clearInterval(inter);
             
          }
                
          this.dynamicValidateForm.emails[index].sec--
        },1000)
          this.axios.post('/verifyemail',{email:email}).then(res=>{ 
          this.dynamicValidateForm.emails[index].verifycode =res.data.verifycode
    })
      }
     } else {
       console.log("error submit!!");
       return false;
     }
      });
    
    },
    confirm(index){
      if (index !== -1) {
        var code = this.dynamicValidateForm.emails[index].code  
        var verifycode = this.dynamicValidateForm.emails[index].verifycode 
        
        if(verifycode==code){
          this.dynamicValidateForm.emails[index].show =false
 
        }else{ 
        }        
          console.log(code,verifycode,this.dynamicValidateForm.emails[index].verifycode); 
      }
    },
    addemail() {
      this.dynamicValidateForm.emails.push({
        value: "",
        show:false,//是否显示 
        code:'',//验证码
        sec:0,//倒计时
        key: Date.now(),
      });
    },
  },
};
</script>

<style lang='less' scoped>
.Taskemail {
  .contain {
    width: 60rem; 
    padding: 2rem 0;
    margin: 0 auto; 
    height: auto; 
    max-height: 50rem;
    overflow: auto;
    border: 1px solid lightgray;
    .formitem{
      height: 6rem;
      .code{
        width:5rem;
      }
    }
    .el-input{
      width:13rem; 
    }
    .el-form{  
      columns: 12rem 2;
    }
    .el-form-item{
        margin-bottom: 5px;
    }
  }
  .btn_group {
    width: 50%;
    margin:1rem auto;
    text-align: center;
  }
}
</style>