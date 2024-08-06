<template>
  <div class="container-box">
      <div class="search-container">
          <el-menu
              default-active="0"
              mode="vertical"
              background-color="var(--bg-color)"
              text-color="var(--display-text-color)"
              active-text-color="var(--color-light)"
              @select="handleSelect"
              class="search-history"
              :key="vkey"
          >
              
              <el-menu-item
                  index="0"
                  @click="loadMyPosts()"
                  class="search-item"
                  >
                  Notes
              </el-menu-item>
              <el-menu-item
                  index="1"
                  @click="loadMyLikes()"
                  class="search-item"
                  >
                  Likes
              </el-menu-item>
              <el-menu-item
                  index="2"
                  @click="loadMyCollections()"
                  class="search-item"
                  >
                  Collections
              </el-menu-item>
              <el-menu-item
                  index="3"
                  @click="loadMyInterests()"
                  class="search-item"
                  >
                  Interests
              </el-menu-item>
          </el-menu>
      </div>
      <div class="waterfall-container">
          <waterfall v-if="wfDisplay" class="waterfall" :list="posts" :editable="editable" :trigger="wfTrigger" :refresher="wfRefresher" @enterPost="handleEnterPost" @deletePost="handleDelete" @loadingChange="loadingChange"></waterfall>
      </div>
  </div>
</template>


<script>
import waterfall from './WaterFall.vue'
import searchbox from './SearchBox.vue'
import axios from 'axios'
import {_test} from '@/main.js'
import testCovers from '@/assets/test_covers'
export default {
  props:{
      searchKeyword:String
  },
  components:{
      waterfall,
      searchbox
  },
  data(){
      return {
          posts:[],
          windowWidth:0,
          windowHeight:0,
          wfDisplay:false,
          selectIndex:0,
          editable:false,
          vkey:0,
          wfLoading:true,
          wfTrigger:0,
          wfRefresher:0
      }
  },
  computed: {
      userId() {
          return this.$store.state.userId
      },
      router() {
        return this.$router
      }
  },
  watch:{
    userId:{
      handler(_,__){
        this.vkey+=1;
        this.loadMyPosts();
      }
    },
    router:{
      handler(_,__){
        if(this.wfLoading){
          switch(this.selectIndex){
            case 0:
              this.loadMyPosts();
              break;
            case 1:
              this.loadMyLikes();
              break;
            case 2:
              this.loadMyCollections();
              break;
            case 3:
              this.loadMyInterests();
              break;
            default:
              //
          }
        }
      },
      deep:true,
      immediate:true
    }
  },
  methods:{
      ifEmpty(){
        if(this.posts.length===0){
          this.wfTrigger+=1
        }
      },
      loadingChange(value){
        this.wfLoading = value
      },
      handleDelete(item){
        axios.post('http://1.94.170.22:5000/delete_post',{
            "post_id":item.uid
        })
        this.posts.splice(this.posts.indexOf(item),1)
        this.wfRefresher+=1
      },
      async clearPosts(){
          this.posts=[]
          this.wfRefresher+=1;
      },
      async loadMyPosts(){
        this.clearPosts();
        this.selectIndex=0;
        this.editable=true;
        const res = await axios.get(`http://1.94.170.22:5000/get_user_posts?user_id=${this.userId}&target_id=${this.userId}`);
        console.log(res);
        setTimeout(() => {
            this.posts=res.data
            this.ifEmpty()
        }, 700);
      },
      async loadMyLikes(){
          this.clearPosts();
          this.editable=false;
          this.selectIndex=1;
          const res = await axios.get(`http://1.94.170.22:5000/get_user_likes?user_id=${this.userId}&target_id=${this.userId}`);
          console.log(res);
          setTimeout(() => {
              this.posts=res.data
              this.ifEmpty()
          }, 700);
      },
      async loadMyCollections(){
          this.clearPosts();
          this.editable=false;
          this.selectIndex=2;
          const res = await axios.get(`http://1.94.170.22:5000/get_user_collections?user_id=${this.userId}&target_id=${this.userId}`);
          console.log(res);
          setTimeout(() => {
              this.posts=res.data
              this.ifEmpty()
          }, 700);
      },
      async loadMyInterests(){
          this.clearPosts();
          this.editable=false;
          this.selectIndex=3;
          const res = await axios.get(`http://1.94.170.22:5000/get_user_subscribes_post?user_id=${this.userId}&target_id=${this.userId}`);
          console.log(res);
          setTimeout(() => {
              this.posts=res.data
              this.ifEmpty()
          }, 700);
      },
      handleEnterPost(item){
          this.$emit('enterPost',item.uid)
      },
      updateWindowSize(){
          this.windowWidth=window.innerWidth;
          this.windowHeight=window.innerHeight;
      },
      async del(id){
        try{
          const data={"post_id":id};
          const response=await axios.post('http://1.94.170.22:5000/delete_post', data);
          this.response=response.data;
        } catch (error) {
          console.error('There was an error sending the data!', error);
          this.response = error.message;
        }
        this.reranderV()
        this.vvkey+=1;
        // this.loadPosts();
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
      // this.loadPosts();
      },
  },
  mounted(){
      // this.loadPosts()
      this.updateWindowSize()
      console.log(window.innerWidth);
      window.addEventListener('resize',this.updateWindowSize)
      setTimeout(() => {
          this.wfDisplay=true
      }, 100);
  }
}
</script>

<style scoped>
.container-box {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: row;
}
.search-container {
  height: 100%;
  width: 15%;
  overflow: scroll;
  background-color: var(--bg-color)
}
.waterfall-container {
  width: 100%;
  height: 100%;
  overflow: scroll;
  pointer-events: all;
}
::-webkit-scrollbar {
  display: none;
}
.search-history {
  padding-left: 10%;
  margin-right: 0%;
}
</style>