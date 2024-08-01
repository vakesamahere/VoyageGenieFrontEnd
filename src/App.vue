<template>
    <el-container class="container">
        <!-- start of top bar -->
        <el-menu
          default-active="/chat"
          class="el-menu-demo menu"
          mode="horizontal"
          :background-color="bgColorAll"
          text-color="#fff"
          active-text-color="#fff"
          @select="handleSelect"
          router
        >
          <img alt="Genie logo" class="genie" src="@/assets/genie.png"/>
          <el-col :span="1"></el-col>
          <el-button icon="Search" circle class="SearchButton" @click = "handleSearchClick"/>
          <el-menu-item index="/square" router>Square</el-menu-item>
          <el-menu-item index="/chat" router>Chat</el-menu-item>
          <el-menu-item index="/data" router>Home</el-menu-item>
          <el-menu-item index="/about" router>About</el-menu-item>
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
export default {
  data() {
    return {
      bgColorAll:"#545c64",
      lastIndex:1,
      isSearchVisible:false,
      searchQuery:''
    };
  },
  computed: {
    slideMode() {
      const currentRoute = this.$route;
      const currentIndex = currentRoute.meta.index;
      console.log(this.lastIndex,'->',currentIndex);
      const res = currentIndex > this.lastIndex ? 'slide-lr' : 'slide-rl';
      this.lastIndex = currentIndex
      return res
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
  transition: transform 0.5s;
}
.slide-lr-enter-from {
  transform: translateX(100%);
}
.slide-lr-leave-to {
  transform: translateX(-100%);
}

.slide-rl-enter-active, .slide-rl-leave-active {
  transition: transform 0.5s;
}
.slide-rl-enter-from {
  transform: translateX(-100%);
}
.slide-rl-leave-to {
  transform: translateX(100%);
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
.menu {
  z-index: 1;
  height: 7vh;
}
.el-menu--horizontal>.el-menu-item.is-active,
.el-menu--horizontal>.el-menu-item {
  border: none;
}
.SearchButton {
  align-self: center;
  background-color: transparent;
  color: #fff;
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
</style>