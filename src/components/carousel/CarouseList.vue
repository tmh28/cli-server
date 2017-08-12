<template>
  <div>
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
        label="缩略图"
        max-width="180" align="left">
        <template scope="scope">
          <div class="small-img"><img :src="scope.row.imgUrl" style="width:100%;height:50px;"></div>
          <!-- <div class='small-img' :style="{backgroundImage: 'url(' + scope.row.imgUrl + ')'}"></div>-->      <!---->
        </template>
      </el-table-column>
      <el-table-column
        prop="priority"
        label="顺序"
        max-width="180" align="left">
      </el-table-column>
      <el-table-column max-width='180' label="状态" align="left">
        <template scope="scope">
          <el-tag size="small" v-if='scope.row.status==1' type="success">启用</el-tag>
          <el-tag size=small  v-if='scope.row.status==0' type="danger">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题"
        max-width="180" align="left">
      </el-table-column>
      <el-table-column label="操作" width="200" align="left">
        <template scope="scope">
          <el-button type="info" size="small" @click="modify(scope.row)">修改</el-button>
          <el-button type="danger" size="small" @click="deleteimg(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-col :span="24" class="toolbar">
      <el-button type="parmary" size="large" style="float:left" @click="addCarousel">添加</el-button>
      <el-button type="parmary" size="large" style="float:left" :disabled="this.multipleSelection.length===0"
                 @click="deleteTotal">批量删除
      </el-button>  <!--这里为什么可以直接用this-->
      <el-pagination @current-change="handlePageChange" :page-size="10" layout="total, prev, pager, next" :total='total'
                     style="float: right">
      </el-pagination>
    </el-col>
    <!--修改的弹出框-->
    <el-dialog title="编辑" size="small" v-model="updateVisible" :visible.sync="updateVisible">
      <UpdateCarousel :form="updateData" @updated="handleUpdated"></UpdateCarousel>
    </el-dialog>
    <el-dialog title="添加轮播图" size="small" v-model="addVisible" :visible.sync="addVisible">
      <AddCarousel></AddCarousel>
    </el-dialog>
  </div>
</template>
<script>
  import axios from 'axios'
  import config from '../../api/config'
  import {getCarouselList, updateCarousel, deleteCarousel} from '../../api/api'
  import UpdateCarousel from './UpdateCarousel'
  import AddCarousel from'./AddCarousel.vue'
  axios.defaults.withCredentials = true
  export default{
    data: function () {
      return {
        rows: [],
        page: 1,
        total: 100,
        pagesize: 10,
        type: 0,
        //修改弹出部分
        updateData: {},
        updateVisible: false,
        multipleSelection: [],
        //第二个上传图片
        dialogImageUrl: '',
        dialogVisible: false,
        //添加弹出部分
        addVisible: false,
      }
    },
    components: {
      'UpdateCarousel': UpdateCarousel,
      'AddCarousel': AddCarousel
    },
    created: function () {
      var _this = this
      getCarouselList({
        page: 0,
        rows: 10,
        type: 0
      }).then(function (res) {
        console.log(res)
        _this.rows = res.data.rows
        _this.total = res.data.total
      })
    },
    methods: {
      getData(){
        var _this = this;
        getCarouselList({page: this.page, rows: this.pagesize, type: this.type})
          .then(function (res) {
            if (res.data && res.data.code == 1) {
              _this.total = res.data.total;
              _this.rows = res.data.rows;
            }
          })
      },
      //单击修改
      modify: function (row) {
        this.updateVisible = true;
       /* this.updateData = Object.assign({},row);  */                 /*  */
        this.updateData = row;
        this.updateData.status += '';                               /*   */
        delete this.updateData.createTime;
      },
      //修改后及时更新
      handleUpdated: function () {
        this.getData();
      },
      //分页
      handlePageChange: function (val) {
        this.page = val
        this.getData()
      },
      //单个删除轮播图
      deleteimg: function (val) {
        var _this = this
        deleteCarousel({
          carousel_ids: val
        }).then(function (res) {
          console.log(res)
          if (res.data.code == 1) {
            _this.$message({
              message: '操作成功',
              type: 'success'
            })
          }
          else {
            _this.$message({
              message: '操作失败',
              type: 'error'
            })
          }
        })
      },
      //批量删除
      handleSelectionChange: function (val) {
        this.multipleSelection = val
      },
      deleteTotal: function () {
        var _this = this
        var ids = this.multipleSelection.map(function (item) {
          return item.id
        }).toString()
        deleteCarousel({
          carousel_ids: ids
        }).then(function (res) {
          if (res.data.code == 1) {
            _this.$message({
              message: '操作成功',
              type: 'success'
            })
          }
          else {
            _this.$message({
              message: '操作失败',
              type: 'error'
            })
          }
        })
      },
      //添加轮播图
      addCarousel: function () {
        this.addVisible = true
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

  .small-img {
    width: 60px;
    height: 50px;
    margin: 5px;
    margin-left: 0px;
    background-size: cover;
  }


</style>

