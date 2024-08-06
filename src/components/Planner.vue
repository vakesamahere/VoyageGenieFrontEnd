<template>
    <el-container>
      <el-aside>
        <el-main style="height:90%;padding: 0px;">
        <el-menu :default-active="$route.path"
          class="el-menu-demo chat"
          mode="vertical"
          background-color="var(--bg-color)"
          text-color="var(--display-text-color)"
          active-text-color="var(--display-text-color-active)"
          router>      
          <el-menu-item 
        v-for="chat in chats"
        :index="'/chat/'+chat.uid"
        :key="chat.uid"
        class="chat-list-item"
        :class="{ active: currentChatId === chat.uid }"
        @click="switchChat(chat.uid)"
        style="background-color: var(--bg-color);"
        router
      >
          <h1>{{chat.uid}}</h1>
          <el-popover
          ref="popover"
          :width="100"
          placement="right"
          trigger="hover"
          popper-style="padding: 0px;border:1px solid var(--color-light);"
        >
          <div style="text-align: center; margin: 0;padding: 0px;background-color: var(--color-light);">
            <el-button
              @click="deleteChat(chat.uid)"
              style="background-color: transparent;border: none;color: #fff;"
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
        </el-menu>
      </el-main>
        <el-footer style="height: 10%;text-align: center;">
        <el-icon  style="font-size: 5.5vh;margin-top: -30%;z-index: 1000;color:rgb(255,194,151); 
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);border-radius: 50%;  
        background-image: radial-gradient(circle at 50% 50%, #fff, #fad0c4); "
        @click="createChatSession" class="add-button">
          <CirclePlusFilled /></el-icon>
        </el-footer>
      </el-aside>
      <el-main class="planner">
       <router-view :currentChat="currentChat"/>
      </el-main>

    </el-container>
</template>
<script lang="ts" setup>
    import { watch,ref,defineProps, onMounted,onUnmounted,computed } from 'vue'
    import PostBox from './PostBox.vue';
    import axios from 'axios'; // 导入 axios 用于发送 HTTP 请求
    import { useStore } from 'vuex';
    import {Delete} from '@element-plus/icons-vue'
    const store = useStore();
    const userId = ref(store.state.userId);
    
    
    const API_URL = 'http://1.94.170.22:5000';
    const dialogVisible = ref(false)
    const inputText = ref('')
    const textList1 = ref([]); // 存储输入文本的列表，用于生成 div

    const textList2 = ref([]); // 存储输入文本的列表，用于生成 div
    const listName = ref('1'); // 初始化 listName,用于区分列表
    const isdisable = ref(false);//按钮禁用状态
    const activeName = ref('1'); // 初始化 activeName
    const index1 = ref(0);
    const index2 = ref(0);
    let resizeListener = null;
    const dialogWidth = ref('60%'); // 默认宽度为60%
    const chats = ref([]);
    const currentChatId = ref(null);
    const currentChat = ref(null);

    // 使用getter获取userId
    const getUserId = computed(() => store.state.userId);

    // 监听userId变化
    watch(() => store.getters.getUserId, (newVal, oldVal) => {
      console.log(`User ID changed from ${oldVal} to ${newVal}`);
      console.log(newVal);
      loadAllChat(newVal);
      // 执行其他需要的操作
    });

    const props = defineProps({
      currentChat: Object,
    });

    
    const textList = ref([]);

    onMounted(() => {
  // 初始化时检查屏幕尺寸，并设置dialogWidth
  checkScreenSize();
  // 添加resize事件监听器
  resizeListener = window.addEventListener('resize', checkScreenSize);
  loadAllChat(store.state.userId);
});

//新建chat
async function createChatSession() {
  try {
    const response = await axios.post(`${API_URL}/create_chat`, {
      user_id: store.state.userId, // 假设的用户ID
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
    loadAllChat(store.state.userId);
  } catch (error) {
    console.error('创建聊天会话失败:', error);
  }
}

// 加载所有会话
const loadAllChat = async (userid) => {
  try {
    const response = await axios.get(`${API_URL}/get_all_chats?user_id=${userid}`);
    chats.value = response.data;
    switchChat(chats.value[0].uid);
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
  
};

//删除chat
const deleteChat = async (uid) => {
  try {
    const response = await axios.post(`${API_URL}/delete_chat`,{chat_id:uid});
    // 处理成功情况，例如从列表中删除聊天
    chats.value = chats.value.filter(chat => chat.uid !== uid);
    loadAllChat(store.state.userId);
  } catch (error) {
    // 处理错误情况
    console.error('Delete chat failed:', error);
  }
};

onUnmounted(() => {
  if (resizeListener) {
    window.removeEventListener('resize', resizeListener);
  }
});

const checkScreenSize = () => {
  const screenWidth = document.documentElement.clientWidth;
  dialogWidth.value = screenWidth <= 768 ? '100%' : '60%';
};


// 定义一个方法来解析currentChat中的history，并更新textList
function updateTextList() {
  if (props.currentChat && props.currentChat.history) {
    try {
      // 假设currentChat.history是一个JSON格式的字符串
      textList.value = JSON.parse(props.currentChat.history).messages;
      console.log('更新:'+textList.value[0].from);

    } catch (error) {
      console.error('Error parsing currentChat.history:', error);
      // 可以设置一个错误状态或者进行其他错误处理
      textList.value = [];
    }
  }
  
}

// 组件挂载时调用updateTextList来初始化textList
onMounted(updateTextList);

// 监听currentChat的变化，当它变化时更新textList
watch(() => props.currentChat, (newVal, oldVal) => {
  // 这里可以添加逻辑来处理currentChat变化时需要执行的操作
  // 例如，如果只需要在currentChat.history变化时才更新textList
  if (newVal.history !== oldVal.history) {
    updateTextList();
    console.log('再更新:'+textList.value);
  }
});
   
    
  // 定义保存帖子的方法
const saveChatContent = async () => {
  console.log('保存聊天内容:', "{\"messages\": \""+JSON.stringify(textList.value)+"\"}");

  try {
    const response = await axios.post(`${API_URL}/save_chat_content`, {
      chat_id: props.currentChat.uid,
      history: JSON.stringify({messages:  textList.value}),
      agentMemory:  props.currentChat.agentMemory,
    });
    if (response.data.status === "success") {
      console.log("Chat content saved successfully.");
    } else {
      console.error("Failed to save chat content.");
    }
  } catch (error) {
    console.error("Error saving chat content:", error);
  }
  
};

    

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


// 假设 fetchPost 是一个异步函数，用于从接口获取 post 数据
async function fetchPost() {
  try {
    // 模拟从接口获取数据
    const response = await fetch('/api/post');
    const data: Post = await response.json();
    post.value = data;
  } catch (error) {
    console.error('Failed to fetch post:', error);
  }
}

const post = ref<Post>({
  title: "标题",
  cover: "封面base64编码",
  images: ["图片A base64", "图片B base64"],
  text: "滚滚长江东逝水滚滚长江东逝水滚滚长江东逝水滚滚长江东逝水，滚滚长江东逝水。滚滚长江东逝水滚滚长江东逝水。",
  routes: [
    {
      name: "路线1",
      navigation:[
    {
      起点: {
        name: "市中心广场",
        address: "市中心大道1号",
        location: {
          latitude: 39.905489,
          longitude: 116.401245
        }
      },
      终点: {
        name: "历史博物馆",
        address: "文化路88号",
        location: {
          latitude: 39.906489,
          longitude: 116.402245
        }
      },
      交通方式: "走路",
      路程: "2公里",
      价格: "免费"
    },
    {
      起点: {
        name: "历史博物馆",
        address: "文化路88号",
        location: {
          latitude: 39.906489,
          longitude: 116.402245
        }
      },
      终点: {
        name: "科技馆",
        address: "科技路100号",
        location: {
          latitude: 39.907489,
          longitude: 116.403245
        }
      },
      交通方式: "公交车",
      路程: "3.5公里",
      价格: "2元"
    },
    {
      起点: {
        name: "科技馆",
        address: "科技路100号",
        location: {
          latitude: 39.907489,
          longitude: 116.403245
        }
      },
      终点: {
        name: "购物中心",
        address: "商业大街200号",
        location: {
          latitude: 39.908489,
          longitude: 116.404245
        }
      },
      交通方式: "打车",
      路程: "5公里",
      价格: "20元"
    },
    {
      起点: {
        name: "购物中心",
        address: "商业大街200号",
        location: {
          latitude: 39.908489,
          longitude: 116.404245
        }
      },
      终点: {
        name: "公园",
        address: "自然路50号",
        location: {
          latitude: 39.909489,
          longitude: 116.405245
        }
      },
      交通方式: "骑车",
      路程: "1.5公里",
      价格: "5元"
    }
  ],
      events: [
        {
          name: "市中心广场",
          position:"导航数据",
          description: "市中心广场是个好地方",
          images: ["图片111 base64", "图片112 base64"]
        },
        {
          name: "历史博物馆",
          position:"导航数据",
          description: "描述烫烫烫烫烫烫烫烫烫锟斤拷fcdafeasfqasaqfasfafasfqfqwfqwfwqqwqwaszxcs",
          images: ["图片121 base64", "图片122 base64"]
        },
        {
          name: "科技馆",
          position:"导航数据",
          description: "科技馆是个好地方",
          images: ["图片111 base64", "图片112 base64"]
        },
        {
          name: "购物中心",
          position:"导航数据",
          description: "购物中心是个好地方呀是个好地方",
          images: ["图片111 base64", "图片112 base64"]
        },
        {
          name: "公园",
          position:"导航数据",
          description: "公园也是好地方呀也是好地方",
          images: ["图片111 base64", "图片112 base64"]
        },
      ]
    },
    {
      name: "路线2",
      navigation: [
        {
        起点: {
        name: "火焰山",
        address: "灵台方寸山",
        location: {
          latitude: 11.11800,
          longitude: 2.22226
        }
      },
      终点: {
        name: "渣滓洞",
        address: "斜月三星洞",
        location: {
          latitude: 22.899,
          longitude: 33.878
        }
      }
    ,
    交通方式: "筋斗云",
      路程: "十万八千里",
      价格: "统统不要钱"
      }
    ],
      
      events: [
        {
          name: "途径点1",
          position:"导航数据",
          description: "描述",
          images: ["图片211 base64", "图片212 base64"]
        },
        {
          name: "途径点2",
          position:"导航数据",
          description: "描述",
          images: ["图片221 base64", "图片222 base64"]
        }
      ]
    }
  ]
});



    // 监听子组件发送的 activeName 更新事件
    watch(activeName, (newVal) => {
      console.log(`Active Name changed to: ${newVal}`);
    });

    //用户发消息
    function addTextDiv() {

      if (inputText.value.trim()) {
        //sdisable.value = true;
        textList.value.push({from:'user', content: inputText.value.trim()});
        sendPost(inputText.value.trim());
        inputText.value = '';
        saveChatContent();
      
    }
  }

  
  import { ElMessageBox } from 'element-plus'
import { RefSymbol } from '@vue/reactivity';

  const handleClose = (done: () => void) => {
    console.log(dialogWidth.value)


  ElMessageBox.confirm('退出后您所做的修改全部消失，是否确认退出？', '确认退出')
    .then(() => {
      done()
    })
    .catch(() => {
      // catch error
    })
  }


  const eventSource = ref<EventSource | null>(null);

  function sendPost(inputText: {}) {
  console.log("sendPost:", inputText);

  const postData = {
    // 这里填写你要发送的 JSON 数据
    key: inputText
  };

  fetch('http://1.94.170.22:6000/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(postData)
  })
  .then(response => {
    if (response.ok) {
      console.log("Response:", response);
      return response.body;
    } else {
      throw new Error('Network response was not ok.');
    }
  })
  .then(body => {
    const reader = body!.getReader();
    const decoder = new TextDecoder('utf-8');

    function readStream(list,index) {

      reader.read().then(({ done, value }) => {
        if (done) {
          console.log('Stream complete');
          isdisable.value=false;
          index.value++;
          return;
        }
        const chunk = decoder.decode(value, { stream: true });
        list.value[index.value]+=(chunk?.replace('undefined', ''));
        console.log('Received chunk:', chunk);
        readStream(list,index);
      });
    }
    if(listName.value === '1'){
    readStream(textList1,index1);}
    if(listName.value === '2'){
    readStream(textList2,index2);}
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });
    
}
</script>
<style scoped>

.el-container{
  height: 100%;
  position: relative;
}
.el-aside{
  height: 100%;
  width: 15%;
  background-color: var(--bg-color);
  position: absolute;
  z-index: 1000
}
.planner{
  position:absolute;
  height: 100%;
  width: 85%;
  right:0;
  background-color: var(--bg-color);
  flex-shrink: 0;
}
.el-footer{
  height:100px;
  width: 100%;
}
.chat-list-item{
  justify-content: center;
}

.add-button {
  transition: all 0.2s ease;
}
.add-button:hover {
  scale: 1.15;
}
</style>
