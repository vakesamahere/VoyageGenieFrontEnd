<template>
    <div class="father-box back" id="waterfallContainer">
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
  class="waterfall"
  @scrollReachBottom="getNext"
  >
    <template v-slot:default="slotProp">
        <div class="list-item">
          <a href="#" @click="cli(slotProp.item)">
            <div class="cover-wrapper">
              <img v-if="slotProp.item.cover" :src="slotProp.item.cover" data-key="cover" class="cover" />
            </div>
            <div class="brief">
              <p class="card-title">{{ slotProp.item.title }}</p>
            </div>
          </a>
          <div class="outline-bottom">
            <p class="article-tags">
              <span v-for="tag of slotProp.item.tags+''" :key="tag" class="tag">
                {{ tag }}
              </span>
              <el-row>
                <el-col :span="4"></el-col>
                <el-col :span="4"></el-col>
                <el-col :span="4"></el-col>
                <el-col :span="4"><el-button color="white" class="button-type" v-if="show(slotProp.item.public)" @click="postAndcancel(slotProp.item.uid)">发布</el-button><el-button color="white" class="button-type"v-if="!show(slotProp.item.public)" @click="postAndcancel(slotProp.item.uid)">取消</el-button></el-col>
                <el-col :span="2"></el-col>
                <el-col :span="4"><el-button color="white"  class="button-type" @click="del(slotProp.item.uid)">删除</el-button></el-col>
              </el-row>
            </p>
          </div>
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
    },
    setup() {
    const store = useStore();
    const userId = computed(() => store.getters.getUserId);

    // 监听userId变化
    watch(() => store.getters.getUserId, (newVal, oldVal) => {
      console.log(`User ID changed from ${oldVal} to ${newVal}`);
      // 执行其他需要的操作
    });

    return { userId };
  },
    data(){
      return{
        list:[],
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
        gapRatio:0.01,
      }
    },
    computed:{
      nOfCol(){
        const ratio =this.containerWidth*0.618*9/this.winHeight;
        let res = Math.floor(ratio)
        if(res>5){res=5}
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
      show(a){
        if(a==false){
          return true
        }
        return false
      },
      async del(id){
        try{
          const data={"post_id":id};
          const response=await axios.post('http://1.94.170.22:5000/delete_post', data);
          this.response=response.data;
        }catch (error) {
        console.error('There was an error sending the data!', error);
        this.response = error.message;
      }
      this.reranderV()
      this.vvkey+=1;
      this.Getposts();
      alert('2');
      },
      async postAndcancel(id){
        try{
          const data={"post_id":id};
          const response=await axios.post('http://1.94.170.22:5000/toggle_public', data);
          this.response=response.data;
        }catch (error) {
        console.error('There was an error sending the data!', error);
        this.response = error.message;
      }
      this.reranderV()
      this.vvkey+=1;
      this.Getposts();
      },
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
      async Getposts(){
        try{
          const response=await axios.get('http://1.94.170.22:5000/get_user_posts?user_id='+this.userId);
          this.list=response.data;
        }catch(error){
          console.error('There was an error fetching the data!', error);
          this.response=error.messgae;
        }
      },
    },
    mounted(){
      window.addEventListener('resize',this.reranderV);
      this.reranderV()
      this.vvkey+=1;
      this.Getposts();
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
  border-radius: 15px;
  overflow: hidden;
  background-color: lightblue;
  filter: drop-shadow(0 0 15px #555) drop-shadow(0 0 45px #555);
  }
  .list-item:hover{
  filter: drop-shadow(0 0 5px #000) drop-shadow(0 0 15px #111) drop-shadow(0 0 45px #111);
  }
  .cover {
  max-width: 100%;
  width: 100%;
  max-height: none;
  height: auto;
  }
  .back {
  background-color: white;
  }
  .card-title {
  font-size:larger;
  margin-top: auto;
  margin-left: auto;
  }
  a {
    text-decoration: none;
    color: black;
    font-weight: bold;
  }
  .button-type{
    width: 100%;
  }
  </style>