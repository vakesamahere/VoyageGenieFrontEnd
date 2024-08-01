// store/index.js
import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      isLoggedIn: false, // 用户登录状态
      userId: null, // 初始化userId为null
      visible:false
    };
  },
  mutations: {
    setUserId(state, id) {
      state.isLoggedIn = true;
      state.userId = id; // 提供一个方法来更新userId
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