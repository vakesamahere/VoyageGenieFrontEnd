<template>
  <div class="notificationContainer">
    <!--<h1 class="pageTitle">消息通知页</h1>-->
    <div class="notificationBox" v-for="noti in notifications" :key="noti.id" :noti="noti">

      <!--start of notification body-->
      <div class="notification">
        <img :src="noti.sourceUserProfile" class="notification-image" @click="enterUser(noti.user_id)">
        <div class="notification-content">
          <p style="font-size: 10px;">{{ noti.content }}</p>
        </div>
        <img :src="noti.postCover" class="notification-image" @click="enterPost(noti.post_id)">
      </div>
      <!--end of notification body-->

    </div>
  </div>
</template>
  
<script>
import axios from 'axios';
export default {
  name: 'Notice',
  props:{
    user_id:Number
  },
  data() {
    return {
      notifications: []
    };
  },
  methods: {
    async fetchNotifications(user_id) {
      try {
        const response = await axios.get(`http://1.94.170.22:5000/get_user_notifications?user_id=${user_id}`);
        console.log(response.data);
        // this.notifications = response.data;
        // sort
        let list = []
        response.data.comments.forEach(item => {
          let temp={
            'user_id':item.user_id,
            'post_id':item.post_id,
            'time':item.time,
            'content':`${item.name}评论了: ${item.content}`,
            'sourceUserProfile':'',
            'postCover':''
          }
          list.push(temp)
        });
        response.data.likes.forEach(item => {
          let temp={
            'user_id':item.user_id,
            'post_id':item.post_id,
            'time':item.time,
            'content':`${item.name}点赞了你的帖子`,
            'sourceUserProfile':'',
            'postCover':''
          }
          list.push(temp)
        });
        list.sort(function(a,b){
          return new Date(a.time) - new Date(b.time);
        })
        this.notifications=list
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    },
    async getCovers(){
      //
      for(let i=0;i<this.notifications.length;i++){
        let item = this.notifications[i]
        //user
        try{
          const resUser = await axios.get(`http://1.94.170.22:5000/get_user_profile?user_id=${item.user_id}`)
          const userCover = resUser.data.cover
          if(userCover){
            item.sourceUserProfile=userCover
          }
        } catch (error) {
          console.log(error);
        }
        //post
        try{
          const resUser = await axios.get(`http://1.94.170.22:5000/get_user_profile?user_id=${item.user_id}`)
          const userCover = resUser.data.cover
          if(userCover){
            item.sourceUserProfile=userCover
          }
        } catch (error) {
          console.log(error);
        }
      }
    },
    enterPost(post_id) {
      console.log('Go to post with id:', post_id);
      this.$emit('enterPost',post_id)
    },
    enterUser(user_id){
      console.log('Go to user with id:', user_id);
      this.$emit('enterUser',user_id)
    }
  },
  mounted(){
      this.fetchNotifications(this.user_id).then(()=>{
        this.getCovers()
      })
  }
}
</script>

<style>
.notificationBox {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-height: 500px;
  overflow-y: auto;

}
.notification {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 0px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
  width: 80%;
}

.notification-image {
  width: 20px;
  height: 20px;
  object-fit: cover;
  border-radius: 50%;
  align-self: self-end;
}

.notification-content {
  flex: 1;
  align-self: self-start;
  text-align: left;
}

time {
  font-size: 12px;
  color: #666;
}

.pageTitle {
  font-size: 24px; /* 设置字号 */
  font-family: 'Arial', sans-serif; /* 设置字体 */
  color: #333; /* 设置字体颜色 */
  text-align: center; /* 设置文本居中对齐 */
  margin-bottom: 20px; /* 设置外边距 */
}

</style>