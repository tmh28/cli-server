<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="标题">
      <el-input v-model="form.title"></el-input>
    </el-form-item>
    <el-form-item label="跳转链接">
      <el-input v-model="form.url"></el-input>
    </el-form-item>
    <el-form-item label="优先级">
      <el-input v-model="form.priority"></el-input>
    </el-form-item>
    <div class="on-off">
        <el-switch
          style="margin-bottom:20px;"
          v-model="form.status"
          on-color="#13ce66"
          off-color="#ff4949"
          on-value="1"
          off-value="0">
        </el-switch>
    </div>
    <el-form-item label="图片">
      <crop v-model="form.imgUrl" :width="500" :height="300"></crop>
    </el-form-item>
    <el-form-item>
    <el-button type="info" size="small"  style="float:left ;"  @click="modifynow">立即修改</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
  import axios from 'axios'
  import config from '../../api/config'
  import {updateCarousel} from '../../api/api'
  import crop from '../common/crop.vue'
  axios.defaults.withCredentials=true
  export default{
    props:{
      form:{
        type:Object,
      }
    },
    components:{
        crop:crop
    },
    methods:{
     modifynow:function(){
         var _this=this
       updateCarousel(this.form).then(function(res){
           console.log(res)
           if(res.data&&res.data.code==1){
             _this.$message({
               message: '修改成功',
               type: 'success'
             });
             _this.$emit('updated')
           }
       }).catch(function(){
         _this.$message({
           message: '修改失败',
           type: 'error'
         });
       })
     }
    }
    }
</script>
<style>
  .on-off{
    display: flex;
    justify-content: flex-start;
    margin-left:75px;
    margin-top:-15px;
    margin-bottom:10px;
  }
  .upload-img img{
    width:100%;
  }

</style>
