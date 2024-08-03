<template>
    <el-container class="container">
        <!-- start of top bar -->
        <el-menu
          default-active="/chat"
          class="el-menu-demo menu"
          mode="horizontal"
          :background-color="bgColorAll"
          :text-color="menuTextColor"
          :active-text-color="menuTextColor"
          @select="handleSelect"
          router
        >
          <!-- <img alt="Genie logo" class="genie" src="@/assets/genie.png"/> -->
          <div class="menulogo"
            :style="{color:menuTextColor}"
          >VG</div>
          <el-col :span="1"></el-col>
          <el-button icon="Search" circle class="SearchButton" @click = "handleSearchClick" 
            :style="{color:menuTextColor}"
          />
          <el-menu-item index="/square" router class="menu-item">Square</el-menu-item>
          <el-menu-item index="/chat" router class="menu-item">Chat</el-menu-item>
          <el-menu-item index="/home" router class="menu-item">Home</el-menu-item>
          <el-menu-item index="/about" router class="menu-item">About</el-menu-item>
          <!-- start of user profile -->
            <el-popover
              title="通知"
              trigger="hover"
              :show-arrow="false"
              >
              <NoticeBox style="max-height: 180px;overflow-y: auto;" :user_id="userId" @enterPost="handleEnterPost" @enterUser="handleEnterUser"/>
              <div class="menu-user">
                <div @click="goUserSafety" class="menu-user-item">
                  <el-icon><Lock /></el-icon>
                </div>
                <div @click="goUserInfo" class="menu-user-item">
                  <el-icon><User /></el-icon>
                </div>
                <div @click="goHelp" class="menu-user-item">
                  <el-icon><Help /></el-icon>
                </div>
              </div>
              <template #reference>
                <el-avatar src="https://tse2-mm.cn.bing.net/th/id/OIP-C.q3irb_--_nSoO-ID35c1nwHaHa?w=148&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7" circle class="menu-avatar" @click="goUserInfo"></el-avatar>
              </template>
            </el-popover>
          <!-- end of user profile -->
        </el-menu>
        <!-- end of top bar -->
    
        <!-- start of subwin container -->
        <el-main class="main" :class="{'blur':isSearchVisible}">
            <router-view :currentChat="currentChat" v-slot="{ Component }">
              <transition :name="slideMode" mode="out-in">
                <keep-alive>
                  <component :is="Component"></component>
                </keep-alive>
              </transition>
            </router-view>
        </el-main>
        <!-- end of subwin container -->
        
        <!-- start of login box -->
        <el-dialog
          v-model="loginVisible"
          :width="dialogWidth"
          :height="dialogWidth"
          align-center
          style="overflow-x: hidden;box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);border-radius: 8px;"
        >
          <span>
            <LoginBox @handleLogin="handleLogin"/>
          </span>
        </el-dialog>
        <!-- <LoginBox class="login-box" :v-if="loginVisible" @handleLogin="handleLogin"></LoginBox> -->
        <!-- end of login box -->
    </el-container>

    <transition name="fade">
      <div v-if="isSearchVisible" class="search-overlay">
        <div class="search-box">
          <textarea v-model="searchQuery" placeholder="Press 'Return' to search.." class="search-input" @keydown="handleKeyDown" />
        </div>
      </div>
    </transition>
</template>

<script>
import LoginBox from './components/LoginBox.vue';
import NotificationPage from './components/NotificationPage.vue';
import store from './store';

export default {
  data() {
    return {
      bgColorAll:"#fff",//"#545c64",
      menuTextColor:"#000",
      lastIndex:1,
      isSearchVisible:false,
      searchQuery:'',
    };
  },
  components:{
    NotificationPage,
    LoginBox
  },
  computed: {
    slideMode() {
      const currentRoute = this.$route;
      const currentIndex = currentRoute.meta.index;
      console.log(this.lastIndex,'->',currentIndex);
      const res = currentIndex > this.lastIndex ? 'slide-lr' : 'slide-rl';
      this.lastIndex = currentIndex
      return res
    },
    loginVisible: {
      get() {
        return this.$store.state.visible;
      },
      set(value) {
        this.$store.commit('setLoginVisible', value);
      }
    }
  },
  methods: {
    handleSearchClick() {
      if(this.isSearchVisible){
        this.handleSearchClose()
        return
      }
      this.isSearchVisible = true;
    },
    handleSearchClose() {
      this.isSearchVisible = false;
      // this.searchQuery = '';
    },
    handleSearch() {
        if(this.searchQuery==''){
          this.handleSearchClose();
          return
        };
        this.$router.push('/square')
        //给square传参
        this.searchQuery='';
        this.handleSearchClose();
    },
    handleKeyDown(event){
      if (event.key === 'Enter') {
        event.preventDefault();
        //搜索逻辑
        this.handleSearch();
      }
    },
    handleEscKey(event) {
      if (event.key === 'Escape') {
        this.handleSearchClose();
      }
    },
    goUserInfo() {
      if(!store.state.userId){
        console.log('未登录');
        this.showLogin()
        return
      }
      this.$router.push('/data')
    },
    goUserSafety() {
      if(!store.state.userId){
        console.log('未登录');
        this.showLogin()
        return
      }
      this.$router.push('/safety')
    },
    goHelp() {
      if(!store.state.userId){
        console.log('未登录');
        this.showLogin()
        return
      }
      this.$router.push('/help')
    },
    showLogin() {
      this.$store.commit('setLoginVisible',true)
    },
    handleLogin(){
      this.$store.commit('setLoginVisible',false)
    }
  },
  mounted() {
    window.addEventListener('keydown',this.handleEscKey);
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.handleEscKey);
  }
}
</script>


<style>
::-webkit-scrollbar {
    display: none;
}
#app {
    padding: 0 0 0 0;
    margin: 0 0 0 0;
    background-color: "#545c64";
}


</style>

<style scoped>
.slide-lr-enter-active, .slide-lr-leave-active {
  transition: all 0.4s;
}
.slide-lr-enter-from {
  transform: translateX(30%);
  opacity: 0;
}
.slide-lr-leave-to {
  transform: translateX(-70%);
  opacity: 0;
}

.slide-rl-enter-active, .slide-rl-leave-active {
  transition: all 0.5s;
}
.slide-rl-enter-from {
  transform: translateX(-30%);
  opacity: 0;
}
.slide-rl-leave-to {
  transform: translateX(70%);
  opacity: 0;
}

.fade-enter-active, .fade-leave-active {
  transition: all 0.2s ease;
}
.fade-enter-from {
  opacity: 0;
}
.fade-leave-to {
  opacity: 0;
}

.container {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
}
.header {
  width: 100%;
  background-color: #f5f5f5;
  flex-shrink: 0; /* Prevent the header from shrinking */
}

.main {
  /* flex: 1;
  padding: 20px;
  overflow-y: auto; */
  height: 90vh;
  width: 100vw; /* Ensure the main content takes full width */
  margin: 0;
  padding: 0;
  transition: all 0.25s ease-in-out;
}
.menu-user {
  z-index: 1;
  height: 3vh;
  user-select: none;
  width: 100%;
  display: flex;
  flex-direction: row;
}
.menu-user-item {
  width: 2vw;
  text-align: center;
  /* border: 1px solid black; */
  width: 33.3%;
}
.menu {
  z-index: 1;
  height: 7vh;
  user-select: none;
}
.menu-item {
  width: 5vw;
  font-size: 1.8vh;
}
.menu-avatar {
  align-self: center;
  position: absolute;
  right: 2vw;
  top: 50%;
  transform: translateY(-50%);
  transition: all 0.4s ease-out 0.06s;
}
.menu-avatar:hover {
  scale: 2;
  transform: translateX(-40%) translateY(-10%);
}
.el-menu--horizontal>.el-menu-item.is-active,
.el-menu--horizontal>.el-menu-item {
  border: none;
}
.SearchButton {
  align-self: center;
  background-color: transparent;
  border: none;
}
.SearchButton:hover {
  align-self: center;
  color: #222;
  border: none;
}
.main.blur {
  filter: blur(15px);
  /* transform: translateY(15px); */
  scale: 0.97;
}

.search-overlay {
  position: fixed;
  top: 7vh;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2
}

.search-box {
  background: transparent;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
}
.search-input {
  position: absolute;
  top:10vh;
  left: 10vw;
  width: 80vw;
  margin-bottom: 20px;
  outline: none;
  border: none;
  background: transparent; /* 使输入框背景透明 */
  color: #000;
  font-size: 5vh;
  resize: none;
  height: 100vh;
}
.search-input::placeholder {
  color:#999;
}
.SearchCancel {
  position: fixed;
  right: 1vh;
  top: 1vh;
}
.menulogo{
  text-align: center;
  align-self: center;
  padding-left: 2vw;
  color: #fff;
}
</style>