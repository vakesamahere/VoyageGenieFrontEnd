<template>
  <div class="father-box back" id="waterfallContainer">
    <p style="height: 20px;"></p>
  <v3-waterfall ref="wf"
:key="vvkey"
:list="localList"
:colWidth="widthOfCol"
:gap="widthOfGap"
:scrollBodySelector="isLimit ? '.limit-box' : ''"
:isMounted="isMounted"
:isLoading="loading"
:isOver="over"
:animation="true"
@scroll-reach-bottom="displayMore"
:virtualLength="500"
:distanceToScroll="800"
overText="over"

class="waterfall"
>
  <template v-slot:default="slotProp">
      <div class="list-item">
        <!-- <a href="#" @click="cli(slotProp.item)"> -->
          <div class="cover-wrapper" @click="cli(slotProp.item)">
            <img v-if="slotProp.item.cover" :src="slotProp.item.cover" data-key="cover" class="cover"/>
          </div>
          <div class="brief">

            <div class="card-container">
              <div class="card-title">{{ slotProp.item.title }}</div>
              <div class="buttons-container">
                <!-- start of like button -->
                <div class="post-i-button" @click="handleLike(slotProp.item)">
                  <div class="col-trans">
                    <transition name="slide-du">
                        <el-icon v-if="getButtonType(slotProp.item.islike)"><SuccessFilled /></el-icon>
                        <el-icon v-else><Pointer /></el-icon>
                    </transition>
                  </div>
                </div>
                <!-- end of like button -->
                <!-- start of collect button -->
                <div class="post-i-button" @click="handleCollect(slotProp.item)" >
                  <div class="col-trans">
                    <transition name="slide-du">
                      <el-icon v-if="getButtonType(slotProp.item.iscollect)"><StarFilled /></el-icon>
                      <el-icon v-else><Star /></el-icon>
                    </transition>
                  </div>
                </div>
                <!-- end of collect button -->
                <!-- start of public button -->
                <div v-if="editable" class="post-i-button" @click="handlePublic(slotProp.item)" >
                  <div class="col-trans">
                    <transition name="slide-du">
                      <el-icon v-if="getButtonType(slotProp.item.ispublic)"><View /></el-icon>
                      <el-icon v-else><Hide /></el-icon>
                    </transition>
                  </div>
                </div>
                <!-- end of public button -->
                <!-- start of delete button -->
                <div v-if="editable" class="post-i-button" @click="handleDelete(slotProp.item)" >
                  <div class="col-trans">
                      <el-icon><Delete /></el-icon>
                  </div>
                </div>
                <!-- end of delete button -->
              </div>
            </div>
            <div class="author-info">
              <!-- start of author info -->
              <el-popover
                :title="slotProp.item.authorName"
                trigger="hover"
                :show-after="750"
                >
                <div class="menu-author">
                  <div @click="goUserSafety" class="menu-author-item">
                    <div class="subscribe-button" @click="handleSubscribe(slotProp.item)">
                      <div v-if="slotProp.item.subscribe">
                        <el-icon><Close /></el-icon> 取消关注
                      </div>
                      <div v-else>
                        <el-icon><Plus /></el-icon> 关注
                      </div>
                    </div>
                  </div>
                </div>
                <template #reference>
                  <el-avatar :src="slotProp.item.authorCover" circle class="author-avatar" @click="goUserInfo(slotProp.item.author)"></el-avatar>
                </template>
              </el-popover>
              <!-- end of author info -->
              <div class="card-name">{{ slotProp.item.authorName }}</div>
            </div>
          </div>
        <!-- </a> -->
      </div>
    </template>
</v3-waterfall>

  <!-- start of loading icon -->
  <transition name="loading-trans">
     <div class="loading-block" v-show="loading">
      <!-- loading -->
      <div class="loader">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
     </div>
   </transition>
  <!-- end of loading icon -->
  </div>
  <!-- start of post-displaying -->
  <transition name="trans-post">
    <div v-if="isPostDisplaying" class="post-display-box" :key="postVkey">
      <PostDisplaying :postId="postDisplayingId" class="post-display" @closeSelf="closePost" />
    </div>
  </transition>
  <!-- end of post-displaying -->
</template>

<script>
import axios from 'axios';
import { Pointer, Star } from '@element-plus/icons-vue';
import PostDisplaying from '../../displayPost/PostDisplaying.vue';
export default{
  props:{
    msg:String,
    list:[],
    editable:false,
    trigger:0,
    refresher:0
  },
  components:{
    PostDisplaying
  },
  watch: {
    list:{
      handler(newValue,oldValue){
        this.localList=[]
        // this.vvkey+=1;
        this.localList=this.nextChunk
        if(newValue.length!==0){
          //end of loading
          this.loading=false
          this.$emit('loadingChange',false)
        }else{
          //start of loading
          this.loading=true
          this.$emit('loadingChange',true)
        }
      },deep:true
    },
    router:{
      handler(_,__){
        // alert(1)
        this.isPostDisplaying=false
      },deep:true
      // immediate:true
    },
    trigger:{
      handler(_,__){
        this.loading=false
      }
    },
    refresher:{
      handler(newv,oldv){
        this.vvkey+=1
      }
    }
  },
  data(){
    return{
      containerWidth:0,
      containerHeight:0,
      winWidth:0,
      winHeight:0,
      loading:true,
      over:false,
      isMounted:true,
      isLimit:false,
      vkey:0,
      vvkey:0,
      gapRatio:0.01,
      localList:[],
      isPostDisplaying:false,
      postDisplayingId:0,
      postVkey:0
    }
  },
  computed:{
    nOfCol(){
      const ratio =this.containerWidth*0.618*9/this.winHeight;
      let res = Math.floor(ratio)
      if(res>6){res=6}
      if(res>3 && res<5){res=4}
      if(res<=3){res=2}
      console.log('nOfCol:',res,this.containerWidth,this.winHeight);
      return res?res:5
    },
    cuIndex(){
      return this.localList.length
    },
    nextEnd(){        
      return Math.min(this.localList.length+5*this.nOfCol,this.list.length)
    },
    nextChunk(){
      // alert(this.nextEnd);
      return this.list.slice(this.cuIndex,this.nextEnd)
    },
    widthOfCol(){
      const res = this.containerWidth*(1-this.gapRatio*(this.nOfCol+1))/this.nOfCol
      // console.log(res);
      return Math.floor(res*0.98)
    },
    widthOfGap(){
      return this.containerWidth*this.gapRatio
    },
    router(){
      return this.$store.state.router
    }
  },
  methods:{
    handleLike(item) {
      console.log('like');
      if(item.islike===undefined){
        item.islike=0
      }
      item.islike = 1 - item.islike;
      axios.post('http://1.94.170.22:5000/toggle_like',{
          "post_id":item.uid,
          "user_id":this.$store.state.userId
      })
    },
    handleCollect(item) {
      console.log('collect');
      if(item.iscollect===undefined){
        item.iscollect=0
      }
      // 发送请求 toggling collect status
      item.iscollect = 1 - item.iscollect;
      axios.post('http://1.94.170.22:5000/toggle_collection',{
          "post_id":item.uid,
          "user_id":this.$store.state.userId
      })
    },
    handlePublic(item) {
      console.log('public');
      if(item.ispublic===undefined){
        item.ispublic=0
      }
      // 发送请求 toggling public status
      item.ispublic = 1 - item.ispublic;
      axios.post('http://1.94.170.22:5000/toggle_public',{
          "post_id":item.uid
      })
    },
    handleDelete(item) {
      const confirmDelete = confirm('Are you sure you want to delete this post?');
      if (confirmDelete) {
        this.$emit('deletePost', item);
        try {
          this.localList.slice(this.localList.indexOf(item),1)
        } catch (error) {
          console.log(error);
        }
      }
    },
    getButtonType(bit) {
      // console.log(bit)
      return (bit === 0) || (bit ===undefined) ? false : true;
    },
    cli(item){
      // console.log(item);
      // this.$emit('enterPost',item)
      this.postDisplayingId = item.uid; 
      this.isPostDisplaying=true;
      // alert(this.isPostDisplaying)
    },
    displayMore(){
      this.localList=this.localList.concat(this.nextChunk)
    },
    verifyRerander(v){
      setTimeout(() => {
        // console.log(v,this.vkey);
        if(this.vkey==v){
          this.vvkey+=1;
        }
      }, 200);
    },
    reranderV(){
      this.winWidth=window.innerWidth;
      this.winHeight=window.innerHeight;
      this.containerWidth=document.getElementById('waterfallContainer').getBoundingClientRect().width
      console.log(document.getElementById('waterfallContainer').getBoundingClientRect().width);
      this.vkey+=1
      this.verifyRerander(this.vkey)
    },
    closePost() {
      this.isPostDisplaying=false,
      this.postVkey+=1
    },
    handleSubscribe(target){
      console.log('subscribe');
      const targetId = target.author
      axios.post('http://1.94.170.22:5000/toggle_subscribe',{
          "target_id":targetId,
          "user_id":this.$store.state.userId
      })
      if(target.subscribe==null){
        target.subscribe=0
      }
      target.subscribe = 1-target.subscribe
    },
    async autoRefresh(){
      // this.localList=this.localList.concat([])
      await setTimeout(() => {
        this.autoRefresh()
      }, 500);
    },
    goUserInfo(authorId){
      this.$emit('goUserInfo',authorId)
    },
    handleEscKey(event) {
      if (event.key === 'Escape') {
        this.isPostDisplaying=false;
        this.loading=false;
      }
    },
  },
  mounted(){
    window.addEventListener('resize',this.reranderV);
    window.addEventListener('keydown',this.handleEscKey);

    setTimeout(() => {
      this.localList=[]
      const n = this.nOfCol
      this.localList=this.localList.concat(this.nextChunk)
      this.reranderV()
      this.vvkey+=1;
    }, 100);
    this.autoRefresh()
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.handleEscKey);
  }
};
</script>

<style scoped>
* {
  color: #bbb
}
.author-info *:hover,
.cover-wrapper:hover,
.card-title:hover {
  display: flex;
  flex-direction: row;
  cursor: pointer;
  color: #fff;
}

.father-box {
overflow-y:scroll;
width: 100%;
}
::-webkit-scrollbar {
display: none
}
.list-item {
/* border-radius: 15px; */
overflow: hidden;
background-color: transparent;
/* filter: drop-shadow(0 0 5px #555) drop-shadow(0 0 1px #555); */
}
.list-item:hover{
  background-color: transparent;
/* filter: drop-shadow(0 0 5px #000) drop-shadow(0 0 15px #111) drop-shadow(0 0 45px #111); */
}
.cover-wrapper {
max-width: 100%;
width: 100%;
max-height: none;
height: auto;
border-radius: 10px;
overflow: hidden;
font-size: 0; /*非常重要*/
/* border: 1px solid black */
}
.cover-wrapper:hover {
  background-color: rgba(0,0,0,0.5);
}
.cover {
max-width: 100%;
width: 100%;
max-height: none;
height: auto;
border-radius: 10px;
transition: transform 0.3s ease-out;
background-color: black;
/* border: 1px solid black */
}
.cover:hover{
  transform: scale(1.2);
  transform-origin: center center;
  opacity: 0.8;
}
.card-profile{
  height: 2vw;
  width: 2vw;
  object-fit: cover;
  border-radius: 50%;
  margin: 0.2vw;
  /* border: 1px solid black */
}
.card-name{
  /* color: black; */
  align-self: center;
}
.back {
background-color: var(--bg-color);
}
.card-title {
font-size:1.5vh;
margin-top: auto;
margin-left: auto;
flex:1
/* color: black; */
}
a {
  text-decoration: none;
  /* color: black; */
  font-weight: bold;
}
.author-info {
  display: flex;
  flex-direction: row;
}
.brief {
  max-height: 10vh;
  /* border: 1px solid black; */
}

.author-avatar {
  height: 2vw;
  width: 2vw;
  object-fit: cover;
  align-self: center;
  transition: all 0.4s ease-out 0.1s;
  margin-right: 2%;
}
.author-avatar:hover {
  scale: 1.1;
  transform: translateX(5%) translateY(-5%);
}
.subscribe-button{
  cursor: pointer;
}



.buttons-container {
  display: flex;
  gap:0.4vw;
  margin-right: 0.2vw;
  height: 100%;
}
.card-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.post-i-button {
  margin: 0;
  background-color: transparent;
  border: none;
  flex-shrink: 0;
  scale: 1.1;
  opacity: 0.9;
  cursor: pointer;
}



.slide-du-enter-active, .slide-du-leave-active {
transition: all 0.3s;
}
.slide-du-enter-from {
position: absolute;
transform: translateY(100%);
opacity: 0;
scale: 2
}
.slide-du-leave-to {
position: absolute;
transform: translateY(-100%);
opacity: 0;
scale: 0.5
}
.col-trans {
display: flex;
flex-direction: column;
}
.loading-block {
font-size: 10vh;
position: absolute;
top: 50%;
left: 56.25%; /*侧栏占15%时，15%+85%/2 */
transform: translateX(-50%) translateY(-50%);
}

.loading-trans-enter-active, .loading-trans-leave-active {
transition: all 0.4s ease-in-out
}
.loading-trans-enter-from {
/* transform: translateX(-150%) translateY(-50%); */
opacity: 0;
}
.loading-trans-leave-to {
/* transform: translateX(50%) translateY(-50%); */
opacity: 0;
}

.trans-post-enter-active, .trans-post-leave-active {
transition: all 0.2s ease-in-out
}
.trans-post-enter-from {
/* transform: translateX(-150%) translateY(-50%); */
opacity: 0;
}
.trans-post-leave-to {
/* transform: translateX(50%) translateY(-50%); */
opacity: 0;
}

.loading-block * {
margin: 0;
padding: 0;
box-sizing: border-box;
}
.loading-block {
display: flex;
justify-content: center;
align-items: center;
min-height: 100vh;
background-color: transparent;
z-index: 100;
}
.loader {
position: relative;
width: 200px;
height: 200px;
overflow: hidden;
-webkit-box-reflect: below 1px linear-gradient(transparent, #0005);
}
.loader:hover {
background-color: var(--color-light);
box-shadow: 0 0 5px var(--color-light),
            0 0 25px var(--color-light),
            0 0 25px var(--color-light),
            0 0 200px var(--color-light);
}
.loader span {
position: absolute;
display: block;
}
.loader span:nth-child(1){
top: 0;
left: -100%;
width: 100%;
height: 40px;
background: linear-gradient(90deg,transparent,var(--color-light));
animation: animate1 1s linear infinite;
animation-delay: 0s;
}
@keyframes animate1 {
0% {
  left: -100%;
}
100% {
  left:  100%;
}
}

.loader span:nth-child(3){
bottom: 0;
left: -100%;
width: 100%;
height: 40px;
background: linear-gradient(270deg,transparent,var(--color-light));
animation: animate3 1s linear infinite;
animation-delay: 0s;
}
@keyframes animate3 {
0% {
  left: 100%;
}
100% {
  left: -100%;
}
}

.loader span:nth-child(2){
right: 0;
top: -100%;
width: 40px;
height: 100%;
background: linear-gradient(180deg,transparent,var(--color-light));
animation: animate2 1s linear infinite;
animation-delay: 0.5s;
}
@keyframes animate2 {
0% {
  top: -100%;
}
100% {
  top: 100%;
}
}

.loader span:nth-child(4){
left: 0;
top: -100%;
width: 40px;
height: 100%;
background: linear-gradient(0deg,transparent,var(--color-light));
animation: animate4 1s linear infinite;
animation-delay: 0.5s;
}
@keyframes animate4 {
0% {
  top: 100%;
}
100% {
  top: -100%;
}
}

.waterfall{
min-height: 100vh;
}
.post-display-box {
}
</style>