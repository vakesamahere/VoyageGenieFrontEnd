<template>
    <div class="common-layout">
      <el-container>
        <el-header class="header" style="width: 100vw;">
            <el-row>
                <el-col :span="8"><span>关于VoyageGenie</span></el-col>
                <el-col :span="8"></el-col>
                <el-col :span="8"></el-col>
            </el-row>
        </el-header>
        <el-main class="main">
            <img alt="" src="/src/assets/genie.png" class="inserted-image">
            <h1>VoyageGenie是一个人工智能驱动的智能旅行规划平台</h1>
        </el-main>
      </el-container>
    </div>
  </template>


<script lang="ts" setup>
    
</script>

<style scoped>
.header{
    font-size: 30px;
    padding-left: 40px;
    font-weight: bold;
}
.row{
    margin-left: 80px;
}
.main{
    position: relative;
    text-align: center;
    font-size: 25px;
    font-weight: bold;
}
.inserted-image{
    max-width: 100%;  /* 确保图片不会超过容器宽度 */
    height: auto;  /* 保持图片的纵横比 */
}
.inserted-image{
    width: 50px;
    height: 50px;
}
</style>