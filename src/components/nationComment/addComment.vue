<template>
  <el-row>
    <el-col :span="24">
      <el-form label-width="80px">
        <el-form-item label="描述">
          <el-input v-model="form.titleDesc"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <Editor ref="myTextEditor" :fileName="'myFile'" v-model="form.content" :uploadUrl="uploadUrl"></Editor>
        </el-form-item>
        <el-form-item style="display: block">
          <el-button type="primary" style="float:left ;margin-top:150px;" @click="add">添加</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>
<script>
  import Editor from '../common/Editor.vue'
  import { addComment} from '../../api/api'
  import config from '../../api/config'

  export default{
    data: function () {
      return {
        form: {
            titleDesc:'',
          content:''
        },
        uploadUrl: config.uploadImage,
      }
    },
    components: {
      Editor: Editor
    },
    watch: {
      'value': function (n, o) {
        this.form = n;
      }
    },
    methods: {
      add: function () {
        var _this = this
        /*var data=new FormData()
        for(var p in this.form){
          data.append(p,this.form[p]);
        }*/
        addComment(
          {
            titleDesc:this.form.titleDesc,
            content:this.form.content
          }
        ).then(function (res) {
          if (res.data.code == 1) {
            _this.$message({
              message: '添加成功',
              type: 'success'
            });
          }
          else {
            _this.$message({
              message: res.data.msg,
              type: 'error'
            });
          }
        }).catch(function () {
          _this.$message({
            message: '添加失败',
            type:'error'
          });
        })
      }
    }


  }
</script>

