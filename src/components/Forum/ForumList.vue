<template>
  <section>
    <el-table
      :data="rows"
      style="width: 100%"
      @selection-change="handleSelectionChange">
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
        prop="username"
        max-width="180" align="left">
      </el-table-column>
      <el-table-column
        prop="content"
        label='内容'
        max-width="180" align="left">
      </el-table-column>
      <!--<el-table-column
        prop="commentCount"
        label="跟帖"
        max-width="180" align="left">
      </el-table-column>-->
      <el-table-column max-width='180' label="跟帖" align="left">
        <template scope="scope">
          <el-tooltip class="item" effect="dark" content="查看跟帖" placement="top">
            <el-button size="small" @click="handleForum(scope.row.forumId)" style="background-color: lightgray">{{scope.row.commentCount}}</el-button>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200" align="left">
        <template scope="scope">
          <el-button type="danger" size="small" @click="deleteForum(scope.row.forumId)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-col :span="24" class="toolbar">
      <el-button type="parmary" size="large" style="float:left" :disabled="this.multipleSelection.length===0" @click="deleteTotal">批量删除</el-button>  <!--这里为什么可以直接用this-->
      <el-pagination @current-change="handlePageChange"  :page-size="10" layout="total, prev, pager, next" :total="total" style="float: right">
      </el-pagination>
    </el-col>
    <el-dialog title="跟帖列表" size="large" v-model="forumVisible">
       <commentList :forum_id="forum_id" :show="forumVisible"></commentList>
    </el-dialog>
  </section>
</template>
<script>
  import axios from 'axios'
  import config from '../../api/config'
  import {getTopicList,deleteFollow,deleteTopic,getFollowList} from '../../api/api'
  import commentList from './CommentList.vue'
  axios.defaults.withCredentials = true
  export default{
    data: function () {
      return {
        rows: [],
        multipleSelection:[],
        pagesize:10,
        total:100,
        page:1,
        forum_id:'',
        forumVisible:false,
      }
    },
    components:{
      commentList:commentList
    },

    created: function () {
      var _this = this
      //获得这一页的评论列表
      getTopicList({
        page: 0,
        rows: 10
      }).then(function (res) {
        console.log(res)
        _this.total=res.data.total
        _this.rows = res.data.rows
      })


    },
    methods:{
        //批量删除帖子
      handleSelectionChange: function (val) {
        this.multipleSelection = val;
        console.log(val)
      },
      //删除一个帖子
      deleteForum:function(forumId){
          var _this=this;
        deleteTopic({
          forum_ids:forumId,
        }).then(function(res){
          console.log(res)
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
      }
      ,
      //批量删除帖子
      deleteTotal:function(){
        var _this=this;
        var forumids = this.multipleSelection.map(function (item) {    /* map和forEach的区别*/
          return item.forumId
          console.lgo('forumId')
        }).toString();
        deleteTopic({
          forum_ids:forumids,
        }).then(function(res){
            console.log(res)
          console.log('a')
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
      //分页器
      handlePageChange:function(val){
          this.page=val;
          var _this=this;
        getTopicList({
          page:_this.page,
          rows:this.pagesize,
        }) .then(function(res){
            _this.total=res.data.total
        _this.rows=res.data.rows
        })
      },
      //点击跟帖查看
      handleForum:function(id){
          this.forumVisible=true;
          this.forum_id=id;


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
