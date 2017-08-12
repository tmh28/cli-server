
<template>
  <el-form :model="rows" label-width="100px" class="demo-ruleForm">
    <el-form-item label="新闻标题">
      <el-input v-model="rows.title"></el-input>
    </el-form-item>
    <el-form-item label="新闻作者">
      <el-input v-model="rows.author"></el-input>
    </el-form-item>
    <el-form-item label="新闻描述">
      <el-input type="textarea" v-model="rows.titledesc"></el-input>
    </el-form-item>
    <el-form-item label="新闻类型">
      <el-select v-model="rows.type" placeholder="请选择类型" style="float:left">
        <el-option v-for="item in newsType" :label="item.text" :key="item.type" :value="item.type"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="新闻图片">
      <crop v-model="rows.pic"></crop>
    </el-form-item>
    <el-form-item label="新闻内容">
      <Editor  ref="myTextEditor" :fileName="'myFile'"  v-model="rows.content" :uploadUrl="uploadUrl"></Editor><!--这里面的东西有点不知道-->
    </el-form-item>
    <el-form-item style="display: block">
      <el-button type="primary" @click="createNow" style="float:left ;margin-top:150px;">立即修改</el-button>      <!--这个按钮为什么会在上面内容的里面-->
    </el-form-item>
  </el-form>
</template>
<script>

  import axios from 'axios'
  import config from '../../api/config'
  import {allNewsType,updateNews,getNewsInfo} from '../../api/api'
  import crop from '../common/crop.vue'
  import Editor from '../common/Editor.vue'
  axios.defaults.withCredentials = true
  export default{
    props:{
      value:{
          type:Object,
      }
    },
    data: function () {
      return {
          rows:[],//
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
   /* computed: {
      editor() {
        return this.$refs.myTextEditor.quillEditor;
      }
    },*/
    created:function(){
      this.rows=this.value
      console.log(this.rows)

    },
    methods:{
      //数据提交
      createNow:function(){
        var  _this=this;
        var data=new FormData();
          data.append('title',this.rows.title)
          data.append('author',this.rows.author)
          data.append('titledesc',this.rows.titledesc)
          data.append('type',this.rows.type)
          data.append('pic',this.rows.pic)
          data.append('content',this.rows.content)
          data.append('newsId',this.rows.newsId)

        updateNews(
          data
        ).then(function(res){
            console.log(res)
          if(res.data&&res.data.code==1){
            _this.$message({
              message:res.data.msg,
              type:'success'
            })
            _this.$emit('updated');
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
    },
    watch:{
        'value':function(n,o){
            this.rows=n;
        }
    }


  }
</script>
<style>


</style>
