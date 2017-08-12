<!--

<template>
<div class="login">
  <div class="login-header"><div class="login-img"><img src="../assets/png2.png"></div></div>
  <div class="system">系统登录</div>
    <el-form  label-width="80px"   :model="user" :rules="rules2" ref="user">
<div class="form-margin">
  <el-form-item label="账号" prop="username">
        <el-input v-model="user.username"  class="a"></el-input>
  </el-form-item>
</div>
      <div class="form-margin">
        <el-form-item label="密码" prop="password">
        <el-input v-model="user.password" type="password" ></el-input>
        </el-form-item>
      </div>
      <div class="form-margin">
        <el-col :span="16">
          <el-form-item label="验证码" prop="checkcode">
          <el-input v-model="user.checkcode" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <div class="img-margin"><img :src="src" style="width: 100%;height:36px;" @click="imgChange"></div>
        </el-col>

      </div>

      <div class="login-button"><el-button type="primary" @click="sureLogin" class="form-button">登录</el-button></div>

    </el-form>

</div>
</template>
<script>
  import axios from 'axios'
  import config from '../api/config'
  import {login} from '../api/api'
  axios.defaults.withCredentials=true
  var user1 = (rule, value, callback) => {
    if (value === '') {
      callback(new Error('请输入账号'));
    } else {
      if (this.user.username !== '') {
        this.$refs.user.validateField('username');
      }
      callback();
    }
  };
  var password1 = (rule, value, callback) => {
    if (value === '') {
      callback(new Error('请输入密码'));
    } else {
      if (this.user.password !== '') {
        this.$refs.user.validateField('password');
      }
      callback();
    }
  };
  var checkcode1 = (rule, value, callback) => {
    if (value === '') {
      callback(new Error('请输入验证码'));
    } else {
      if (this.user.checkcode !== '') {
        this.$refs.user.validateField('checkcode');
      }
      callback();
    }
  };
  export default{
    data: function () {
      return {
          user:{
            username: '',
            password: '',
            checkcode: ''
          }
        ,
        src:config.checkCode+'?'+Date.now(),
        rules2: {
          username: [
            {validator: username1, trigger: 'blur'}
          ],
          password: [
            {validator: password1, trigger: 'blur'}
          ],
          checkcode: [
            {validator: checkcode1, trigger: 'blur'}
          ]
        }
      }

    },
    methods: {
      imgChange: function () {
        this.src=config.checkCode+'?'+Date.now()
      },
      sureLogin: function () {
        var _this=this;
        console.log(_this.user)
        login(_this.user).then(function(response){
           if(response.data.code==1){
             _this.$router.push('/Nav')
           }
                console.log(response)
        })

      }
    }

  }










</script>
<style>
  el-input {
    margin-top: 10px;
    margin-bottom: 10px;

  }


.login{
  width:400px;
  height:400px;
/*  background-color: lightblue;*/
  position: fixed;
  top:0;
  bottom:0;
  right:0;
  left:0;
  margin:auto;
  border: 1px solid lightgray;
}
  .login-header{
    background-color: rgb(32,160,255);
  }
  .login-img{
    display: flex;
    justify-content:left;
    align-content: center;
  }
  .login-img img{
    height:50px;
    margin:10px;
  }
  .form-margin{
    margin-left:10px;
    margin-right:10px;
  }
  .img-margin{
    margin-left:20px
  }
  .login-button{
    width:400px;
    padding:0px;

  }
  .system{
    text-align: center;
    margin:20px;

  }
  .form-button{
    width:90%;
    margin-top:20px
  }
  .red-text {
    text-align: left;
    color:red;
    font-size:14px;
  }


</style>
-->

<template>
  <div class="login">
    <div class="login-header"><div class="login-img"><img src="../assets/png2.png"></div></div>
    <div class="system">系统登录</div>

  <el-form :model="ruleForm2"  :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
    <el-form-item prop="username">

      <el-input type="text" v-model="ruleForm2.username" placeholder="账号" class="form-margin"></el-input>

    </el-form-item>

    <el-form-item prop="password">
      <el-input type="password" v-model="ruleForm2.password" placeholder="密码" class="form-margin" auto-complete="off"></el-input>
    </el-form-item>
    <el-col :span="16">
    <el-form-item  prop="checkcode">
      <el-input v-model="ruleForm2.checkcode" placeholder="验证码" class="form-margin"></el-input>
    </el-form-item>
    </el-col>
    <el-col :span="8">
    <div class="imgChange"><img :src="src" style="width: 100%;height:36px;" @click="imgChange" ></div>
    </el-col>
    <el-button type="primary" @click="sureLogin" class="form-button">登录</el-button>
  </el-form>
  </div>
</template>

<script>

  import axios from 'axios'
  import config from '../api/config'
  import {login} from '../api/api'
  axios.defaults.withCredentials=true

  export default{
    data: function () {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入账号'));
        } /*else {
          if (this.ruleForm2.username!== '') {
            this.$refs.ruleForm2.validateField('username');
          }
          callback();
        }*/
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        }/* else {
          if (this.ruleForm2.password !== '') {
            this.$refs.ruleForm2.validateField('password');
          }
          callback();
        }*/
      };
      var checkAge = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入验证码'));
        } /*else {
          if (this.ruleForm2.checkcode !== '') {
            this.$refs.ruleForm2.validateField('checkcode');
          }
          callback();
        }*/
      };

      return {
       ruleForm2:{
         username:'',
         password:'',
         checkcode:''
       }
        ,
        rules2: {
          username: [
            { validator: validatePass, trigger: 'blur' }
          ],
          password: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          checkcode: [
            { validator: checkAge, trigger: 'blur' }
          ]
        },
        src:config.checkCode+'?'+Date.now(),

      }
    },
    methods: {
      imgChange: function () {
        this.src=config.checkCode+'?'+Date.now()
      },
      sureLogin: function () {
        var _this=this;
        console.log(_this.ruleForm2)
        login(_this.ruleForm2).then(function(response){

          if(response.data.code==1){
            _this.$router.push('/Nav')
          }
          console.log(response)

        })

      }
    }

  }

</script>

<style>
  *{
    margin:0;
    padding:0;
  }
  el-input {
    margin-top: 10px;
    margin-bottom: 10px;

  }


  .login{
    width:400px;
    height:400px;
    position: fixed;
    top:0;
    bottom:0;
    right:0;
    left:0;
    margin:auto;
    border: 1px solid lightgray;
  }
  .login-header{
    background-color: rgb(32,160,255);
  }
  .login-img{
    display: flex;
    justify-content:left;
    align-content: center;
  }
  .login-img img{
    height:50px;
    margin:10px;
  }

  .system{
    text-align: center;
    margin:20px;

  }
  .form-button{
    width:90%;
    margin-top:20px
  }


  .imgChange{
    width:80px;
  }
  .form-margin{
    margin-left:-100px;
  }

</style>



