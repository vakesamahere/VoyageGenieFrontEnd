<template>
  <div class="comment-section">
    <transition-group name="comment-list" tag="div">
      <comment-item
        v-for="comment in rootComments"
        :key="comment.uid"
        :comment="comment"
        :comments="comments"
        :root="true"
        @sendComment="handleSendComment"
      />
    </transition-group>
  </div>
  <!-- start of sendCommentButton -->
    <div class="send-command-button">
      <el-button icon="Edit" circle @click="dialogVisible = true" color="#eee" />
    </div>
  <!-- end of sendCommentButton -->

  <!-- start of sendCommentDialog -->
    <el-dialog title="发表伟论吧" v-model="dialogVisible">
      <el-input
        type="textarea"
        :rows="4"
        placeholder="Please input your reply"
        v-model="replyContent">
      </el-input>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="submitReply">Submit</el-button>
        </span>
      </template>
    </el-dialog>
  <!-- end of sendCommentDialog -->
</template>

<script>
import CommentItem from './CommentItem.vue';
import axios from 'axios';
import {
  Edit,
} from '@element-plus/icons-vue'
export default {
  components: {
    CommentItem
  },
  data() {
    return {
      dialogVisible:false,
      replyContent:'',
    }
  },
  props: {
    comments: {
      type: Array,
      required: true,
      default:()=>(
        [
            {
            uid: 1,
            userId: 101,
            userProfile: 'https://example.com/avatar1.png',
            userName: 'Alice',
            reply: false,
            commentId: null,
            content: 'This is a great post!',
            time: '1 day ago'
            },
            {
            uid: 2,
            userId: 102,
            userProfile: 'https://example.com/avatar2.png',
            userName: 'Bob',
            reply: true,
            commentId: 1,
            content: 'I agree with you, Alice!',
            time: '2024-7-21'
            },
            {
            uid: 3,
            userId: 103,
            userProfile: 'https://example.com/avatar3.png',
            userName: 'Charlie',
            reply: true,
            commentId: 2,
            content: 'Bob, you always agree with everyone!',
            time: '2024-7-21'
            },
            {
            uid: 4,
            userId: 104,
            userProfile: 'https://example.com/avatar4.png',
            userName: 'David',
            reply: false,
            commentId: null,
            content: 'I have a different opinion.',
            time: '2024-7-21'
            },
            {
            uid: 5,
            userId: 102,
            userProfile: 'https://example.com/avatar2.png',
            userName: 'Bob',
            reply: true,
            commentId: 3,
            content: 'Ah.',
            time: '2024-7-21'
            },
            {
            uid: 6,
            userId: 102,
            userProfile: 'https://example.com/avatar2.png',
            userName: 'Bob',
            reply: true,
            commentId: 3,
            content: 'True dude.',
            time: '2024-7-21'
            }
        ]
      )
    }
  },
  computed: {
    rootComments() {
      return this.comments.filter(comment => !comment.reply);
    }
  },
  mounted(){
    // get the comments by post-id
    setTimeout(() => {
      console.log(this.comments);
    }, 1000);
  },
  methods:{
    handleSendComment(content,uid){
      this.$emit('sendComment',content,uid,true)
    },
    handleNewComment(content,){
      this.$emit('sendComment',content,0,false)
    },
    submitReply(){
      this.handleNewComment(this.replyContent)
      this.replyContent = '';
      this.dialogVisible = false;
    }
  }
};
</script>

<style scoped>
.comment-section {
  width: 90%;
  margin: 0 auto;
  padding-top:5vh;
}

.comment-list-move {
  transition: transform 0.5s;
}

.comment-list-enter-active,
.comment-list-leave-active {
  transition: all 0.5s;
}

.comment-list-enter,
.comment-list-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

.comment-list-leave-active {
  position: absolute;
}

.send-command-button{
    padding-top: 1vh;
    padding-bottom: 1vh;
    scale: 1.2;
    position: fixed;
    right: 0;
    top: 0;
    transform: translateX(-50%) translateY(10%);
}
</style>
