<template>
  <div class="avatar-uploader">
    <div v-if="imageUrl" @click="toggleShow" class="el-upload el-upload--text">
      <img :src="imageUrl">
    </div>
    <div v-if="!imageUrl" @click="toggleShow" class="el-upload el-upload--picture-card">
      <i class="el-icon-plus"></i>
    </div>
    <my-upload field="myFile"
               @crop-success="cropSuccess"
               @crop-upload-success="cropUploadSuccess"
               @crop-upload-fail="cropUploadFail"
               v-model="show"
               :width="width"
               :height="height"
               :url="uploadUrl"
               img-format="png"></my-upload>
  </div>
</template>
<script>
  import axios from 'axios'
  import myUpload from 'vue-image-crop-upload/upload-2.vue';
  import config from '../../api/config'
  export default{
    props: {
      value: {
        type: String
      },
      width: {
        type: Number,
        default: 200
      },
      height: {
        type: Number,
        default: 200
      }
    },
    data: function () {
      return {
        imageUrl: '',
        show: false,
        name: 'myFile',    //可以不写
        uploadUrl: config.uploadImage,
      }
    },
    components: {
      'my-upload': myUpload
    },
    mounted(){
      if (this.value) {
        this.imageUrl = this.value
      }
    },
    methods: {
      toggleShow(){
        this.show = !this.show;
      },
      cropSuccess(imgDataUrl, field){
        this.imgUrl = imgDataUrl;
      },
      cropUploadSuccess(res, field){
        if (res) {
          this.$emit('input', res.url);

        }
      },
      cropUploadFail(status, field){
      }

    },
    watch: {
      value(newv, oldv){
        this.imageUrl = newv;
      }
    }
  }
</script>
<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }
  .el-upload {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .el-upload--text, .el-upload--picture-card {
    width: 178px;
    height: 178px;
    display: block;
  }
  .el-upload img {
    width: 100%;
    height: 100%;
  }
</style>
