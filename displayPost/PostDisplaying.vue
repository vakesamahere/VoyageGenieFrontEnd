<template>
    <postBlock :post="post" @click="handleCommentHide" class="post-block"></postBlock>

    <div id="rightBar" class="rightBar">
        <div class="authorAvatar">
            <el-avatar :src="authorCover" circle @click="handleRedirectToAuthor" />
        </div>
        <div class="rightBarButton">
            <el-button :type="likeButtonType" :icon="Pointer" circle @click="handleLike"/>
        </div>
        <div class="rightBarButton">
            <el-button :type="collectButtonType" :icon="Star" circle @click="handleCollect" />
        </div>
        <div class="rightBarButton">
            <el-button type="primary" :icon="Comment" circle @click="handleCommentDisplay" />
        </div>
        <div class="rightBarButton">
            <el-button type="primary" :icon="Edit" circle @click="handleRedirectToEdit" />
        </div>
    </div>
    <transition :name="commentTransition">
        <div v-if="showCommentBlock" class="commentBlock" id="commentBlock">
            <commentBlock :comments="comments" @sendComment="handleCommentSend">

            </commentBlock>
        </div>
    </transition>
    <div class="click-block" @click="closeSelf"></div>
</template>

<script lang="ts" setup>
import {
  Edit,
  Star,
  Comment,
  Pointer
} from '@element-plus/icons-vue'
</script>

<script lang="ts">
import postBlock from './PostBox.vue'
import commentBlock from './CommentBlock.vue'
import axios from 'axios';
export default {
    name:"PostDisplaying",
  props: {
    postId:{
        type: Number,
        default: ()=>(-1)
    },
    // userId:{
    //     type: Number,
    //     default: ()=>(1)
    // }
  },
  data(){
    return {
        post: {
            default:()=>(
                {
                    "title":"标题",
                    "cover":"封面base64编码",
                    "images":[
                        "图片A base64",
                        "图片B base64"
                    ],
                    "text":"总体介绍",
                    "routes":[
                        {
                            "name":"路线1",
                            "navigation":"导航数据",
                            "events":[
                                {
                                    "name":"途径点1",
                                    "position":"导航数据",
                                    "description":"描述",
                                    "images":[
                                        "图片111 base64",
                                        "图片112 base64"
                                    ]
                                },
                                {
                                    "name":"途径点2",
                                    "position":"导航数据",
                                    "description":"描述",
                                    "images":[
                                        "图片121 base64",
                                        "图片122 base64"
                                    ]
                                }
                            ]
                        },
                        {
                            "name":"路线2",
                            "navigation":"导航数据",
                            "events":[
                                {
                                    "name":"途径点1",
                                    "position":"导航数据",
                                    "description":"描述",
                                    "images":[
                                        "图片211 base64",
                                        "图片212 base64"
                                    ]
                                },
                                {
                                    "name":"途径点2",
                                    "position":"导航数据",
                                    "description":"描述",
                                    "images":[
                                        "图片221 base64",
                                        "图片222 base64"
                                    ]
                                }
                            ]
                        }
                    ]
                }
            )
        },
        comments: [],
        islike: 0,
        iscollect: 0,
        author:{
        },
        showCommentBlock:false
    }
  },
  components:{
    postBlock,
    commentBlock
  },
  methods: {
    handleLike() {
        console.log('like');
        axios.post('http://1.94.170.22:5000/toggle_like',{
            "post_id":this.postId,
            "user_id":this.userId
        })
        this.islike = 1-this.islike
    },
    handleCollect() {
        console.log('collect');
        axios.post('http://1.94.170.22:5000/toggle_collection',{
            "post_id":this.postId,
            "user_id":this.userId
        })
        this.iscollect = 1-this.iscollect
    },
    handleRedirectToAuthor(){
        console.log('to author',this.author.uid);
        this.$emit('redirectToAuthor',this.author.uid)
    },
    handleRedirectToEdit() {
        console.log('to edit',this.postId);
        this.$emit('redirectToEdit',this.postId)
    },
    handleCommentDisplay() {
        if(document.getElementById('commentBlock')?.classList.contains('commentBlockDisplay')){
            this.handleCommentHide();
            return;
        }
        console.log('comment display');
        this.showCommentBlock=true;
        document.getElementById('commentBlock')?.classList.add('commentBlockDisplay')
    },
    handleCommentHide() {
        console.log('comment hide');
        this.showCommentBlock=false;
        document.getElementById('commentBlock')?.classList.remove('commentBlockDisplay')
    },
    closeSelf(){
        this.$emit('closeSelf')
    },
    async handleCommentSend(commentString:string,commentId:number,reply:boolean) {
        console.log('comment hide');
        console.log(commentString);
        const data={
            "user_id":this.userId,
            "post_id":this.postId,
            "content":commentString,
            "comment_id":reply?commentId:null,
            "reply":reply
        }
        await axios.post('http://1.94.170.22:5000/send_comment',data).then(()=>{
            this.refreshComments()
        })
    },
    async getPostContent(){
        const res =await axios.get(`http://1.94.170.22:5000/get_post_details?post_id=${this.postId}`)
        this.post = res.data.post;
        this.comments = res.data.comments;

        const rightBarRes =await axios.get(`http://1.94.170.22:5000/get_post_details_about_user?post_id=${this.postId}&user_id=${this.userId}`)
        this.islike=rightBarRes.data.islike
        this.iscollect=rightBarRes.data.iscollect

        const authorRes = await axios.get(`http://1.94.170.22:5000/get_user_profile?user_id=${this.post.author}`)
        this.author = authorRes.data
    },
    async refreshComments(){
        const res =await axios.get(`http://1.94.170.22:5000/get_post_details?post_id=${this.postId}`)
        this.comments = res.data.comments;
    }
  },
  mounted() {
    //
    this.getPostContent();
  },
  computed:{
    userId() {
        return this.$store.state.userId
    },
    commentTransition() {
        return this.showCommentBlock?'slide-ud':'slide-du'
    },
    likeButtonType(){
        if(this.islike==0){
            return "primary"
        }else{
            return "danger"
        }
    },
    collectButtonType(){
        if(this.iscollect==0){
            return "primary"
        }else{
            return "danger"
        }
    },
    authorCover(){
        if(!this.author?.info){
            return ""
        }
        const info = JSON.parse(this.author.info)
        if(!info.cover){
            return ""
        }
        return info.cover
    },
    postRoutes(){
        return JSON.parse(this.post.routes).map(route => 
            route.events.map(event => ({
            place: '',
            title: event.name,
            title2: '',
            description: event.description,
            image: event.images[0] || ''
            }))
        );
    },
    postText(){
        return this.post.text
    },
    postTitle(){
        return this.post.title
    },
  },
  watch:{
    postId:{
        handler(newv,_){
            if(newv>0){
                this.getPostContent();
            }
        },
        immediate:true
    }
  }
};

</script>

<style scoped>
* {
    border: 0px solid black;
}

::-webkit-scrollbar {
    display: none
}

.container {
    /* CSS for container */
    position: absolute;
    height: 100%;
    width: 100%;
    background-size: cover;
    background-position: center;
    box-shadow: inset 0 8vh 5vh -10px rgba(0, 0, 0, 0.3);
    margin: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: scroll;
}

.light {
    text-shadow: 0 0 1px #ffffff, 0 0 2px #ffffff, 0 0 3px #ffffff;
}

.box {
    border-radius: 12px;
    overflow: auto
}
.img {
    scale: 90%;
    filter: drop-shadow(0 0 3px rgba(0,0,0,0.5));
    border-radius:  5px;
    transition: scale 0.3s ease-in-out 0.05s;
}
.img:hover {
    scale: 1.005;
}

.container > # {
    /*
    text-shadow: 0 0 10px #ffffff, 0 0 20px #ffffff, 0 0 30px #ffffff;
    */
    flex-shrink: 0;
}

.backgroundImg {
    z-index: -1;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size:cover;
    background-position: center;
    filter: blur(10px); /* 设置模糊效果 */
    transform: scale(1.1); /* 稍微放大以避免边缘的白色边框 */
}

.titleBox {
    /* CSS for titleBox */
    position: fixed;
    font-size: 5vh;
    color: #eeeeee;
    align-self: self-start;
    padding-left: 5%;
    z-index: 1;
    text-shadow: 0 0 1px #aaaaaa, 0 0 2px #aaaaaa, 0 0 3px #aaaaaa;
}

.topImgsBox {
    /* CSS for topImgsBox */
    padding-top: 12vh;
    height: 30vh;
    min-height: 30vh;
    width: 90%;
    display: flex;
    flex-direction: row;
    overflow-y: hidden;
    overflow-x: scroll;
    align-self: self-start;
    padding-left: 5%;
}

.topImg {
    /* CSS for topImg */
    height: 98%;
    width: auto;
}

.topTextBox {
    /* CSS for topTextBox */
    padding-top: 2vh;
    width: 80%;
    font-size: 2.5vh;
}

.routesBox {
    /* CSS for routesBox */
    padding-top: 5vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: start;
}

.routeBox {
    /* CSS for routeBox */
    width: 100%;
    height: 40vh;
    display: flex;
    flex-direction: column;
    align-items: self-start;
}

.routeName {
    /* CSS for routeName */
    font-size: 4vh;
    padding-left: 7%;
    height: 5vh;
}

.routeDescription {
    /* CSS for routeDescription */
    font-size: 3vh;
    padding-left: 7%;
    height: 4vh;
}

.eventsBox {
    /* CSS for eventsBox */
    height: 31vh;
    display: flex;
    flex-direction: row;
    align-items: self-start;
    width: 100%;
    overflow-x: scroll;
    overflow-y: hidden
}

.eventsLeftBlock {
    width: 7%;
    flex-shrink: 0;
}

.eventsRightBlock {
    width: 100%;
    flex-shrink: 0;
}

.eventBox {
    /* CSS for eventBox */
    height: 100%;
    padding-right: 2vw;
}

.eventName {
    /* CSS for eventName */
    align-self: self-start;
    font-size: 2.5vh;
}

.eventDescription {
    /* CSS for eventDescription */
    align-self: self-start;
    font-size: 2vh;
}

.eventImagesBox {
    /* CSS for eventImagesBox */
    height: 100%;
    min-height: 100%;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: start;
}

.eventTextBox {
    /* CSS for eventTextBox */
    height: 100%;
    padding-right: 2vh;
    min-width: 18vh;
    display: flex;
    flex-direction: column;
    align-items: self-start;
    overflow-y: scroll;
}

.eventImg {
    /* CSS for eventImg */
    height: 98%;
    width: auto;
}

.commentBlock {
    /* CSS for commentBlock */
    width: 90%;
    height: 70%;
    position:absolute;
    /* top: 120vh; */
    top:29%;
    left: 5%;
    transition: top 0.3s ease-in-out;
    background-color: #eeeeee;
    filter: drop-shadow(0 0 10px black);
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    align-items: self-start;
    overflow: scroll;
    z-index: 10;
}
.commentBlockDisplay {
    /* CSS for commentBlock */
    top: 29%;
}

#rightBar {
    width: 3vw;
    height: 50%;
    background-color: transparent;
    position: fixed;
    right: 0.5vw;
    top: 50%;
    transform: translateY(-50%);
    z-index: 11;
}
.rightBarButton {
    padding-top: 1vh;
    padding-bottom: 1vh;
    scale: 1.2;
    z-index:11;
}

.slide-du-enter-active, .slide-du-leave-active {
  transition: all 0.5s;
}
.slide-du-enter-from {
  transform: translateY(-100vh);
}
.slide-du-leave-to {
  transform: translateY(100vh);
}

.slide-ud-enter-active, .slide-ud-leave-active {
  transition: all 0.5s;
}
.slide-ud-enter-from {
  transform: translateY(100vh);
}
.slide-ud-leave-to {
  transform: translateY(-100vh);
}

.post-block {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    height: 80vh;
    width: 80vw;
    filter: drop-shadow(0 0 15px var(--color-light));
    border-radius: 20px;
    z-index: 6;
}

.click-block {
    position: absolute;
    top:0;
    left: 0;
    height: 100vh;
    width: 100vw;
    z-index: 5;
    /* background-color: pink; */
}

</style>