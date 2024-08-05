
<template>
  <div class="common-layout">
      <el-container style="height:100vh ;">
           <!--二级导航栏-->
           <!--主界面-->
          <el-header class="custom-header">
              <div class="header-content" >
                  <div class="left-content">
                      <h1 style="font-size: 25px;font-weight: bold;">{{ name }}</h1>
                      <p style="font-size: 18px; color: grey;font-weight: bold;"> {{bio}}</p>
                  </div>
                  <el-avatar class="right-avatar" :src="userAvatar" :size="70" @click="goUserInfo"></el-avatar>
              </div>
          </el-header>
          <el-container class="container" >
            <MyPosts />
          </el-container>
        </el-container>
  </div>
</template>

<script lang="ts" setup>
  import MyPosts from '@/components/myposts.vue';
  import { useRouter } from 'vue-router';
  const router = useRouter();
  import {onMounted, ref,computed,watch} from 'vue'
  import { useStore } from 'vuex';

const store = useStore();
const userId = ref(store.state.userId);

// 使用getter获取userId
const getUserId = computed(() => store.state.userId);
const userAvatar = computed(() => store.state.userAvatar);

// 监听userId变化
watch(() => store.getters.getUserId, (newVal, oldVal) => {
 console.log(`User ID changed from ${oldVal} to ${newVal}`);
 // 执行其他需要的操作
 });
  const isAClick = ref(false)
  const isBClick = ref(false)
  const isCClick = ref(false)
  const isDClick = ref(false)
  import axios from 'axios';
  const response=ref();
  // const name = ref('');
  // const bio=ref();
  const name = computed(() => store.state.userName);
  const bio = computed(() => store.state.userBio);
  const show=async ()=>{
    try{
        const res=await axios.get(`http://1.94.170.22:5000/get_user_profile?user_id=${userId.value}`);
        response.value=res.data;
        // bio.value=JSON.parse(response.value.info).bio;
        // name.value=response.value.name;
        
    }catch(error:any){
        console.error('There was an error fetching the data!',error);
    }
  };
  onMounted(() => {
  show(); 
  });  
  function goUserInfo() {
      if(!store.state.userId){
        console.log('未登录');
        // this.showLogin()
        store.commit('setLoginVisible',true)
        return
      }
      router.push('/data')
    }
</script>




<style scoped>
* {
  color: var(--display-text-color);
}
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
background-color: var(--bg-color);
border-radius: 8px;
box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
height:auto;
}

.header-content {
display: flex;
justify-content: space-between; /* 在两边的内容之间留出空间 */
align-items: center; /* 垂直居中对齐 */
padding: 20px; /* 确保内容距离左右两边各20px */
}

.left-content {
margin-left: 20px; /* 确保文本内容距离左边20px */
width:auto;
}

.right-avatar {
margin-right: 20px; /* 确保头像距离右边20px */
cursor: pointer;
transition: all 0.3s ease-in-out;
}
.right-avatar:hover {
scale: 1.2;
filter: drop-shadow(0 0 25px var(--color-light));
}
.container{
margin-top: 20px;
background-color: var(--bg-color);
border-radius: 8px;
box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}
.voyage{
padding: 20px; /* 可选：内边距 */
}
</style>
