<template>
  <section>
    <el-table
      :data="rows"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
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
        max-width="180" align="left"
        prop="username">
      </el-table-column>

      <el-table-column max-width='180' label="状态" align="left">
        <template scope="scope">
          <el-tag size="small" type="success" v-if="scope.row.type==1">通过</el-tag>
          <el-tag size=small  type="gray" v-if="scope.row.type==0">未审核</el-tag>
          <el-tag size=small  type="danger" v-if="scope.row.type==2">未通过</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="时间"
        max-width="180" align="left"
      >
      </el-table-column>
      <el-table-column
        label="理由"
        max-width="180" align="left"
        prop="reason">
      </el-table-column>
      <el-table-column label="操作" width="200" align="left">
        <template scope="scope">
          <el-button type="info" size="small" @click="check(scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-col :span="24" class="toolbar">
      <el-button type="parmary" size="large" style="float:left" :disabled="this.multipleSelection.length===0" @click="checkTotal">批量审核</el-button>  <!--这里为什么可以直接用this-->
      <el-pagination @current-change="handlePageChange" :page-size="10" layout="total, prev, pager, next" :total='total'
                     style="float: right">
      </el-pagination>
    </el-col>
    <el-dialog title="审核" v-model="ImpressVisible" size="large">
      <impress v-model="form" @updateList="update"></impress>
    </el-dialog>
    <el-dialog title="批量审核" v-model="checkVisible" size="large">
      <el-col :span="24" >
        <el-form >
          <el-form-item>
            <el-radio-group v-model="State">
              <el-radio label="1">通过</el-radio>
              <el-radio label="0" >不通过</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item :span="20">
            <el-input  autosize  placeholder="请输入理由" type="textarea" v-model="Reason"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="info" @click.native="handleCheckTotal ">批量审核</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-dialog>
  </section>
</template>
<script>
  import axios from 'axios'
  import config from '../../api/config'
  import {getImpressList,checkImpress} from '../../api/api'
  import impress from './ImpressReview.vue'
  axios.defaults.withCredentials = true
  export default{
    data: function () {
      return {
        rows: [],
        page:1,
        total:100,
        pagesize:10,
        ImpressVisible:false,
        form:{
           picList:[],
           reason:'',
           id:''
        },
        multipleSelection:[],
        checkVisible:false,
        State:'',
        Reason:'',
        ReportIds:[]
      }
    },
    components:{
      impress:impress
    },
    created: function () {
      var _this = this
      getImpressList({
        page: 1,
        rows: 10
      }).then(function (res) {
        _this.rows = res.data.rows
      })
    },
    methods:{
        getData(){
          var _this=this
          getImpressList({
            page:this.page,
            rows:this.pagesize
          }).then(function (res) {
            _this.rows = res.data.rows
            _this.total=res.data.total
          })
        },
      handlePageChange:function(val){
        this.page=val
        this.getData();
      },
      //查看
      check:function(val){
        this.ImpressVisible=true
       /* this.form.picList=val.picList        不能这样写
        this.form.id=val.id*/
        this.form={
            picList:val.picList,
            reason:this.Reason,
            id:val.id}
      },
      //查看里提交后及时更新
      update:function(){
          this.getData();
      },
      //批量审核
      handleSelectionChange:function(val){
        this.multipleSelection=val
        this.ReportIds=this.multipleSelection.map(function (item) {
          return item.id;
        })
      },
      checkTotal:function(){
        this.checkVisible=true
      },
      handleCheckTotal:function(){
        var _this=this
        checkImpress({
          accept:this.State,
          reason:this.Reason,
          arr:this.ReportIds
        }).then(function(res){
          if(res.data.code){
            _this.$message({
              message: res.data.msg,
              type: 'success'
            });
           _this.getData();
          }else{
            _this.$message({
              message: res.data.msg,
              type: 'error'
            });
          }
        })
      }
    }
  }
</script>
<style>
  .toolbar {
    padding: 10px;
    margin-top: 10px;
    background-color: lightgray;
  }
</style>

