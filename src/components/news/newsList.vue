<template>
  <section>
    <el-col :span="24" class="toolbar">
      <el-form align="left" style="height:50px;">
        <el-form-item style="width:200px; display: inline-block">
          <el-select v-model="newstype" placeholder="请选择类型">
            <el-option v-for="item in newsType" :label="item.text" :key="item.type" :value="item.type"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="width:60px; display: inline-block">
          <el-button type="primary" @click="search">查询</el-button>
        </el-form-item>
        <el-form-item style="width:100px;display: inline-block">

            <el-button type="primary" @click="add">新增</el-button>

        </el-form-item>
      </el-form>
    </el-col>
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
        prop="newsId"
        label="ID"
        max-width="180" align="left">
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题"
        max-width="180" align="left">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="发布时间"
        max-width="180" align="left">
      </el-table-column>
      <el-table-column
        label="新闻类别"
        max-width="180" align="left">
        <template scope="scope" >
            {{newsType[scope.row.type].text}}
        </template>
      </el-table-column>

      <el-table-column label="操作" width="300" align="left">
        <template scope="scope">
          <el-button type="info" size="small" @click="edit(scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="deleteNews(scope.row.newsId)">删除</el-button>
          <el-button type="primary" size="small" @click="addCarousel(scope.row)">生成轮播图</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-col :span="24" class="toolbar">
      <el-button type="parmary" size="large" style="float:left" @click="deleteMultiple">批量删除</el-button>
      <el-pagination @current-change="handlePageChange"  :page-size="pagesize" layout="total, prev, pager, next" :total="total" style="float: right">
      </el-pagination>
    </el-col>
    <el-dialog title="编辑"  size="large" v-model="editVisible">
     <editNews v-model="editMessage" @updated="handleUpdatedNews"></editNews>
    </el-dialog>
    <el-dialog title="添加轮播图"  size="large" v-model="addVisible">
      <AddCarousel v-model="addForm"></AddCarousel>
    </el-dialog>
  </section>
</template>
<script>
  import axios from 'axios'
  import config from '../../api/config'
  import {allNewsType, getNewsList,deleteNews} from '../../api/api'
  import editNews from './editNews.vue'
  import AddCarousel from '../carousel/AddCarousel.vue'
  axios.defaults.withCredentials = true
  export default{
    data: function () {
      return {
        newstype:'',                            /*newstype是数字类型的，可是这里为什么写成字符串类型的也可以，否则就初始的就不是请选择类型*/
        newsType:[],
        rows:[],
        total:10,
        page:'',
        pagesize:5 ,
        editMessage:'',
        editVisible:false,
        addVisible:false,
        addForm:{},
        multipleSelection:[]
      }
    },
   components:{
      editNews:editNews,
     AddCarousel:AddCarousel
   },
    created:function(){
        var _this=this;
      getNewsList({
        page:0,
        rows:this.pagesize
      }).then(function(res){
          console.log(res)
        _this.rows=res.data.rows
        _this.total=res.data.total
      })
    },
    mounted:function(){
        this.newsType=allNewsType

    },
    methods:{
        getData(){
            var _this=this;
          getNewsList({
            page:this.page,
            rows:this.pagesize
          }).then(function(res){
            _this.rows=res.data.rows
          })
        },
        handlePageChange:function(val){
            this.page=val;
            this.getData();
        },
      search:function(){
            var _this=this
        getNewsList({
          type:this.newstype,
          page:0,
          rows:this.pagesize,
        }).then(function(res){
          console.log(res)
          _this.total=res.data.total
          _this.rows=res.data.rows
        })
      },
      add:function(){
          this.$router.push('/addnews')
      },
      edit:function(val){
          this.editMessage=val;
          this.editVisible=true
      },
      deleteNews:function(val){
          var _this=this
        deleteNews({
          news_ids:val
        }).then(function(res){
            if(res.data.code==1){
          _this.$message({
            message:res.data.msg,
            type:'success'
          })
            }else{
              _this.$message({
                message:res.data.msg,
                type:'error'
              })
            }
        })
      },
      addCarousel:function(val){
          this.addVisible=true;
          this.addForm={title:val.title,url:val.newsId}
      },
      handleSelectionChange:function(val){
          this.multipleSelection=val;

      },
      deleteMultiple:function(){
        var _this=this
        var newsIds=this.multipleSelection.map(function(item){
          return item.newsId
        }).toString()
        deleteNews({
          news_ids:newsIds
        }).then(function(res){
          if(res.data.code==1){
            _this.$message({
              message:res.data.msg,
              type:'success'
            })
          }else{
            _this.$message({
              message:res.data.msg,
              type:'error'
            })
          }
        })
      },
      handleUpdatedNews:function(){
          this.getData()
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

