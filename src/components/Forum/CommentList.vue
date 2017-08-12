
<template>
  <section>
    <el-table
      :data="rows"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        max-width="180" align="left"
       >
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
        prop="comment"
        label='内容'
        max-width="180" align="left">
      </el-table-column>
      <el-table-column label="操作" width="200" align="left">
        <template scope="scope">
          <el-button type="danger" size="small" @click="forumdelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-col :span="24" class="toolbar">
      <el-button type="parmary" size="large" style="float:left" @click="" :disabled="this.multipleSelection.length===0" @click="deleteTotal">批量删除</el-button>  <!--这里为什么可以直接用this-->
      <el-pagination :page-size="10" layout="total, prev, pager, next" :total='total' style="float: right"  @current-change="handlePageChange">
      </el-pagination>
    </el-col>
  </section>
</template>
<script>
  import axios from 'axios'
  import config from '../../api/config'
  import {getFollowList, deleteFollow} from '../../api/api'
  axios.defaults.withCredentials = true
export default{
  props:{
    forum_id:{
        type:String
    },
    show:{
      type:Boolean,
      default:false
    }
  },
 data:function(){
     return {
       rows:[],
       page:1,
       pagesize:10,
       total:0,
       comment_ids:'',
       multipleSelection:[]
     }
 },
 created:function(){
     var _this=this
   getFollowList({
     page:0,
     rows:10,
     forum_id:this.forum_id,
   }).then(function(res){
       _this.total=res.data.total
       _this.rows=res.data.rows
   })
 },
  methods:{
    handlePageChange(val) {
      this.page=val
      var _this=this
      getFollowList({page: _this.page, rows: _this.pagesize,forum_id:_this.forum_id}).then(function (res) {
        if (res.data.code==1) {
          _this.total = res.data.total;
          console.log(_this.total);
          _this.rows = res.data.rows;
        }
      })
    },
    //删除帖子
    forumdelete(val){
        this.comment_ids=val
      var _this=this
      deleteFollow(
          {
            comment_ids:val
          }
          ).then(function(res){
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
    handleSelectionChange: function (val) {
      this.multipleSelection = val;
      console.log(val)
    },
    //批量删除
    deleteTotal(){
        var _this=this;
        var ids=this.multipleSelection.map(function(item){
            return item.id
        }).toString();
      deleteFollow(
        {
          comment_ids:ids
        }
      ).then(function(res){
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

  },
  watch:{
    show(a){
      if(a){
        this.page=1;
        this.total=0;
        var _this=this
        getFollowList({
          page: _this.page,
          rows: _this.pagesize,
          forum_id:_this.forum_id
        }).then(function(response){
          _this.total=response.data.total
          console.log(response)
          _this.rows=response.data.rows
        })
      }
    }
  }

}
</script>
<style>

</style>
