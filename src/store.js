// store/index.js
import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      isLoggedIn: false, // 用户登录状态
      userId: null, // 初始化userId为null
      visible:false,
      userAvatar:"https://tse4-mm.cn.bing.net/th/id/OIP-C.58XQcWZjBXmzOy6mofl5VwAAAA?w=178&h=180&c=7&r=0&o=5&pid=1.7", //base64 or url
      userName:"VoyageGenie",
      userBio:"Click the avatar to sign in"
    };
  },
  mutations: {
    setUserId(state, id) {
      state.isLoggedIn = true;
      state.userId = id; // 提供一个方法来更新userId
    },
    setUserAvatar(state,avatar){
      state.userAvatar = avatar
    },
    setUserBio(state,bio){
      state.userBio = bio
    },
    setUserName(state,name){
      state.userName = name
    },
    SET_DIALOG_VISIBLE(state, visible) {
      state.visible = visible;
    },
    setLoginVisible(state, payload) {
      state.visible = payload;
    }
  },
  actions: {
    showLoginDialog({ commit }) {
      commit('SET_DIALOG_VISIBLE', true);
    
    // 你可以在这里定义异步操作来设置userId
  }},
  getters: {
    getUserId: (state) => state.userId, // 提供一个getter来获取userId
  }
});

export default store;