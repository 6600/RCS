<!--
 * @Author: your name
 * @Date: 2020-09-16 21:12:18
 * @LastEditTime: 2020-09-29 23:28:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \VUE-RCS监控\VUE-RCS\src\Page\RegUser.vue
-->
<template>
   <div class="reg-right" v-show="!isLogin">
     <div class="reg-form" > 
         <el-form   :model="ruleForm" :rules="rules"  ref="ruleForm" class="form">
           <p class="reg-p">用户注册</p>
           <el-form-item prop="user">
               <el-input type="text" v-model="ruleForm.user" autocomplete="off" placeholder="请输入用户名"></el-input>
           </el-form-item>
           <el-form-item prop="phone">
               <el-input type="text" v-model="ruleForm.phone" autocomplete="off" placeholder="请输入联系方式"></el-input>
           </el-form-item>
           <el-form-item prop="pass">
               <el-input type="password" v-model="ruleForm.pass" autocomplete="off" placeholder="请输入密码"></el-input>
           </el-form-item>
            <el-form-item prop="checkPass">
               <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" placeholder="请确认密码"></el-input>
           </el-form-item>
           <!-- <el-form-item prop="captcha">
               <el-input type="text" v-model="formData.captcha"  placeholder="captcha" class="w-150"></el-input>
               <img :src="verifyUrl" @click="refreshVerify" class="verify-pos" />
           </el-form-item> -->
           <div class="form-group form-btn">
                <span class="register-new"  @click='reLogin' >返回登录</span>  
               <el-button type="primary" style="width:100%"  
               v-loading.fullscreen.lock="fullscreenLoading"  @click="submitForm('ruleForm')">注册</el-button>
           </div>
         
         </el-form>
     </div>
 </div>
</template>

<script>
import {mapActions,mapMutations}                                     from 'vuex'
import {USER_LOGIN}                                                  from '../store/user.js'
export default {
  name:'RegUser',
  props:['isLogin'],
  data(){                         //elementUI完整的注册验证流程https://blog.csdn.net/weixin_33918357/article/details/93279777?utm_medium=distribute.pc_relevant_t0.none-task-blog-BlogCommendFromMachineLearnPai2-1.edu_weight&depth_1-utm_source=distribute.pc_relevant_t0.none-task-blog-BlogCommendFromMachineLearnPai2-1.edu_weight
   var validateUser = async (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入用户名'))
				} else {
					if (value) {
						const res = await this.axios.post('/checkuser', {
							user: this.ruleForm.user
						})
						console.log(res)
						if (res.data.code == 20000) {
							callback()
						} else {
							return callback(new Error('该用户名已经被注册'))
						}
					}
				}
			}
  
		  // <!--验证密码-->
     var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };

      var validatePhone = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入联系方式'));
        } else {
          callback();
        }
      };
  // <!--二次验证密码-->
     var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
   
    return{
       fullscreenLoading: false,
        ruleForm:{
            user: '',
            pass: '', 
            phone: '',
				  	checkPass: '',
        },
        rules:{
            user:[
                { 
                validator:validateUser,
                minleng:5,maxlength:30,trigger:'blur'}
            ],
            pass:[
                { 
                validator:validatePass,
                maxlength:20,trigger:"blur"}
            ],
            phone:[
                { 
                validator:validatePhone,
                maxlength:40,trigger:"blur"}
            ],
            checkPass:[
                { 
                validator:validatePass2,
                maxlength:20,trigger:'blur'}
            ]
        }, 
        loading:false,
        verifyUrl:''
    }
    },
    created(){
        this.verifyUrl='api/captcha'
    },
    mounted(){
     window.addEventListener('keyup',(e)=>{
         if(e.keyCode===13){
             this.submitForm()
         }
        })
    },
    methods:{
    ...mapMutations([USER_LOGIN]),
    // <!--提交注册-->
      submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) { 
            this.axios.post('/reguser', {
              user: this.ruleForm.user,
              pass: this.ruleForm.pass,
              phone: this.ruleForm.phone
						}).then(res=>{
               if(res.data.code == 20000){  
                 
                 this.fullscreenLoading = true;
                 setTimeout(() => {
                   this.fullscreenLoading = false;
                   this.USER_LOGIN({
                       username: this.ruleForm.username,
                       phone: phone
                     }) 
                   this.$router.replace({path:'/ScrollTaskList'  }) 
                }, 2000);
                
              }else{
                alert(res.data.code,'请重新注册')
              }
            }) 
        } else {
          console.log("error submit!!");
          return false;
        }
      })
    },
    reLogin(){ 
      this.$parent.isLogin=true 
    },
// <!--进入登录页-->
    gotoLogin() {
      this.$router.push({
        path: "/login"
      });
    }
    }
}
</script>

<style lang='less' scoped>
  .reg-right {
    //width: 52%;
    float: right;
    padding: 0 560px 0 0;
    .reg-form {
      top:140px;
      width:270px;
      height: 460px;
      position:absolute;
      border: 1px solid #e5e5e5;
      background-color: #fff;

      border-radius: 5px;
      padding: 0 60px;
      .el-form{
        margin-top:2rem;
      }
      form {
        .pwd-forget, .register-new {
          cursor: pointer;
        }
        .reg-p {
          border-radius: 10px;
          color: #fff;
          background-color: #0B8DD9;
          font-size: 28px;
          font-weight: bold;
          width: 100%;
          text-align: center;
          margin-bottom:2rem;
          //margin-left: 56px;
        }
        .register-new {
          float: right;
          font-size: 12px;
          font-weight: 100;
          padding-bottom: 12px;
          list-style: none;
        }
        .pwd-forget {
          float: left;
          font-size: 12px;
          font-weight:100;
          list-style: none;
        }
        .form-group{
          margin-bottom:1rem;
          label.error{
            position: absolute;
            left: 72px;
            top: 53px;
          }
        }
      }
    }
  }
</style>