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
  class="waterfall"
  @scrollReachBottom="getNext"
  >
    <template v-slot:default="slotProp">
        <div class="list-item">
          <!-- <a href="#" @click="cli(slotProp.item)"> -->
            <div class="cover-wrapper">
              <img v-if="slotProp.item.cover" :src="slotProp.item.cover" data-key="cover" class="cover" />
            </div>
            <div class="brief">
              <div class="card-title">{{ slotProp.item.title }}</div>
              <div class="author-info">
                <img class="card-profile" :src="slotProp.item.author.cover">
                <div class="card-name">{{ slotProp.item.author.name }}</div>
              </div>
            </div>
          <!-- </a> -->
        </div>
      </template>
  </v3-waterfall>
    </div>
  </template>
  
  <script>
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
  .cover {
  max-width: 100%;
  width: 100%;
  max-height: none;
  height: auto;
  border-radius: 10px;
  transition: transform 0.3s ease-out;
  /* border: 1px solid black */
  }
  .cover:hover{
    transform: scale(1.2);
    transform-origin: center center;
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
    
  }
  .back {
  background-color: #fff;
  }
  .card-title {
  font-size:2vh;
  margin-top: auto;
  margin-left: auto;
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
  </style>