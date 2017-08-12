<template>
  <div class="check">
    <swiper :options="swiperOption">
      <swiper-slide class="text-center" style="position: relative " v-for="item in picList" :key="item.id" >
        <img :src="item.picUrl" alt="">
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <div>
      <el-col :span="24" class="toolbar text-center" style="padding-bottom: 0px;">
        <el-form :inline="true">
          <el-form-item>
            <el-radio-group v-model="state">
              <el-radio label="1">通过</el-radio>
              <el-radio label="0" >不通过</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-input  autosize  placeholder="请输入理由" type="textarea" v-model="reason"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submit">提交</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </div>
  </div>
</template>
<script>
  import {swiper, swiperSlide} from 'vue-awesome-swiper'
  import {checkReport } from '../../api/api'
  export default{
    data(){
      return {
        state:"1",
        reason:"",
        swiperOption: {
          pagination: '.swiper-pagination',
        },
        picList:[],
        reportId:''
      }
    },
    components:{
      swiper,swiperSlide
    },
    props:{
      value:{
        type:Object
      }
    },
    created:function () {
      this.picList=this.value.picList;
      this.reportId=this.value.id

    },
    methods:{
      submit:function () {
        var _this=this
        checkReport({
          accept:this.state,
          reason:this.reason,
          arr:[this.reportId]
        }).then(function(res){
          if(res.data.code){
            _this.$message({
              message: res.data.msg,
              type: 'success'
            });
            _this.$emit("updateList")
          }else{
            _this.$message({
              message: res.data.msg,
              type: 'error'
            });
          }
        })
      },
    },
    watch:{
      value(n,o){
        if(n){
          this.picList=n.picList;
          this.reportId=n.id
        }
      }
    }
  }
</script>
<style>
  .text-center{
    text-align: center;
  }
</style>

