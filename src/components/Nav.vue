
<template>
  <div>
    <div class="nav-header">
      <div class="img"><img src="../assets/png2.png" alt=""></div>
      <el-dropdown>
      <div class="el-dropdown-link img"><img src="../assets/png1.png" alt="" class="img2"></div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="a" @click.native="dialogpwd=true">密码修改</el-dropdown-item>
          <el-dropdown-item command="b" @click.native="logoff">退出登录</el-dropdown-item>
        </el-dropdown-menu>
        <el-dialog title="修改密码" :visible.sync="dialogpwd" >
          <el-form :model="pwdM"  :rules="rules2"  label-width="100px" class="demo-ruleForm"  :label-position="labelPosition">
            <el-form-item prop="oldpwd">
              <el-input type="password" v-model="pwdM.oldpwd" placeholder="旧密码" class="form-margin"></el-input>
            </el-form-item>
            <el-form-item prop="newpwd">
              <el-input type="password" v-model="pwdM.newpwd" placeholder="新密码" class="form-margin" auto-complete="off"></el-input>
            </el-form-item>
              <el-form-item  prop="surepwd">
                <el-input type='password' v-model="pwdM.surepwd" placeholder="确认密码" class="form-margin"></el-input>
              </el-form-item>
          </el-form>
          <el-button type="primary" @click="sureModify" class="form-button">确认修改</el-button>
        </el-dialog>
      </el-dropdown>
    </div>
  <el-row class="tac block">

  <el-col  class="left">
    <el-menu default-active="2" class="el-menu-vertical-demo" :router="true">
      <el-submenu index="1">
        <template slot="title"><div class="i-message"><i class="el-icon-message"></i>用户管理</div></template>
        <el-menu-item-group>
          <el-menu-item index="/userList">用户列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title"><div class="i-message"><i class="el-icon-message"></i>党员互动</div></template>
        <el-menu-item-group>
          <el-menu-item index="/forumList">帖子列表</el-menu-item>

        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="/CarouselList"><div class="i-message"><i class="el-icon-menu"></i>轮播图列表</div></el-menu-item>
      <el-submenu index="4">
        <template slot="title"><div class="i-message"><i class="el-icon-message"></i>民主评议</div></template>
        <el-menu-item-group>
          <el-menu-item index="/addComment">发起评议</el-menu-item>
          <el-menu-item index="/nationCommentList">评议列表</el-menu-item>

        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title"><div class="i-message"><i class="el-icon-message"></i>心得总结</div></template>
        <el-menu-item-group>
          <el-menu-item index="/impressList">总结列表</el-menu-item>

        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="6">
        <template slot="title"><div class="i-message"><i class="el-icon-message"></i>思想汇报</div></template>
      <el-menu-item-group>
        <el-menu-item index="/reportList">汇报列表</el-menu-item>

      </el-menu-item-group>
    </el-submenu>
      <el-submenu index="7">
        <template slot="title"><div class="i-message"><i class="el-icon-message"></i>新闻管理</div></template>
        <el-menu-item-group>
          <el-menu-item index="/addnews">添加新闻</el-menu-item>
          <el-menu-item index="/newsList">新闻列表</el-menu-item>

        </el-menu-item-group>
      </el-submenu>


    </el-menu>
  </el-col>
    <el-col class="right-block">
      <div class="right">
        <router-view></router-view>
      </div>
    </el-col>
  </el-row>
  </div>
</template>
<script>
  import axios from 'axios'
  import config from '../api/config'
  import {logout, updatePwd} from '../api/api'
  axios.defaults.withCredentials=true
  export default{
    data: function () {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入旧密码'));
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入新密码'));
        }
      };
      var checkAge = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请确认密码'));
        }
      };
      return {
        pwdM: {
          oldpwd: '',
          newpwd: '',
          surepwd: ''
        },
        dialogpwd: false,
        rules2: {
          oldpwd: [
            {validator: validatePass, trigger: 'blur'}
          ],
          newpwd: [
            {validator: validatePass2, trigger: 'blur'}
          ],
          surepwd: [
            {validator: checkAge, trigger: 'blur'}
          ]
        },
        labelPosition:'top'
      }
    },

    methods: {
      //退出登录
      logoff(){
        var _this = this;
        logout({}).then(function (res) {
          if (res.data.code == 1) {
            _this.$router.push('/login')
          }

        })
      },
      sureModify(){
          var _this=this;
        updatePwd({
          oldPwd:this.pwdM.oldpwd,
          newPwd:this.pwdM.newpwd,
        }).then(function(res){
          console.log(res)
          if(res.data.code==1){
            _this.$router.push('/login')
          }
        })
      },

    },
  }

</script>
<style scoped>

  .nav-header{
    width:100%;
    height:60px;
    line-height: 60px;
    background-color: rgb(32,160,255);
    display: flex;
    justify-content: space-between;
    align-content: center;
  }
  .nav-header .img{
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .nav-header img{
    padding:5px;
    height:50px;
    display: inline-block;
  }
  .img2{
    border-radius: 50%;
  }
  .i-message{
    float:left
  }
  .right{
    margin:20px;
  }
  .block{
    display: flex;
    height:100%;
  }
  .left{
    width:200px;
    height:100%
  }
  .right-block{
    flex: 1;
  }
  .left{
    height:1000px;
    background-color: rgb(238,241,246);
  }

</style>
