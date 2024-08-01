<template>
    <div class="container-box">
        <div class="search-container" v-if="false">
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
import {_test} from '@/main.js'
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
            if(_test){
                let testPosts = [
                    {
                        "id":1,
                        "cover": "https://lingdian-image.oss-cn-shenzhen.aliyuncs.com/20200420/6a661df531a854d30bc97dfe67a1b1baoutput_00002.jpg",
                        "title": "Item Title",
                        "author": {
                            "cover": "https://tse2-mm.cn.bing.net/th/id/OIP-C.q3irb_--_nSoO-ID35c1nwHaHa?w=148&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7",
                            "name": "Author Name"
                        }
                    },
                    {
                        "id":2,
                        "cover": "https://ts1.cn.mm.bing.net/th/id/R-C.f32d3f1b718d909a22c0be4971e034d2?rik=UiCwhzmzj7sKTQ&riu=http%3a%2f%2fimg95.699pic.com%2fphoto%2f50046%2f6569.jpg_wh860.jpg&ehk=Q40G%2fDHkvrYUY1kJs%2faRSQuCeJVGttb5yl7jYCmTdY4%3d&risl=&pid=ImgRaw&r=0",
                        "title": "Item Title",
                        "author": {
                            "cover": "https://tse2-mm.cn.bing.net/th/id/OIP-C.q3irb_--_nSoO-ID35c1nwHaHa?w=148&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7",
                            "name": "Author Name"
                        }
                    },
                    {
                        "id":3,
                        "cover": "https://tse3-mm.cn.bing.net/th/id/OIP-C.7PMYm8Xe4PPDFYCCvhCe0QHaE7?rs=1&pid=ImgDetMain",
                        "title": "Item Title",
                        "author": {
                            "cover": "https://tse2-mm.cn.bing.net/th/id/OIP-C.q3irb_--_nSoO-ID35c1nwHaHa?w=148&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7",
                            "name": "Author Name"
                        }
                    },
                ]
                for(let i=0;i<50;i++){
                    let temp = {
                        "id":i,
                        "cover": testPosts[(i^2)%3].cover,
                        "title": "Item Title "+i.toString(),
                        "author": {
                            "cover": "https://tse2-mm.cn.bing.net/th/id/OIP-C.q3irb_--_nSoO-ID35c1nwHaHa?w=148&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7",
                            "name": "Author Name"
                        }
                    }
                    this.posts.push(temp)
                }
                // this.posts = this.posts.concat(testPosts)
            }
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