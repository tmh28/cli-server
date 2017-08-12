<template>
  <el-row class="user-container">
    <el-col :span="8">
      <div class="user-header" :style="{'background-image':'url('+Info.header+')'}">
        <b class="name">{{Info.username}}</b>
      </div>
      <p><i class="iconfont icon-dianhua"></i>{{Info.phone}}</p>
      <p><i class="iconfont icon-weixin"></i>{{Info.wxNum}}</p>
      <p><i class="iconfont icon-qq"></i>{{Info.qqNum}}</p>
    </el-col>
    <el-col :span="16" class="user-detail">
      <p><span>民族</span>{{Info.nation}}</p>
      <p><span>年龄</span>{{Info.age}}</p>
      <p><span>性别</span>{{Info.sex==1?'男':'女'}}</p>
      <p><span>党支部</span>{{Info.branchName}}</p>
      <p><span>专业</span>{{Info.special}}</p>
      <p><span>学历</span>{{Info.education}}</p>
      <p><span>职称</span>{{Info.jobRank}}</p>
      <p><span>入党时间</span>{{Info.joinPartyTime}}</p>
      <p><span>当前积分</span>
        <el-tag type="gray">{{Info.totalScore}}</el-tag>
      </p>
      <p><span>状态</span>{{Info.disabled==0?'正常':'禁用'}}</p>

    </el-col>
  </el-row>

</template>

<script>
  export default{
    props:{
      Info:{
        type:Object,

      }
    }
  }
</script>
<style lang="less" scoped>
  .user-container{
    padding: 20px;
  }
  .user-detail p{
    position: relative;
    padding-left:100px;
    min-height: 1em;
  }
  .user-detail span:first-child{
    display: inline-block;
    width: 100px;
    position: absolute;
    left:0
  }
  .user-detail span:first-child:after{
    content:'：';

  }
  .name{
    position: absolute;
    width: 100%;
    text-align: center;
    display: block;
    top: 100%;
    margin-top: 5px;
  }
  .user-header{
    width: 100px;
    height: 100px;
    border-radius: 100%;
    border:1px solid #eee;
    background: no-repeat center;
    background-size: cover;
    position: relative;
    margin-bottom: 60px;
  }
</style>


