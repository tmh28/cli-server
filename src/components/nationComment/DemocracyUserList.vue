<template>
  <section>
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true">
        <el-form-item style="float:left">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.branch"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-col>
    <el-table
      style="width: 100%"
      :data="rows"
    >
      <el-table-column
        type="index"
        max-width="180" align="left">
      </el-table-column>
      <el-table-column
        prop="username"
        label='用户名'
        max-width="180" align="left">
      </el-table-column>
      <el-table-column
        prop="branchName"
        label='党支部名称'
        max-width="180" align="left">
      </el-table-column>

      <el-table-column label="操作" width="200" align="left">
        <template scope="scope">
          <el-button  type="info"  size="small" @click="observe(scope.$index, scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-col :span="24" class="toolbar">
      <el-pagination @current-change="handlePageChange" :page-size="pagesize" layout="total, prev, pager, next" :total="total" style="float: right">
      </el-pagination>
    </el-col>
    <el-dialog  title="个人总结及评论详情"  size="large" v-model="editFormVisible">
      <CommentDetail></CommentDetail>
    </el-dialog>

  </section>
</template>
<script>
  import axios from 'axios'
  import config from '../../api/config'
  import {getDemocracyUserList, getBranchList} from '../../api/api'
  import updateMessage from './UpdateComment.vue'
  import CommentDetail from './CommentDtail.vue'
  axios.defaults.withCredentials = true
  export default{
    data: function () {
      return {
        value: '',
        options: [],
        comment_id:'',
        page:1,
        pagesize:10,
        total:100,
        rows:[],
        editFormVisible:false
      }
    },
    components:{
      CommentDetail:CommentDetail
    },
    created: function () {
      this.comment_id=this.$route.params.commentId;
      var _this = this
      getBranchList({}).then(function (res) {
        if (res.data.code == 1) {
          _this.options = res.data.rows
          console.log(res.data.rows)
          _this.options.unshift({
            id:"",
            branch:"全部",
          })
        }
      }),
      /*  this.getData(item)*/
      getDemocracyUserList({
        comment_id:_this.comment_id,
        branch_id:_this.value,
        page:1,
        rows:10
      }).then(function (res) {

        _this.rows=res.data.rows;
        console.log('a')
        console.log(res.data.rows)
        if (res.data) {
          _this.total = res.data.total;
          _this.tableData = res.data.rows;
        }
      })
    },
    methods:{
      handlePageChange(val){
        this.page = val;
        this.getData();
      },
      observe:function(val1,val2){
        this.editFormVisible=true
      },
        getData(){
            var _this=this
          getDemocracyUserList({
            comment_id:_this.comment_id,
            branch_id:_this.value,
            page:_this.page,
            rows:_this.pagesize
          }).then(function (res) {
            _this.rows=res.data.rows;
            if (res.data) {
              _this.total = res.data.total;
              _this.tableData = res.data.rows;
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

