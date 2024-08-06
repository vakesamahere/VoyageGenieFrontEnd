<template>
  <el-container>
      <el-main >
        <el-scrollbar ref="scrollbarRef" style="max-height: 100%;">
            <div class="message-container">
              <div v-for="(message, index) in textList" :key="update" class="message-container">
                <div :class="['message-bubble', message.from === 'user' ? 'user-bubble' : 'other-bubble']">
                  <!-- <strong>{{ message.from }}:</strong>  -->
                  <!-- {{ message.content }} -->
                  <span v-html="message.content.replace(/\n/g, '<br>')"></span>
                </div>
              </div>
            </div>     
            <el-dialog
              v-model="dialogVisible"
              :width="dialogWidth"
              :before-close="handleClose"
              style="max-height: 80%;"

              align-center
              >
                <span>
                  <PostBox v-if="post" :post="post"></PostBox>                
                </span>
                <template #footer>
                    <div class="dialog-footer">
                      <el-button @click="dialogVisible = false">取消</el-button>
                      <el-button type="primary" @click="dialogVisible = false;savePost()">
                        保存
                      </el-button>
                    </div>
                </template>
            </el-dialog>

          </el-scrollbar>

      </el-main>

      <el-footer style="background-color: transparent;">
        <div class="inputbox">
            <el-input
              v-model="inputText"
              :autosize="{ minRows: 1, maxRows: 3 }"
              style="width: 70%;"
              type="textarea"
              placeholder="请输入问题"
              >
            </el-input>
            <!-- 输入框绑定 v-model 以获取用户输入 -->
            <!-- 按钮点击时触发 addTextDiv 方法 -->
            <el-button :disabled="isdisable" type="primary" @click="addTextDiv" @@keydown.enter="addTextDiv" style="margin-top: 60px;margin-left: 1%;background-color: var(--color-light);border: none;">发送</el-button>
            <el-button :disabled="textList2=='{}'" @click="dialogVisible=true;post=JSON.parse(textList2)" style="margin-top: 60px;">预览</el-button>
           
          </div>
        </el-footer>


  </el-container>
</template>
<script lang="ts" setup>
  import { watch,ref,defineProps, onMounted,onUnmounted, nextTick } from 'vue'
  import ChatBox from './ChatBox.vue';
  import PostBox from './PostBox.vue';
  import axios from 'axios'; // 导入 axios 用于发送 HTTP 请求
  
  const isdone=ref(true);
  const API_URL = 'http://1.94.170.22:5000';
  const dialogVisible = ref(false)
  const inputText = ref('')
  const textList1 = ref([]); // 存储输入文本的列表，用于生成 div
  const textList2 = ref(''); // 存储输入事件的列表，用于生成 div
  const listName = ref('1'); // 初始化 listName,用于区分列表
  const isdisable = ref(false);//按钮禁用状态
  const activeName = ref('1'); // 初始化 activeName
  const index1 = ref(0);
  const index2 = ref(0);
  let resizeListener = null;
  const dialogWidth = ref('60%');
  const dialogHeight = ref('100%');
  const props = defineProps({
    currentChat: Object,
    userId: {
    type: Number,
    required: true,
  }
  });
  const update=ref(0);
  
  const textList = ref([]);

const scrollbarRef = ref()
const innerRef = ref()
async function setScrollToBottom() {
  await nextTick()
  const max = Number.MAX_SAFE_INTEGER
  scrollbarRef.value!.setScrollTop(max)
}
function trans(tl2){
  // tl2 = textList2 -> string of json
  // need to get the routes:string of json(list)
  if(tl2===''){
    return encodeURIComponent('[]')
  }
  const j = JSON.parse(tl2)
  if(!j.routes){
    return encodeURIComponent('[]')
  }
  return encodeURIComponent(JSON.stringify(j.routes.flatMap(route => 
  route.events.map(event => ({
  place: '',
  title: event.name,
  title2: '',
  description: event.description,
  image: event.images[0] || ''
  }))
  )));
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
// 定义一个方法来解析currentChat中的history，并更新textList
function updateTextList() {
if (props.currentChat && props.currentChat.history) {
  try {
    // 假设currentChat.history是一个JSON格式的字符串
    if(JSON.parse(props.currentChat.history).messages){
      textList.value = JSON.parse(props.currentChat.history).messages;
    }else{
      textList.value = []
    }
    
    textList2.value = props.currentChat.agentMemory;
    
     console.log('更新:'+textList2.value);
  } catch (error) {
    console.error('Error parsing currentChat.history:', error);
    // 可以设置一个错误状态或者进行其他错误处理
    textList.value = [];
    textList2.value = "{}";
  }
}

}
// 组件挂载时调用updateTextList来初始化textList
onMounted(updateTextList);
// 监听currentChat的变化，当它变化时更新textList
watch(() => props.currentChat, (newVal, oldVal) => {

    updateTextList();
    console.log('再更新:'+textList.value);
    setScrollToBottom()
  
}, { deep: true });
watch(() => textList, (newVal, oldVal) => {
  setScrollToBottom()
});

const savePost = async () => {
 
console.log(JSON.stringify(JSON.parse(textList2.value).routes[0]))
  try {
    const response = await axios.post(`${API_URL}/save_generated_post`, {
      user_id: props.userId,
      title: JSON.parse(textList2.value).title,
      cover:  JSON.parse(textList2.value).cover,
      images:JSON.stringify(["https://i2.hdslb.com/bfs/archive/9473235936af81b4f82ae56140ee5bc5914b1a0a.jpg"]),
      text:JSON.parse(textList2.value).text,
      routes:JSON.stringify([{"events": [{"name": "梅里雪山", "images": ["https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fss2.meipian.me%2Fusers%2F436572%2F78bddc745e5c44b7a9366e460fe9f997.jpeg%3Fmeipian-raw%2Fbucket%2Fivwen%2Fkey%2FdXNlcnMvNDM2NTcyLzc4YmRkYzc0NWU1YzQ0YjdhOTM2NmU0NjBmZTlmOTk3LmpwZWc%3D%2Fsign%2Fd56330df5186d8b8b2c87f59de9bfe18.jpg&refer=http%3A%2F%2Fss2.meipian.me&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1725500984&t=fa6c96112cf304aab4497d47bafba54e"], "description": "位于香格里拉德钦县，别称太子雪山。有十三座超过六千米的雪山，是藏区ツ八大神山之首。主峰卡瓦格博峰，海拔6740米。无数人至此只为看一眼梅里雪山的日照金山:日出时分阳光下，梅里雪山的雪峰上镀上了一层耀眼的金色，天地之间霎时光芒万丈"}, {"name": "新龙红山", "images": ["https://n.sinaimg.cn/spider20231212/99/w1500h999/20231212/d5ac-6aeb9427142f55ace58d4a84a2add9a4.jpg"], "description": "独特的丹霞地貌以景区标志性的两座红山而闻名，被誉为爱情的象征:一吻千年这次打卡红山景区，除了自然就是自己，粉红的梦幻之境小众但不缺美景!!!超适合拍照打卡的地方，小情侣的话一定要纪念哦~"}, {"name": "高原草甸", "images": ["https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fss2.meipian.me%2Fusers%2F4311789%2F2d84814fe1324fab9b41dd14d47c2991.jpg%3Fmeipian-raw%2Fbucket%2Fivwen%2Fkey%2FdXNlcnMvNDMxMTc4OS8yZDg0ODE0ZmUxMzI0ZmFiOWI0MWRkMTRkNDdjMjk5MS5qcGc%3D%2Fsign%2F05e261227180795d4749544e1dbf5f07.jpg&refer=http%3A%2F%2Fss2.meipian.me&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1725500987&t=4df294ca2b12d2d6a7e6819241cabe7d"], "description": "每年夏天都要去格聂待一个月时间7月的天气 偶尔晚上还需要烤火和朋友徒步去深山牧场骑麈托穿梭在原始森林里 捡菌子早上起来沿着村公路走看云海真的是仙境一般的地方"}, {"name": "雪山", "images": ["https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fss2.meipian.me%2Fusers%2F436572%2F7ed2d98f9a994717bccaae90fa627949.jpeg%3Fmeipian-raw%2Fbucket%2Fivwen%2Fkey%2FdXNlcnMvNDM2NTcyLzdlZDJkOThmOWE5OTQ3MTdiY2NhYWU5MGZhNjI3OTQ5LmpwZWc%3D%2Fsign%2Ffb136efddd7268bd376c42ef1cc81da6.jpg&refer=http%3A%2F%2Fss2.meipian.me&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1725501107&t=88282551955595752076445e06fe7350"], "description": "三座雪山，造型各异，遥相呼应"}]}]),
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
  
// 定义保存帖子的方法
const saveChatContent = async () => {
  console.log('保存聊天内容:', "{\"messages\": \""+JSON.stringify(textList.value)+"\"}");
  try {
    const response = await axios.post(`${API_URL}/save_chat_content`, {
      chat_id: props.currentChat.uid,
      history: JSON.stringify({messages:  textList.value}),
      agentMemory:  textList2.value===''?'{}':textList2.value.replace(/\\n/g, ''),

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
    setScrollToBottom()
    if (inputText.value.trim()) {
      isdisable.value = true;
      textList.value.push({from:'user', content: inputText.value.trim()});
     // alert(textList.value);
      const contentString = textList.value.map(item => item.content).join('\n');     
      sendPost(contentString);
      inputText.value = '';
      saveChatContent();
      
  }
}

import { ElMessageBox, sliderEmits } from 'element-plus'
import SendPost from '@/SendPost.vue';
import { k } from 'vite/dist/node/types.d-aGj9QkWt';
import { parse } from 'vue/compiler-sfc';
import { ElScrollbar } from 'element-plus'

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
async function sendPost(inputText: {}) {
console.log("sendPost:", inputText);
const postData = {
  // 这里填写你要发送的 JSON 数据
  message: inputText,
  rep:"%n"
};
console.log("postData:", postData);

fetch('http://1.94.170.22:6001/chat', {
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
  index1.value=textList.value.length;
  index2.value=textList2.value.length;// ?
  let currentMessage2 = null;
  let currentMessage = null;
  const isstart=ref(true);
  // console.log('event'+textList2.value[index2.value]);
  async function readStream(list,list2,index,index2) {
      let need_read = false
      let slicedChunk = ''
      reader.read().then(({ done, value }) => {
      const txt = decoder.decode(value, { stream: true });
      const chunks = txt.split(/\n\n/); // 按 \n\n 分割
      chunks.slice(0, -1).forEach((text) =>{
      const chunk = text.replace(/%n/g, '\n').trim(); // 替换 %n 为 \n
      if (chunk.includes('data: [end]')) {
        // alert(chunk)
        console.log('Stream complete');
        isdisable.value=false;
        index.value++;
        index2.value++;
        saveChatContent();
        return;
      }
      else if (chunk.includes('event: add')) {
      slicedChunk = chunk.slice(chunk.indexOf('data:') + 5).trim();
      if (!currentMessage) {
        currentMessage = {
          from: 'Agent',
          content: ''
        };   
        // index.value++;    
      } 
      // currentMessage.content += slicedChunk;
      need_read=true
      // update.value++;
      // console.log(list.value[index.value]);
      // console.log(index.value)
    }
    else if (chunk.includes('event: event')) {
      if(isstart){textList2.value='';isstart.value=false}
      if (chunk.includes('data: [gen_post]')){
      if(chunk.includes('data: [gen_post]end')){
        isdone.value=false
      }
      const slicedChunkE = chunk.slice(chunk.indexOf('data: [gen_post]') + 16).trim();
      currentMessage2 += slicedChunkE;      
      list2.value += currentMessage2.replace(/^nullstart/, '').replace(/end$/, '');//按理说，一开始是空字符，没毛病
      console.log('List 2',list2.value);
    }
  }
      console.log('Received chunk:', chunk);

      function typeWriterEffect(chunk: string, delay: number = 20): Promise<void> {
        return new Promise((resolve) => {
          let i = 0;
          const interval = setInterval(() => {
            if (i < chunk.length) {
              currentMessage.content += chunk[i];
              update.value++;
              i++;
              setScrollToBottom()
            } else {
              clearInterval(interval);
              resolve(); // 当打字机效果完成时，resolve Promise
            }
          }, delay);
        });
      }

      if(need_read){
        typeWriterEffect(slicedChunk).then(()=>{
          
          list.value[index.value] = currentMessage;
          readStream(list,list2,index,index2);
        })
      }else{
        readStream(list,list2,index,index2);
      }
    })});
  }
  readStream(textList,textList2,index1,index2);
})
.catch(error => {
  console.error('There was a problem with the fetch operation:', error);
});
  
}
</script>
<style scoped>
.scrollbar-demo-item {
display: flex;
align-items: center;
justify-content: center;
height: 1000px;
margin: 10px;
text-align: center;
border-radius: 4px;
background: var(--el-color-primary-light-9);
color: var(--el-color-primary);
}
.el-footer {
position:absolute;
background-color:#fff;
bottom: 0px;
width: 100%;
text-align: center;
height: 90px;
line-height: 70px;
padding: 0px;
}
.el-main{
position:absolute;
top: 0px;
left: 0px;
right: 0px;
bottom: 90px;
padding: 20px;
height: auto ;
overflow:visible;
background-color: var(--bg-color);
}
.inputbox{
position: absolute;
flex-direction: row;
bottom: 60px;
left: 15%;
right: 15%;
width:70%;
z-index: 10;
}
.el-main{
  padding: 0;
  margin: 0;
  border: none;
}

.message-container {
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;
}

.message-bubble {
  max-width: 70%;
  padding: 10px;
  border-radius: 15px;
  position: relative;
  word-wrap: break-word;
}

.user-bubble {
  align-self: flex-end;
  background-color: rgba(215, 118, 10, 0.9);
  color: white;
}

.other-bubble {
  align-self: flex-start;
  /* background-color: #e5e5ea; */
  background-color: #181818;
  color: #eee;
}

.sending {
  position: relative;
  overflow: hidden;
}

.sending::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent);
  animation: shine 2s infinite;
}

@keyframes shine {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.message-content {
  white-space: pre-wrap;
}
</style>