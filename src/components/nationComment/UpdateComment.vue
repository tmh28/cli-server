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
          <el-button type="primary" style="float:left ;margin-top:150px;" @click="preserve">保存</el-button>
          <!--这个按钮为什么会在上面内容的里面-->
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>
<script>
  import Editor from '../common/Editor.vue'
  import {updateComment} from '../../api/api'
  import config from '../../api/config'

  export default{
    props: {
      value: {
        type: Object
      }
    },
    data: function () {
      return {
        form: {},
        uploadUrl: config.uploadImage,
      }
    },
    components: {
      Editor: Editor
    },
    created: function () {
      console.log(this.value)
      this.form = this.value
    },

    watch: {
      'value': function (n, o) {
        this.form = n;
      }
    },
    methods: {
      preserve: function () {
        var _this = this
        var data=new FormData()
        for(var p in this.form){
          data.append(p,this.form[p]);
        }
        updateComment(
            data
          /*id: this.form.id,
          titleDesc: this.form.titleDesc,
          content: this.form.content*/        //用post方法为什么不能这样写
        ).then(function (res) {
          if (res.data.code == 1) {
            _this.$message({
              message: '修改成功',
              type: 'success'
            });
            _this.$emit('updated')
          }
          else {
            _this.$message({
              message: res.data.msg,
              type: 'error'
            });
          }
        }).catch(function () {
          _this.$message({
            message: '修改失败',
            type: 'error'
          });
        })
      }
    }


  }
</script>
