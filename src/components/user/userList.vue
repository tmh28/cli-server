<template>
  <section>
    <el-col :span="24" class="toolbar">
    <el-form align="left" style="height:50px;">
      <el-form-item style="width:200px; display: inline-block">
        <el-input type="text" v-model="inputword"></el-input>
      </el-form-item>
      <el-form-item  style="width:60px; display: inline-block">
        <el-button type="primary" @click="searchMessage" :loading="searchloading">查询</el-button>
      </el-form-item>
      <el-form-item  style="width:100px;display: inline-block">
        <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-change="importExcel" :file-list="fileList3">
        <el-button type="primary">导入用户</el-button>
        </el-upload>
      </el-form-item>
    </el-form>
    </el-col>
  <el-table
    :data="rows"
    style="width: 100%"
    @selection-change="handleSelectionChange" v-loading="listLoading">
    <el-table-column
      type="selection"
      max-width="180" align="left">
    </el-table-column>
    <el-table-column
      type="index"
      max-width="180" align="left">
    </el-table-column>
    <el-table-column
      label="用户名"
      max-width="180" align="left">
      <template scope="scope">
      <a href="" @click.prevent="handleInfo(scope.row)">{{scope.row.username}}</a>
      </template>
    </el-table-column>
    <el-table-column
      prop="idCard"
      label="证件"
      max-width="180" align="left">
    </el-table-column>
    <el-table-column
      prop="phone"
      label="电话"
      max-width="180" align="left">
    </el-table-column>
    <el-table-column  max-width='180' label="积分" align="left">
      <template scope="scope">
        <el-tooltip class="item" effect="dark" content="查看积分" placement="top">
        <el-button size="small" @click.native="handleIntegral(scope.row.id)" style="background-color: lightgray">{{scope.row.totalScore}}</el-button>
        </el-tooltip>
      </template>
    </el-table-column>
    <el-table-column label="操作" width="200" align="left">
      <template scope="scope">
        <el-button type="info" size="small" v-if="scope.row.disabled==1" @click="handleEdit(scope.row,0)">启用</el-button>
        <el-button  type="danger" size="small" v-if="scope.row.disabled==0" @click="handleEdit(scope.row,1)">禁用</el-button>
        <el-button type="primary" size="small" @click="resetPsd(scope.row.id)">密码重置</el-button>
      </template>
    </el-table-column>
  </el-table>
    <el-col :span="24" class="toolbar">
    <el-button type="parmary" size="large" style="float:left" :disabled="this.multipleSelection.length===0" @click="resetTotal">批量重置密码</el-button>  <!--这里为什么可以直接用this-->
    <el-pagination @current-change="handlePageChange"  :page-size="10" layout="total, prev, pager, next" :total="total" style="float: right">
    </el-pagination>
    </el-col>
    <el-dialog title="积分列表" v-model="userIntegralVisible" :visible.sync="userIntegralVisible" size="large">
      <integralList :userid="userid" :show="userIntegralVisible"></integralList>
    </el-dialog>
    <el-dialog title="用户信息" v-model="userInfoVisible"  size="large">
      <userInfo :Info="Info" ></userInfo>
    </el-dialog>
  </section>
</template>
<script>
  import axios from 'axios'
  import config from '../../api/config'
  import {getUserList,getintegralList,setUserState,resetUserPwd,importUsers} from '../../api/api'
  import IntegralList from './integralList.vue'
  import userInfo from './userInfo.vue'
  axios.defaults.withCredentials=true
  export default{
    data: function () {
      return {
        page:1,
        rows: [],
        pagesize: 10,
        total:100,
        code:'',
        msg:'',
        multipleSelection:[],
        userIntegralVisible: false,   //判断点击查看积分
        userid:'' , //所点击的那行的id
        inputword:'',
        searchLoading:false,
        fileList3:[],   //导入用户
        userInfoVisible:false,
        Info:{},
        searchloading:false,
        listLoading:false
      }
    },
    components:{
      integralList:IntegralList,
      userInfo:userInfo
    },
    created: function () {
      var _this = this;
      //获得用户列表
      getUserList({
        page: 1,
        rows: 10
      }).then(function (response) {
        _this.total=response.data.total
        console.log(response.data.rows)
        _this.rows = response.data.rows
      })

    },
    methods: {
        //分页器
      handlePageChange(val) {
        this.page=val
        var _this=this
        getUserList({
          page:_this.page,
          rows:_this.pagesize
        }).then(function (res) {
          _this.rows = res.data.rows
        })
      },
      //密码重置
      resetPsd:function(userId){
          var _this=this
        resetUserPwd({
          userIds:userId,
        }).then(function(res){
          if(res.data.code==1){
            _this.$message({
              message:'操作成功',
              type:'success'
            })
          }
          else{
            _this.$message({
              message:'操作失败',
              type:'error'
            })
          }
        })
      },
      //禁用或启用用户
      handleEdit(row,status){
        console.log(row);
        var _this = this;
        console.log(row.id);
        setUserState({
          user_id: row.id,
          disabled: status
        }).then(function (response) {
          console.log(response);
          row.disabled=status;
          console.log(row.disabled)
          if (response.data.code == 1) {
            _this.$message({
              message:response.data.msg ,
              type: 'success'
            });
          } else {
            _this.$message({
              message:response.data.msg ,
              type: 'warning'
            });
          }
        })
      },
      handleSelectionChange: function (val) {
        this.multipleSelection = val;
        console.log(val)
      },
      //批量修改密码
      resetTotal:function(){
          var _this=this;
        var ids = this.multipleSelection.map(function (item) {    /* map和forEach的区别*/
          return item.id
        }).toString();
        resetUserPwd({
          userIds:ids,
        }).then(function(res){
          if(res.data.code==1){
            _this.$message({
              message:'操作成功',
              type:'success'
            })
          }
          else{
            _this.$message({
              message:'操作失败',
              type:'error'
            })
          }

        })
      },
      //点击查看积分
      handleIntegral:function(rowid){
        this.userIntegralVisible=true;
        this.userid=rowid;
      },
      getData(){
        this.listLoading = true;
        this.searchLoading= true;
        var self = this;
        getUserList({
          page: this.page,
          rows: this.pagesize,
          keyword:this.inputword
        }).then(function (res) {
          self.listLoading = false;
          self.searchLoading=false;
          if (res.data&&res.data.code==1) {
            self.total = res.data.total;
            self.rows = res.data.rows;
          }
        })
      },
      //查询
      searchMessage:function(){
         this.getData();
      },
      //批量导入用户
      importExcel(){
        importUsers({
          myFile:this.fileList3
        }).then(function(res){
        console.log(res)
        })
      },
      //用户信息
      handleInfo(rowInfo){
          this.userInfoVisible=true;
          this.Info=Object.assign({},rowInfo)
      }
    },
  }


</script>
<style>
.toolbar{
  padding:10px ;
  margin-top:10px;
  background-color: lightgray;
}
</style>

