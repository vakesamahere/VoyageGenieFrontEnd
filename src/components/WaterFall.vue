<template>
    <div class="father-box back" id="waterfallContainer">
      <p style="height: 20px;"></p>
    <v3-waterfall ref="wf"
  :key="vvkey"
  :list="list"
  :colWidth="widthOfCol"
  :gap="widthOfGap"
  :virtual-time="400"
  :scrollBodySelector="isLimit ? '.limit-box' : ''"
  :isMounted="isMounted"
  :isLoading="loading"
  :isOver="over"
  :animation="false"
  :scrollReachBottom="displayMore"

  class="waterfall"
  >
    <template v-slot:default="slotProp">
        <div class="list-item">
          <!-- <a href="#" @click="cli(slotProp.item)"> -->
            <div class="cover-wrapper" @click="cli(slotProp.item)">
              <img v-if="slotProp.item.cover" :src="slotProp.item.cover" data-key="cover" class="cover" />
            </div>
            <div class="brief">
              <div class="card-title">{{ slotProp.item.title }}</div>
              <div class="author-info">
                <!-- <img class="card-profile" :src="slotProp.item.author.cover"> -->
                <!-- start of author info -->
                <el-popover
                  show-after="500"
                  :title="slotProp.item.authorName"
                  trigger="hover"
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
                    <el-avatar :src="slotProp.item.authorCover" circle class="author-avatar" @click="goUserInfo"></el-avatar>
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
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  export default{
    props:{
      msg:String,
      list:[]
    },
    data(){
      return{
        containerWidth:0,
        containerHeight:0,
        winWidth:0,
        winHeight:0,
        loading:false,
        over:false,
        isMounted:true,
        isLimit:false,
        vkey:0,
        vvkey:0,
        gapRatio:0.01
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
        return res
      },
      widthOfCol(){
        const res = this.containerWidth*(1-this.gapRatio*(this.nOfCol+1))/this.nOfCol
        // console.log(res);
        return Math.floor(res*0.98)
      },
      widthOfGap(){
        return this.containerWidth*this.gapRatio
      }
    },
    methods:{
      cli(item){
        console.log(item);
        this.$emit('enterPost',item)
      },
      verifyRerander(v){
        setTimeout(() => {
          console.log(v,this.vkey);
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
      }
    },
    mounted(){
      window.addEventListener('resize',this.reranderV);
      this.reranderV()
      this.vvkey+=1;
    }
  };
  </script>
  
  <style scoped>
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
    color: black;
    align-self: center;
  }
  .back {
  background-color: #fff;
  }
  .card-title {
  font-size:2vh;
  margin-top: auto;
  margin-left: auto;
  color: black;
  }
  a {
    text-decoration: none;
    color: black;
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
    transition: all 0.4s ease-out 0.4s;
    margin-right: 2%;
  }
  .author-avatar:hover {
    scale: 1.3;
    transform: translateX(10%) translateY(-10%);
  }
  .subscribe-button{
    cursor: pointer;
  }
  </style>