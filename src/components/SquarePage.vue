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
            <waterfall v-if="wfDisplay" class="waterfall" :list="posts" :trigger="wfTrigger" @enterPost="handleEnterPost"></waterfall>
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
            selectIndex:0,
            wfTrigger:0
        }
    },
    watch:{
        searchKeyword:{
            handler(_,__){
                // alert(this.searchKeyword)
                this.handleSearch(this.searchKeyword)
            }
        },
        userId:{
            handler(_,__){
                // alert(this.searchKeyword)
                this.handleSearch(this.searchKeyword)
            }
        }

    },
    computed: {
        userId() {
            return this.$store.state.userId
        }
    },
    methods:{
        ifEmpty(){
            if(this.posts.length===0){
                this.wfTrigger+=1
            }
        },
        goToSquare(keyword,index) {
            this.selectIndex=index
            this.$router.push({
                path: '/square',
                query: {
                keyword: keyword,
                },
            });
        },
        async handleSearch(keyword){
            if(this.searchHistory[this.selectIndex].content!==keyword){
                // 跳转
                const n = 8;
                const searchInfo = {
                    content: keyword,
                    display: keyword.length > n ? keyword.slice(0, n) + '......' : keyword
                };
                if (keyword === '') {
                    searchInfo.display = "推荐";
                }

                let indexHistory = this.searchHistory.findIndex(item => 
                    item.content === searchInfo.content && item.display === searchInfo.display
                );
                const isSame = indexHistory !== -1;
                if (!isSame) {
                    this.searchHistory.push(searchInfo)
                    indexHistory = this.searchHistory.length-1
                }
                this.goToSquare(keyword,indexHistory)
            }
            //搜索
            this.$emit('searchChange',keyword)
                    
            

            if(keyword===''){
                this.loadPosts()
                return
            }
            this.posts=[]
            console.log(keyword);
            let query = `http://1.94.170.22:5000/search_posts?keyword=${keyword}`
            if(this.$store.state.userId!==undefined && this.$store.state.userId!==null){
                query+=`&user_id=${this.$store.state.userId}`
            }
            const res = await axios.get(query);
            console.log(res);
            setTimeout(() => {
                this.posts=res.data
                this.ifEmpty()
            }, 700);
        },
        async loadPosts(){
            this.posts=[]
            let query = `http://1.94.170.22:5000/get_recommended_posts`
            if(this.$store.state.userId!==undefined && this.$store.state.userId!==null){
                query+=`?user_id=${this.$store.state.userId}`
            }
            const res = await axios.get(query);
            console.log(res.data);
            setTimeout(() => {
                this.posts=res.data
                if(_test){
                    this.posts = this.posts.concat(testCovers)
                }
                this.ifEmpty()
            }, 700);
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