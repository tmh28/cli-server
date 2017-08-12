<template>
  <el-form :model="form" label-width="80px">
    <el-form-item label="标题">
      <el-input v-model="form.title"></el-input>
    </el-form-item>
    <el-form-item label="跳转链接">
      <el-input v-model="form.url"></el-input>
    </el-form-item>
    <div style="color:rgba(236,230,48,0.62);font-size:16px;text-align: left;margin-left:75px;margin-top:-20px;">
      可填写页面地址，也可填写新闻id(新闻列表里)
    </div>
    <el-form-item label="优先级">
      <el-input v-model="form.priority"></el-input>
    </el-form-item>
    <div style="color:rgba(236,230,48,0.62);font-size:16px;text-align: left;margin-left:75px;margin-top:-20px;margin-bottom:20px">
      值越大越,图片显示的顺序越靠前
    </div>
    <el-form-item label="图片">
      <crop v-model="form.imgUrl" :width="500" :height="300"></crop>
    </el-form-item>
    <el-button type="info" size="small" style="float:left ;margin-left:75px;margin-bottom:40px;" @click="modifynow">
      立即创建
    </el-button>
  </el-form>
</template>
<script>
  import axios from 'axios'
  import config from '../../api/config'
  import {addCarousel} from '../../api/api'
  import crop from '../common/crop.vue'
  axios.defaults.withCredentials = true
  export default{
    props: {
      value: {
        type: Object,
        default: null
      }
    },
    data: function () {
      return {
        form: {
          title: '',
          url: '',
          priority: '',
          imgUrl: '',
          type: 0
        },
      }
    },
    components: {
      crop: crop
    },
    created: function () {
      if (this.value) {
        console.log(this.value)
        this.form.title = this.value.title;
        this.form.url = this.value.url
      }
      console.log(this.form.title, this.form.url)
    },
    methods: {
      modifynow: function () {
        var add = new FormData();
        add.append('title', this.form.title)
        add.append('url', this.form.url)
        add.append('priority', this.form.priority)
        add.append('imgUrl', this.form.imgUrl)
        add.append('type', this.form.type)
        var _this = this;
        addCarousel(
          add
        ).then(function (res) {

          console.log(res)
          if (res.data.code == 1) {
            _this.$message({
              message: '操作成功',
              type: 'success'
            })
          } else {
            _this.$message({
              message: '操作失败',
              type: 'error'
            })
          }
        })
      },
      watch: {
        value(n, o){
          if (n) {
            this.form.title = n.title;
            this.form.url = n.url;
          }
        }
      }
    }
  }
</script>
<style>

</style>
