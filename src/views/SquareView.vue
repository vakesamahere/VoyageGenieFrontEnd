<template>
  <div class="containerTest">
    <div class="subwin1">
      <SquarePage :user_id="userId" @enterPost="handleEnterPost" @searchChange="changeLastSearch"  :searchKeyword="searchKeyword"/>
    </div>
    <el-dialog
                v-model="dialogVisible"
                :width="dialogWidth"
                align-center
                destroyOnClose="true"
                >
                  <span>
                    <PostDisplaying :userId="userId" :postId="postId"/>
                  </span>

              </el-dialog>
  
  </div>
  </template>
  <script lang="ts" setup>
  // import test from './components/TestRequest.vue'
  import SquarePage from '../components/SquarePage.vue'

  import PostDisplaying from '../../displayPost/PostDisplaying.vue';
  
  import { useStore } from 'vuex';
  import { useRoute } from 'vue-router';
  import { ref, computed, watch,onUnmounted,onMounted,defineEmits } from 'vue';

  const emit = defineEmits<{
      (e:'searchChange',keyword:string): void
  }>();
  function changeLastSearch(keyword:string) {
    emit('searchChange',keyword);
  }
  const route = useRoute();
  const searchKeyword = ref(route.query.keyword?.toString()||'')
  const dialogVisible = ref(false);
  const store = useStore();
  const userId = ref(store.state.userId);
  const dialogWidth = ref('60%'); // 默认宽度为60%
  let resizeListener = null;

  // 使用getter获取userId
  const getUserId = computed(() => store.state.userId);
  
//   alert(userId.value)
//   postId.value = id;
//   dialogVisible.value = true;
// }
  // 监听userId变化
  watch(() => store.getters.getUserId, (newVal, oldVal) => {
  console.log(`User ID changed from ${oldVal} to ${newVal}`);
  // 执行其他需要的操作
  });

  // 监听route变化
  watch(() => route.query.keyword, (newVal, oldVal) => {
    if(newVal===undefined){
      return
    }
    console.log(`keyword changed from ${oldVal} to ${newVal}`);
    searchKeyword.value = newVal?.toString()||''
  });

  function handleEnterPost(){
    dialogVisible.value = true;
  }

  onMounted(() => {
    // 初始化时检查屏幕尺寸，并设置dialogWidth
    checkScreenSize();
    // 添加resize事件监听器
    resizeListener = window.addEventListener('resize', checkScreenSize);
  });

  onUnmounted(() => {
    if (resizeListener) {
      window.removeEventListener('resize', resizeListener);
    }
  });

  const checkScreenSize = () => {
    const screenWidth = document.documentElement.clientWidth;
    dialogWidth.value = screenWidth <= 768 ? '100%' : '60%';
  };


  </script>
  
  <style scoped>
  #Square {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    overflow: hidden;
  }
  .subwin1{
    height: 100vh;
    width: 100%;
    /* pointer-events: none; */
  }
  .subwin2{
    height: 100vh;
    width: 50%;
  }
  .containerTest{
    display: flex;
    flex-direction: row;
    height: 100vh;
    width: 100vw;
  }

  .el-dialog{
    overflow-y: hidden;
  }

  </style>
  