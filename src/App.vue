
<template>
    <div class="common-layout">
        <el-container style="height:100vh ;">
             <!--二级导航栏-->
             <!--主界面-->
            <el-header class="custom-header">
                <div class="header-content">
                    <div class="left-content">
                        <h1 style="font-size: 25px;font-weight: bold;">{{ name }}</h1>
                        <p style="font-size: 18px; color: grey;font-weight: bold;"> {{bio}}</p>
                    </div>
                    <el-avatar class="right-avatar" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" :size="70"></el-avatar>
                </div>
            </el-header>
            <el-container class="container">
            <el-header class="voyage">
                <el-row>
                  <el-col :span="6" class="span">
                    <el-button color="white" :class="{'common-button':!isAClick,'click-button':isAClick}" icon="EditPen" @click="handleAClick">
                        <i class="custom-icon"></i>
                        行程
                    </el-button>
                  </el-col>
                  <el-col :span="6" class="span">
                    <el-button color="white" :class="{'common-button':!isBClick,'click-button':isBClick}" icon="Pointer" @click="handleBClick">
                        <i class="custom-icon"></i>
                        点赞
                    </el-button>
                  </el-col>
                  <el-col :span="6" class="span">
                    <el-button color="white" :class="{'common-button':!isCClick,'click-button':isCClick}" icon="Star" @click="handleCClick">收藏
                    </el-button>
                  </el-col>
                  <el-col :span="6" class="span">
                    <el-button color="white" :class="{'common-button':!isDClick,'click-button':isDClick}" icon="Warning" @click="handleDClick">
                        <i class="custom-icon"></i>
                        关注
                    </el-button>
                  </el-col>
                </el-row>
            </el-header>
            <el-divider />
            <el-main  class="main-content">
                    <router-view/>
            </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script lang="ts" setup>
    import { useRouter } from 'vue-router';
    const router = useRouter();
    import {onMounted, ref} from 'vue'
    const isAClick = ref(false)
    const isBClick = ref(false)
    const isCClick = ref(false)
    const isDClick = ref(false)
    import axios from 'axios';
    const response=ref();
    const name = ref('');
    const bio=ref();
    const show=async ()=>{
      try{
          const res=await axios.get('http://1.94.170.22:5000/get_user_profile?user_id=2');
          response.value=res.data;
          bio.value=JSON.parse(response.value.info).bio;
          name.value=response.value.name;
      }catch(error:any){
          console.error('There was an error fetching the data!',error);
      }
    };
    onMounted(() => {
    show(); 
    });

    
    
    function handleAClick() {
        isAClick.value = true; 
        isBClick.value = false;
        isCClick.value = false;
        isDClick.value = false;
        router.push({name:'journey'});
    }
    function handleBClick() {
      isAClick.value = false; 
      isBClick.value = true;
      isCClick.value = false;
      isDClick.value = false;
      router.push({name:'like'});
    }
    function handleCClick(){
      isAClick.value = false; 
      isBClick.value = false;
      isCClick.value = true;
      isDClick.value = false;
      router.push({name:'collection'});
    }
    function handleDClick(){
      isAClick.value = false; 
      isBClick.value = false;
      isCClick.value = false;
      isDClick.value = true;
      router.push({name:'interest'});
    }
</script>




<style>
.span{
  display: flex;
  justify-content: center;
  align-items: center;
}
.common-layout{
    display: flex;
    justify-content: center;
}
.main-content {
  padding: 20px; /* 可选：内边距 */
    height: calc(100vh-200px);
}
.custom-icon {
  font-size: 24px; /* 调整按钮图标的大小 */
  margin-right: 8px; /* 调整图标和文字之间的间距 */
}
.common-button{
    font-size: 18px;
  color: black;
  height: 50px;
  width: 80%;
  display: flex;
  justify-content: center; 
  align-items: center; 
}
.click-button{
    background-color: #eaeaea;
    font-size: 18px;
  color: black;
  height: 50px;
  width: 80%;
  display: flex;
  justify-content: cnter; 
  align-items: center; 
  text-align: center;
}
.name{
    font-size: 25px;
    font-weight: Bold;
}
.custom-header {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  height: 150px;
}

.header-content {
  display: flex;
  justify-content: space-between; /* 在两边的内容之间留出空间 */
  align-items: center; /* 垂直居中对齐 */
  padding: 0 20px; /* 确保内容距离左右两边各20px */
}

.left-content {
  margin-left: 20px; /* 确保文本内容距离左边20px */
}

.right-avatar {
  margin-right: 20px; /* 确保头像距离右边20px */
}
.container{
  margin-top: 10px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}
.voyage{
  padding: 20px; /* 可选：内边距 */
}
</style>
