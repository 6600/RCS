<template>
<div class="login-page main-container">
    <div class="header">
        <div class="inner-wrapper">
            <h1 class="logo"><img src="../../static/img/logo/logo-3.png"></h1>
        </div>
    </div>
    <div class="body">
        <div class="login-body login-body-hook">
            <div class="login-left">
                <h1>AGV运行系统</h1> 
                <div class="login-img">
                    <img src="../../static/img/login-img.png" alt="">
                </div>
            </div>
            <div class="login-right" v-show="isLogin">
                <div class="login-form">
                    <el-form  :rules="rules" :model="ruleForm1" ref="ruleForm1" class="form">
                        <p class="login-p">用户登录</p>
                        <el-form-item prop="username">
                            <el-input type="text" v-model="ruleForm1.username"  placeholder="请输入用户名"></el-input>
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input type="password" v-model="ruleForm1.password"  placeholder="请输入密码"></el-input>
                        </el-form-item>
                        <!-- <el-form-item prop="captcha">
                            <el-input type="text" v-model="formData.captcha"  placeholder="captcha" class="w-150"></el-input>
                            <img :src="verifyUrl" @click="refreshVerify" class="verify-pos" />
                        </el-form-item> -->
                        <div class="form-group form-btn">
                            <el-button type="primary" style="width:100%" v-loading="loading" @click.native.prevent="handleSubmit('ruleForm1')">登陆</el-button>
                        </div>
                        <a class="pwd-forget" href="" >忘记密码？</a>
                        <a class="register-new" href="#" @click='toReg' >注册新用户</a> 
                    </el-form>
                </div>
            </div>
            <div class='Reguser'>
             <RegUser v-on:router="routerTo" :isLogin.sync='isLogin'></RegUser>   </div>
        </div>
    </div>
    <div class="footer">
        <div class="inner-wrapper">
           &copy;鹏鼎控股版权所有
        </div>
    </div>
</div>
</template>

<script>
import {mapActions,mapMutations}                                     from 'vuex'
import {USER_LOGIN}                                                  from '../store/user.js'
import RegUser                                                       from './RegUser'
import axios from 'axios'
export default {
    components:{
      RegUser
    }, 
    data(){
        var validateUser = async (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入用户名'))
				} else {
					if (value) {
            console.log(this.SuperAdmin.user)
           if(value!=this.SuperAdmin.user){ 
         	  	const res = await this.axios.post('/checkuser', {
							user: this.ruleForm1.username
					   })
					   console.log('返回结果',res)
					   if (res.data.code == 20000) {
					   	callback(new Error('不存在此用户'))
					   } else {
							return callback()
					  	}
            } 
					}
				}
      };
      	  // <!--验证密码-->
     var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
        //  if (this.ruleForm1.password !== '') {
        //    this.$refs.ruleForm1.validateField('password');
        //  }
          callback();
        }
      };
        return{
            ruleForm1:{
                username:'',
                password:'', 
            },
            rules:{
                username:[
                    {validator:validateUser, maxlength:30,trigger:'blur'}
                ],
                password:[
                    {validator:validatePass,
                    maxlength:20,trigger:"blur"}
                ] 
            },
            SuperAdmin:{
              user:'Administrator',
              pass:'admin'
            },
            isLogin:true,
            loading:false,
            verifyUrl:''
        }
    },
    methods:{
        ...mapMutations([USER_LOGIN]),
    toReg(){
      this.isLogin = false
    },
      handleSubmit(formName){                 
            this.loading=true  
            this.USER_LOGIN(this.ruleForm1.username) 
           this.$refs[formName].validate(valid => {
             let user = this.ruleForm1.username
             let pass = this.ruleForm1.password
             console.log("Administrator",'admin',user,pass)
             if (valid) { 
               console.log(user,pass,user==this.SuperAdmin.user&&pass==this.SuperAdmin.pass)
             if(user==this.SuperAdmin.user&&pass==this.SuperAdmin.pass){
                this.$router.push({path:'/ScrollTaskList' })   

             }else{
                 axios.post("/login",{
                 user:user,
                 pass:pass
                 }).then((res)=>{
                 if(res.data.ok== true){
                     
                  this.loading=false
                  this.$message({
                      message:res.data.msg,
                      type:'success'
                  }) 
                   
                    this.$router.push({path:'/ScrollTaskList' })  
                       this.goTohome()       //???vue axios中this.$router.push不起作用路径前不加/
                 }else{
                     this.$message({
                         message:res.data.msg,
                         type:'error'
                     });
                     this.loading=false
                 }
             }).bind(this)
             }
           
             } else {
          console.log("error submit!!");
          this.loading=false
          return false;
        }})
        },
      goTohome(){ 
       //父页面路由用Replace?
       //this.$router.push({path:'/DispatchMonitor'}) 
 
      },
      routerTo(){ 
      //  this.$router.push({name:'DispatchMonitor'})   
      },
         
    },
     
    mounted(){
      this.routerTo()
        window.addEventListener('keyup',(e)=>{
            if(e.keyCode===13){
                this.handleSubmit()
            }
        })
    },
}
</script>

<style lang="less">
@import "../assets/less/base.less";
.header{
    width:100px;
    height: 70px;
 
    img{
        width:8rem;
        height: auto;
        top:30px;
        left: 30px;
        position: absolute;
    }
}
.Reguser{
  height: auto;
}
.login-body {
  margin: 0 auto;
  width: 100%;
  height: 80%;
  .login-left {
    top:80px;
    position: absolute;
    width: 53%;
    float: left;
    padding-left: 160px;
    h1 {
      color: #0B8DD9;
      font-weight: bold;
      font-size: 36px;
      line-height: 20px;
      &.left30 {
        margin-left: 165px;
      }
    }
    .login-img{
      margin-top: 34px;
      img{
        border-radius: 3px;
      }
    }
  }
  .login-right {
    //width: 52%;
    float: right;
    padding: 0 560px 0 0;
    .login-form {
      top:140px;
      width:270px;
      height: 350px;
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
        .login-p {
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
}
.footer{
    bottom:0;
    position: absolute;
    background-color:#f0efef;
    width: 100%;
    height: 19%;
    left: 0;
    .inner-wrapper{
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        text-align: center;
        margin:0 auto;
        font-size: 10px;
        font-weight: 100; 
        padding-top: 30px;
    }
}
</style>
