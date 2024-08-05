<template>
  <div class="container-box">
      <div class="search-container">
          <el-menu
              :default-active="selectIndex"
              mode="vertical"
              background-color="var(--bg-color)"
              text-color="var(--display-text-color)"
              active-text-color="var(--display-text-color-active)"
              @select="handleSelect"
              class="search-history"
          >
              
              <el-menu-item
                  v-for="(item, index) in searchHistory"
                  :key="index"
                  :index="index"
                  @click="goToSquare(item.content,index)"
                  class="search-item"
                  >
                  {{ item.display }}
              </el-menu-item>
          </el-menu>
      </div>
      <div class="waterfall-container">
          <waterfall v-if="wfDisplay" class="waterfall" :list="posts" @enterPost="handleEnterPost"></waterfall>
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
          searchHistory:[
              {
                  "display":"推荐",
                  "content":""
              }
          ],
          selectIndex:0
      }
  },
  computed: {
      userId() {
          return this.$store.state.userId
      }
  },
  methods:{
      goToSquare(keyword,index) {
          this.selectIndex=index
          this.$router.push({
              path: '/square',
              query: {
              keyword: keyword,
              },
          });
      },
      async loadPosts(){
          const res = await axios.get(`http://1.94.170.22:5000/get_user_posts?user_id=${this.userId}&target_id=${this.userId}`);
          console.log(res);
          setTimeout(() => {
              this.posts=res.data
              if(_test){
                  this.posts = this.posts.concat(testCovers)
              }
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
        this.loadPosts();
        // alert('2');
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
      this.loadPosts();
      },
  },
  mounted(){
      this.loadPosts()
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