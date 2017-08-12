<template>
  <section>
    <el-table
      style="width: 100%"
      :data="rows"
    >
      <el-table-column
        type="index"
        max-width="180" align="left">
      </el-table-column>
      <el-table-column
        label="描述"
        max-width="180" align="left">
        <template scope="scope">
          <router-link :to="{name:'DemocracyUserList',params:{commentId:scope.row.id}}">{{scope.row.titleDesc}}</router-link >
         <!-- <router-link :to="'/DemocracyUserList/'+scope.row.id">{{scope.row.titleDesc}}</router-link >-->
        </template>
      </el-table-column>
      <el-table-column
        label='状态'
        max-width="180" align="left">
        <template scope="scope">
          <el-tag type='danger' v-if="scope.row.isOpen==0">已结束</el-tag>
          <el-tag type='success' v-if="scope.row.isOpen==1">进行中</el-tag>
          <el-tag type='gray' v-if="scope.row.isOpen==2">未开启</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="timeFormat"
        label='时间'
        max-width="180" align="left">
      </el-table-column>

      <el-table-column label="操作" width="200" align="left">
        <template scope="scope">
          <el-button type="primary" size="small" v-if="scope.row.isOpen!=0" @click="modify(scope.row)">修改</el-button>
          <el-button type="success" size="small" v-if="scope.row.isOpen==2" @click="modifyStatus(scope.row)">开启</el-button>
          <el-button type="danger" size="small" v-if="scope.row.isOpen==1" @click="modifyStatus(scope.row)">结束</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-col :span="24" class="toolbar">
      <el-pagination @current-change="handlePageChange"  :page-size="pagesize" layout="total, prev, pager, next" :total="total" style="float: right">
      </el-pagination>
    </el-col>
    <el-dialog title="修改"  size="large" v-model="modifyVisible">
      <updateMessage v-model="updateComment" @updated="updated"></updateMessage>
    </el-dialog>

  </section>
</template>
<script>
  import axios from 'axios'
  import config from '../../api/config'
  import {getCommentList,changeCommentStatus} from '../../api/api'
  import updateMessage from './UpdateComment.vue'
  axios.defaults.withCredentials = true
  export default{
    data: function () {
      return {
        rows: [],
        page: 1,
        pagesize: 10,
        total:100,
        modifyVisible:false,
        updateComment:{}

      }
    },
    created: function () {
      var _this = this
      getCommentList({
        page: 0,
        rows:10
      }).then(function (res) {
        console.log(res)
        _this.rows = res.data.rows
        _this.total=res.data.total

      })
    },
    components:{
      updateMessage:updateMessage
    },
    methods:{
        getData(){
            var _this=this
          getCommentList({
            page: this.page,
            rows:this.pagesize
          }).then(function (res) {
            console.log(res)
            _this.rows = res.data.rows
            _this.total=res.data.total

          })
        },
      handlePageChange:function(val){
          this.page=val
          this.getData();
      },
      modify:function(val){
          console.log(val)
          this.updateComment={titleDesc:val.titleDesc,content:val.content,id:val.id}
          this.modifyVisible=true
      },
      updated:function () {
        this.getData()
      },
      modifyStatus:function(val){
        var _this=this
        changeCommentStatus({
          is_open:val.isOpen,
          comment_id:val.id
        }).then(function(res){
          if(res.data&&res.data.code==1){
            _this.$message({
              message: '操作成功',
              type: 'success'
            });
            _this.getData();
          }
          else{
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
