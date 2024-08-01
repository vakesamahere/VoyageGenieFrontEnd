<template>
  <div class="comment">
    <div :class="`${root?'root':'nonroot'}`">
        <div class="comment-header">
        <img :src="comment.userProfile" alt="User Avatar" class="user-avatar" />
        <span class="user-name">{{ `${comment.userName} ${(parentName==null)?'':` 回复 ${parentName}`}`}}</span>
        </div>
        <div class="comment-content">{{ comment.content }}</div>        
    </div>

    <div class="replies">
      <div :class="`${root?'repliesHeader root':'reply-toggle nonroot'}`">
        <span class="commentTime">{{ comment.time }}</span>
        <button @click="createReply(comment.uid)" class="create-reply">
        回复
        </button>
        <button @click="toggleReplies" class="reply-toggle" v-if="replies.length!=0">
        {{ showReplies ? '收起回复' : '查看回复' }}
        </button>
      </div>

      <transition name="reply-transition">
        <div class="reply-list hidden" :id="`replyContainer${comment.uid}`">
          <comment-item
            v-for="reply in replies"
            :key="reply.uid"
            :comment="reply"
            :comments="comments"
            :parentName="getParentName"
            @sendComment="handleSendComment"
          />
        </div>
      </transition>
    </div>

    <!-- Element Plus Dialog -->
    <el-dialog title="Reply to Comment" v-model="dialogVisible">
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
  </div>
</template>

<script>
export default {
  name: 'CommentItem',
  props: {
    comment: {
      type: Object,
      required: true
    },
    comments: {
      type: Array,
      required: true
    },
    root: {
        type: Boolean,
        required: false,
        default: false
    },
    parentName: {
        type: String,
        required: false,
        default: null
    }
  },
  data() {
    return {
      showReplies: false,
      dialogVisible: false,
      replyContent: '',
    };
  },
  computed: {
    currentUid:{
      get() {
        return this.$store.state.userId;
      }
    },
    replies() {
      return this.comments.filter(c => c.comment_id === this.comment.uid);
    },
    getParentName() {
        if(this.root){
            return null
        }else{
            return this.comment.userName
        }
    }
  },
  methods: {
    toggleReplies() {
      this.showReplies = !this.showReplies;
      if(this.showReplies){
        document.getElementById(`replyContainer${this.comment.uid}`)?.classList.remove('hidden')
        document.getElementById(`replyContainer${this.comment.uid}`)?.classList.add('show')
      }else{
        document.getElementById(`replyContainer${this.comment.uid}`)?.classList.add('hidden')
        document.getElementById(`replyContainer${this.comment.uid}`)?.classList.remove('show')
      }
    },
    createReply(uid) {
      console.log(`create a reply to the comment ${uid}`);
      this.currentUid = uid;
      this.dialogVisible = true;
    },
    submitReply() {
      this.$emit('sendComment', this.replyContent, this.currentUid);
      this.replyContent = '';
      this.dialogVisible = false;
    },
    handleSendComment(content, uid) {
      this.$emit('sendComment', content, uid);
    }
  }
};
</script>

<style scoped>
.root {
    scale: 1.1;
    font-size: 2.5vh;
}
.nonroot {
    scale: 1;
    font-size: 2vh;
    padding-left: 2vw;
}
.repliesHeader.root {
    font-size: 13px;
}
.repliesHeader.nonroot {
    font-size: 13px;
    padding-left: 2vw;
}
.commentTime {
  font-size: 13px;
  padding-right: 0.5vw;
  color:#aaaaaa;
}

.hidden {
    max-height: 0;
}
.show {
    max-height: 100vh;
}
.comment, .reply {
  border-bottom: 1px solid #ccc;
  padding: 10px 0;
  display: flex;
  flex-direction: column;
  align-items: self-start;
}

.replies {
  display: flex;
  flex-direction: column;
  align-items: self-start;
}

.comment-header {
  display: flex;
  align-items: center;
}

.user-avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
}

.user-name {
  font-weight: bold;
}

.comment-content, .reply-content {
  margin-top: 5px;
  text-align: left;
}

.reply-toggle {
  background: none;
  border: none;
  color:#aaaaaa;
  cursor: pointer;
  padding: 0;
  margin-top: 10px;
}

.create-reply {
  background: none;
  border: none;
  color:#aaaaaa;
  cursor: pointer;
  padding-right: 1vw;
  margin-top: 10px;
}

.reply-list {
  margin-top: 10px;
  overflow: hidden;
  transition: all 0.5s ease;
}

.reply-transition-enter-active,
.reply-transition-leave-active {
  transition: all 0.5s ease;
}

.reply-transition-enter,
.reply-transition-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
