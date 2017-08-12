<template>
  <section>
  <el-table
    :data="rows"
    style="width: 100%">
    <el-table-column
      type="selection"
      max-width="180" align="left">
    </el-table-column>
    <el-table-column
      type="index"
      max-width="180" align="left">
    </el-table-column>
    <el-table-column
      prop="username"
      label="用户名"
      max-width="180" align="left">
    </el-table-column>
    <el-table-column
      prop="typeName"
      label="积分途径"
      max-width="180" align="left">
    </el-table-column>
    <el-table-column  max-width='180' label="增量" align="left">
      <template scope="scope">
          <el-button size="small" >{{scope.row.singleDesc}}</el-button>
      </template>
    </el-table-column>
    <el-table-column
      prop="timeFormat"
      label="时间"
      max-width="180" align="left">
    </el-table-column>
  </el-table>
    <el-pagination
      @current-change="handlePageChange"
      :page-size="pagesize"
      layout="total, prev, pager, next"
      :total="total" style="float: right">
    </el-pagination>
  </section>
</template>
<script>
  import axios from 'axios'
  import config from '../../api/config'
  import {getintegralList} from '../../api/api'

  export default{
    props:{
      userid:{
        type:Number,
      },
      show:{
        type:Boolean,
        default:false
      }
    },
    data: function () {
      return {
        rows: [],
        page:1,
        pagesize:10,
        total:0,
      }
    },
    created: function () {
        var _this=this
      console.log(_this.userid)
      getintegralList({
        page: _this.page,
        rows: _this.pagesize,
        user_id:_this.userid
      }).then(function(response){
        _this.total=response.data.total
        console.log(response)
        _this.rows=response.data.rows
      })

    },
    methods:{
      handlePageChange(val) {
        this.page=val
        var _this=this
        getintegralList({page: _this.page, rows: _this.pagesize,user_id:_this.userid}).then(function (res) {
          if (res.data.code==1) {
            _this.total = res.data.total;
            console.log(_this.total);
            _this.rows = res.data.rows;
          }
        })
      },

    },
    watch:{
      show(a){
        if(a){
          this.page=1;
          this.total=0;
          var _this=this
          getintegralList({
            page: _this.page,
            rows: _this.pagesize,
            user_id:_this.userid
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


