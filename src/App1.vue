<template>
  <el-container class="layout-container-demo">
   <!-- <el-aside width="200px">
      <el-scrollbar>
        <el-menu :default-openeds="['1', '3']">
          <el-sub-menu index="1">
            <template #title>
              <el-icon><message /></el-icon>Navigator One
            </template>
            <el-menu-item-group>
              <template #title>Group 1</template>
              <el-menu-item index="1-1">Option 1</el-menu-item>
              <el-menu-item index="1-2">Option 2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="Group 2">
              <el-menu-item index="1-3">Option 3</el-menu-item>
            </el-menu-item-group>
            <el-sub-menu index="1-4">
              <template #title>Option4</template>
              <el-menu-item index="1-4-1">Option 4-1</el-menu-item>
            </el-sub-menu>
          </el-sub-menu>
          <el-sub-menu index="2">
            <template #title>
              <el-icon><icon-menu /></el-icon>Navigator Two
            </template>
            <el-menu-item-group>
              <template #title>Group 1</template>
              <el-menu-item index="2-1">Option 1</el-menu-item>
              <el-menu-item index="2-2">Option 2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="Group 2">
              <el-menu-item index="2-3">Option 3</el-menu-item>
            </el-menu-item-group>
            <el-sub-menu index="2-4">
              <template #title>Option 4</template>
              <el-menu-item index="2-4-1">Option 4-1</el-menu-item>
            </el-sub-menu>
          </el-sub-menu>
          <el-sub-menu index="3">
            <template #title>
              <el-icon><setting /></el-icon>Navigator Three
            </template>
            <el-menu-item-group>
              <template #title>Group 1</template>
              <el-menu-item index="3-1">Option 1</el-menu-item>
              <el-menu-item index="3-2">Option 2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="Group 2">
              <el-menu-item index="3-3">Option 3</el-menu-item>
            </el-menu-item-group>
            <el-sub-menu index="3-4">
              <template #title>Option 4</template>
              <el-menu-item index="3-4-1">Option 4-1</el-menu-item>
            </el-sub-menu>
          </el-sub-menu>
        </el-menu>
      </el-scrollbar>
    </el-aside>-->
   <el-aside v-if="!isMobile && isAsideVisible" width="200px" > 
    <el-menu
      default-active="/square"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      popper-effect="light"
      @open="handleOpen"
      @close="handleClose"
      router
    >
      <img alt="Genie logo" class="genie" src="@/assets/genie.png"/>
      
      <el-sub-menu index="1"  >
        <template #title>
          <el-icon><ChatDotSquare /></el-icon>
          <span>规划</span>
        </template>
          <el-menu-item-group>
           <el-menu-item index="1-1" @click="createChatSession">新增</el-menu-item>
          <el-menu-item 
            v-for="chat in chats"
            :index="'1='+chat.uid"
            :key="chat.uid"
            :to="{ name: 'chat', params: { chatId: chat.uid } }"
            class="chat-list-item"
            :class="{ active: currentChatId === chat.uid }"
            @click="switchChat(chat.uid)"
            router
          >

            > {{ chat.uid }}
      
      
                        <el-popover
                      ref="popover"
                      :width="200"
                      placement="right"
                      trigger="hover"
        
                    >
                      <div style="text-align: right; margin: 0">
                        <el-button
                          @click="deleteChat(chat.uid)"
                          type="danger"
                          size="small"
                          :icon="Delete"
                          plain
                        >删除</el-button>
                      </div>
                  <template #reference>
                    <el-icon style="margin-right: 2px"><MoreFilled /></el-icon>
                  </template>
                  </el-popover>

          </el-menu-item>
        </el-menu-item-group>
        </el-sub-menu>
      <el-menu-item index="/square">
        <el-icon><icon-menu/></el-icon>
        <template #title>动态</template>
      </el-menu-item>
      <el-menu-item index="/home">
        <el-icon><document /></el-icon>
        <template #title>主页</template>
      </el-menu-item>
      <el-sub-menu index="4">
        <template #title>
        <el-icon><setting /></el-icon>
        <span>设置</span>
      </template>
      <el-menu-item-group>
      <el-menu-item index='/data'>个人资料</el-menu-item>
      <el-menu-item index='/safety'>账号安全</el-menu-item>
      <el-menu-item index='/help'>关于我们</el-menu-item>
      </el-menu-item-group>
      </el-sub-menu>
    </el-menu>
   </el-aside>

   <el-drawer
      title="导航"
      v-model="drawerVisible"
      :direction="'rtl'"
      size="200px"
    >
    <el-menu
      default-active="/square"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      popper-effect="light"
      @open="handleOpen"
      @close="handleClose"
      router
    >
      <img alt="Genie logo" class="genie" src="@/assets/genie.png"/>
      
      <el-sub-menu index="1"  >
        <template #title>
          <el-icon><ChatDotSquare /></el-icon>
          <span>规划</span>
        </template>
          <el-menu-item-group>
           <el-menu-item index="1-1" @click="createChatSession">新增</el-menu-item>
          <el-menu-item 
        v-for="chat in chats"
        :index="'1='+chat.uid"
        :key="chat.uid"
        :to="{ name: 'chat', params: { chatId: chat.uid } }"
        class="chat-list-item"
        :class="{ active: currentChatId === chat.uid }"
        @click="switchChat(chat.uid)"
        router
      >

            > {{ chat.uid }}
      
      
                        <el-popover
                      ref="popover"
                      :width="200"
                      placement="right"
                      trigger="hover"
        
                    >
                      <div style="text-align: right; margin: 0">
                        <el-button
                          @click="deleteChat(chat.uid)"
                          type="danger"
                          size="small"
                          :icon="Delete"
                          plain
                        >删除</el-button>
                      </div>
                  <template #reference>
                    <el-icon style="margin-right: 2px"><MoreFilled /></el-icon>
                  </template>
                  </el-popover>

          </el-menu-item>
        </el-menu-item-group>
        </el-sub-menu>
      <el-menu-item index="/square">
        <el-icon><icon-menu/></el-icon>
        <template #title>动态</template>
      </el-menu-item>
      <el-menu-item index="/home">
        <el-icon><document /></el-icon>
        <template #title>主页</template>
      </el-menu-item>
      <el-sub-menu index="4">
        <template #title>
        <el-icon><setting /></el-icon>
        <span>设置</span>
      </template>
      <el-menu-item-group>
      <el-menu-item index='/data'>个人资料</el-menu-item>
      <el-menu-item index='/safety'>账号安全</el-menu-item>
      <el-menu-item index='/help'>关于我们</el-menu-item>
      </el-menu-item-group>
      </el-sub-menu>
    </el-menu>
    </el-drawer>

    <el-container>
      <el-header style="font-size: 20px;min-width: 200px;">
        <el-icon v-if="!isMobile" @click="toggleSidebar" class="foldandexpand">
            <component :is="Fold" v-if="!isCollapse"></component>
            <component :is="Expand" v-else></component>
          </el-icon>
          <el-icon v-else @click="drawerVisible = true" class="foldandexpand">
            <component :is="Fold" ></component>
          </el-icon>

        <div class="toolbar">
          
            <el-popover
            placement="bottom"
                      title="通知"
                      :width="200"
                      trigger="hover"
                      
                      >
                      <NoticeBox style="max-height: 180px;overflow-y: auto;" :user_id="userId" @enterPost="handleEnterPost" @enterUser="handleEnterUser"/>
              <template #reference>
                <el-icon style="margin-right: 8px; margin-top: 1px;font-size: 20px;">
                  <Bell />
                </el-icon>
              </template>
          </el-popover>
          <el-dropdown>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>View</el-dropdown-item>
                <el-dropdown-item>Add</el-dropdown-item>
                <el-dropdown-item>Delete</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <div style="margin-right: 2px; margin-top: 8px;">
            <el-avatar
              src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
              @click="goToAboutPage"
              />
          </div>
        </div>
      </el-header>
       
      <el-main>
        <router-view :currentChat="currentChat" v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component"></component>
          </transition>
        </router-view>
        <el-dialog
          v-model="dialogVisible"
          :width="dialogWidth"
          :title=post.title
          :before-close="handleClosePost"
          align-center
          >
            <span>
              <PostBox v-if="post" :post="post"/>
            </span>
        </el-dialog>
        <el-dialog
          v-model="visible"
          :width="dialogWidth"
          :height="dialogWidth"
          align-center
          style="overflow-x: hidden;box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  border-radius: 8px;"
          >
            <span>
              <LoginBox @handleLogin="handleLogin"/>
            </span>
        </el-dialog>
        
      </el-main>
    </el-container>
    
  </el-container>
</template>

<script lang="ts" setup>
import NoticeBox from './components/NotificationPage.vue'
import LoginBox from './components/LoginBox.vue';
const API_URL = 'http://1.94.170.22:5000';
// 定义响应式变量
const isMobile = ref(window.innerWidth < 768);
const isAsideVisible = ref(true); // 侧边栏默认可见
const drawerVisible = ref(false); // 抽屉默认不可见
// 监听窗口大小变化
const updateMedia = () => {
  isMobile.value = window.innerWidth < 768;
};

import { useStore } from 'vuex';

const store = useStore();
const userId = ref(store.state.userId);
const visible=ref(store.state.visible);

// 使用getter获取userId
const getUserId = computed(() => store.state.userId);

// 监听userId变化
 watch(() => store.getters.getUserId, (newVal, oldVal) => {
      console.log(`User ID changed from ${oldVal} to ${newVal}`);
      console.log(newVal);
      loadAllChat(newVal);
      // 执行其他需要的操作
    });

// 监听visible变化
watch(() => store.state.visible, (newVal, oldVal) => {
  console.log(`visible changed from ${oldVal} to ${newVal}`);
  visible.value = newVal;
  // 执行其他需要的操作
});


// 组件挂载后执行
onMounted(() => {
  console.log(`Initial User ID: ${getUserId.value}`);
});


onMounted(() => {
  window.addEventListener('resize', updateMedia);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateMedia);
});

// 监听isMobile的变化，以更新侧边栏的显示状态
watch(isMobile, (newVal) => {
  if (newVal === false) isAsideVisible.value = true;
  
});


import { ref,onMounted,watch,onUnmounted,computed } from 'vue'
//import { Menu as IconMenu, Message, Setting } from '@element-plus/icons-vue'
import Planner from './components/Planner.vue'
import {
    Document,
    Menu as IconMenu,
    ChatDotSquare,
    Setting,
    Bell,
    Fold,
    Expand,Delete,Edit,MoreFilled
  } from '@element-plus/icons-vue'
import HelloWorld from './components/HelloWorld.vue'
import { RouterView, useRoute } from 'vue-router'

import { useRouter } from 'vue-router';


// 使用Vue Router的useRouter钩子
const router = useRouter();


// 定义点击图片时调用的方法
const goToAboutPage = () => {
  router.push('/about');
};
  
  const isCollapse = ref(false)
  const handleOpen = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)

  }
  const handleClose = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
  }
  const toggleSidebar = () => {
      isCollapse.value = !isCollapse.value;
    };

import axios from 'axios'; 


const chats = ref([]);
const currentChatId = ref(null);
const currentChat = ref(null);


//启动时加载chat
onMounted(async () => {
  loadAllChat(userId.value);
});

function handleLogin(){
  visible.value=false;
}

//新建chat
async function createChatSession() {
  try {
    const response = await axios.post(`${API_URL}/create_chat`, {
      user_id: userId.value, // 假设的用户ID
      history: "{}",
      agentMemory: "{}",
    });
    const newChatSession = {
    uid: response.data.chat_uid,
    history: "{}",
    agentMemory: "{}",
    };
    chats.value.push(newChatSession);
    switchChat(newChatSession.uid);
    const chatUid = response.data.chat_uid;
    console.log('新建聊天的 UID:', chatUid);
  } catch (error) {
    console.error('创建聊天会话失败:', error);
  }
}

// 加载所有会话
const loadAllChat = async (userid) => {
  try {
    const response = await axios.get(`${API_URL}/get_all_chats?user_id=${userid}`);
    chats.value = response.data;
    console.log(chats.value);
    //switchChat(chats.value[0].uid);
  } catch (error) {
    console.error('Error fetching chats:', error);
  }
};

//切换会话
const switchChat = (chatId) => {
  const chat = chats.value.find(c => c.uid === chatId);
  currentChatId.value = chatId;
  currentChat.value = chat;
  console.log('切换到聊天:', chat.history);
  loadAllChat(userId.value);
};

//删除chat
const deleteChat = async (uid) => {
  try {
    const response = await axios.post(`${API_URL}/delete_chat`,{chat_id:uid});
    // 处理成功情况，例如从列表中删除聊天
    chats.value = chats.value.filter(chat => chat.uid !== uid);
  } catch (error) {
    // 处理错误情况
    console.error('Delete chat failed:', error);
  }
};

//加载post
let resizeListener = null;
const dialogVisible = ref(false)
const dialogWidth = ref('30%'); // 默认宽度为60%

interface Post {
  title: string;
  cover: string;
  images: string[];
  text: string;
  routes: {
    name: string;
    navigation: {
      起点: {
        name: string,
        address: string,
        location: {
          latitude: number,
          longitude: number
        }
      },
      终点: {
        name: string,
        address: string,
        location: {
          latitude: number,
          longitude: number
        }
    },
    交通方式: string,
      路程: string,
      价格: string
  }[];
    events: {
      name: string;
      position: string;
      description: string;
      images: string[];
    }[];
  }[];
}

const post = ref<Post>({})

//进入指定Post
const handleEnterPost = async (post_id) => {
  try {
    const response = await axios.get(`/get_post_details?post_id=${encodeURIComponent(post_id)}`);
    post.value=response.data.post;
    dialogVisible.value = true;
    console.log(post);
    // 可以在这里更新组件的状态或执行其他操作
  } catch (error) {
    console.error('请求失败:', error);
  }
};



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
  dialogWidth.value = screenWidth <= 768 ? '100%' : '30%';
};
const handleClosePost = (done: () => void) => {
  dialogVisible.value = false
}
</script>


<style>
::-webkit-scrollbar {
    display: none;
}
</style>

<style scoped>
/* 定义过渡效果 */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
.layout-container-demo {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  font-family:  'Microsoft YaHei', '微软雅黑', sans-serif;
}
.layout-container-demo .el-header {
  position: relative;
  background-color: var(--el-color-primary-light-7);
  color: var(--el-text-color-primary);
  z-index: 1000;
  pointer-events: auto;
}
.layout-container-demo .el-aside {
  color: var(--el-text-color-primary);
  background: #fff;
  width: auto;
  text-align: center;
  height: 100%;
  z-index: 1000;
  overflow: auto;
}

.layout-container-demo .el-main {
  padding: 0px;
  position:relative;
  height: 100%;
  overflow: visible;
  
}
.layout-container-demo .toolbar {
  position:absolute;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right:20px; /* 右端对齐 */
}
.genie{
    border-radius: 10px; /* 圆角半径 */
    margin-top:20%;
    margin-bottom:20%;
    height:50px;
    width:50px;
  }
.foldandexpand{
    position: absolute; /* 绝对定位相对于header */
    top: 50%;
    transform: translateY(-50%); /* 垂直居中 */
}

a:hover{
  background-color:#c6e2ff;
}

.router-link-active {
  text-decoration: none;
  color: #409EFF;
}





</style>