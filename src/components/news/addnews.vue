<template>
  <el-form :model="newsForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="新闻标题" prop="name">
      <el-input v-model="newsForm.title"></el-input>
    </el-form-item>
    <el-form-item label="新闻作者" prop="author">
      <el-input v-model="newsForm.author"></el-input>
    </el-form-item>
    <el-form-item label="新闻描述" prop="titledesc">
      <el-input type="textarea" v-model="newsForm.titledesc"></el-input>
    </el-form-item>
    <el-form-item label="新闻类型">
      <el-select v-model="newsForm.type" placeholder="请选择类型" style="float:left">
        <el-option v-for="item in newsType" :label="item.text" :key="item.type" :value="item.type"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="新闻图片">
      <crop v-model="newsForm.pic"></crop>
    </el-form-item>
    <el-form-item label="新闻内容">
      <Editor  ref="myTextEditor" :fileName="'myFile'"  v-model="newsForm.content" :uploadUrl="uploadUrl"></Editor><!--这里面的东西有点不知道-->
    </el-form-item>
    <el-form-item style="display: block">
    <el-button type="primary" @click="createNow" style="float:left ;margin-top:150px;">立即创建</el-button>      <!--这个按钮为什么会在上面内容的里面-->
    </el-form-item>
  </el-form>
</template>
<script>

  import axios from 'axios'
  import config from '../../api/config'
  import {allNewsType,saveNews} from '../../api/api'
  import crop from '../common/crop.vue'
  import Editor from '../common/Editor.vue'

  axios.defaults.withCredentials = true
  export default{
    data: function () {
      return {
        newsForm: {
          title:'',
          author:'',
          titledesc:'',
          pic:'',
          type:'',
          content:''
        },
        newsType:[],
        uploadUrl:config.uploadImage,
      }
    },
    components:{
        crop:crop,
      Editor:Editor
    },
    mounted(){
        this.newsType=allNewsType;
    },
    methods:{
        //数据提交
        createNow:function(){
            var  _this=this;
            var data=new FormData();
            for(var p in this.newsForm){
                data.append(p,this.newsForm[p]);
            }
          saveNews(
            data
          ).then(function(res){
              if(res.data&&res.data.code==1){
                _this.$message({
                  message:'创建成功',
                   type:'success'
                })
              }else{
                  _this.$message({
                    message:res.data.msg,
                    type:'error'
                  });
              }
          }).catch(function(){
              _this.$message({
                message:'创建失败',
                type:'error'
              })
          })
        }
    }

  }
</script>
<style>


</style>
