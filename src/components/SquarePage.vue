<template>
    <div class="container-box">
        <div class="search-container">
            <searchbox class="search-box" @search="handleSearch"></searchbox>
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
export default {
    components:{
        waterfall,
        searchbox
    },
    data(){
        return {
            posts:[],
            windowWidth:0,
            windowHeight:0,
            wfDisplay:false
        }
    },
    methods:{
        async handleSearch(keyword){
            if(keyword===''){
                this.loadPosts()
                return
            }
            console.log(keyword);
            const res = await axios.get(`http://1.94.170.22:5000/search_posts?keyword=${keyword}`);
            console.log(res);
            this.posts=res.data
        },
        async loadPosts(){
            const res = await axios.get(`http://1.94.170.22:5000/get_recommended_posts`);
            console.log(res);
            this.posts=res.data
        },
        handleEnterPost(item){
            this.$emit('enterPost',item.uid)
        },
        updateWindowSize(){
            this.windowWidth=window.innerWidth;
            this.windowHeight=window.innerHeight;
        }
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
}
.search-container {
    height: auto;
    margin-top: -45px;
    margin-bottom: 15px;
    z-index: 2000;
}
.waterfall-container {
    height: 100%;
    overflow: scroll;
    pointer-events: all;
}
::-webkit-scrollbar {
    display: none;
}
</style>