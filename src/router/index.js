import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeViewNew.vue'
import store from '@/store';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import('../views/AboutView.vue'),
      component: () => import('../components/Help.vue'),
      meta: { 
        requiresAuth: true,
        index:4
      } 
    },
    {
      path: '/chat', // 使用id作为动态路由参数
      name: 'chat',
      component: () => import('../components/Planner.vue'),
      meta: { 
        requiresAuth: true,
        index:2
      },
      children: [
        {
          path: ':chatId',
          name: 'chatdetail',
          component: () => import('../components/ChatBox.vue')
        },
      ]
    },
    {
      path: '/square',
      name: 'square',
      component:  () => import('../views/SquareView.vue'),
      meta: { 
        requiresAuth: true,
        index:1
      },
    },
    {
      path: '/data',
      name:'data',
      component:() => import('../components/Data.vue'),
      meta: {
        requiresAuth: true,
        index:9
      } 
    },
    {
      path: '/help',
      name:'help',
      component:() => import('../components/Help.vue'),
      meta: {
        index:10
      }
    },
    {
      path: '/safety',
      name:'safety',
      component:() => import('../components/Safety.vue'),
      meta: { 
        requiresAuth: true, 
        index:8
      } 
    },
    {
      path: '/home',
      name:'home',
      component:HomeView,
      meta: { 
        requiresAuth: true,
        index:3
      } ,
      children: [
        {
          path: 'interest',
          name: 'interest',
          component: () => import('../components/interest.vue')
        },
        {
          path: 'journey',
          name:'journey',
          component:() => import('../components/journey.vue')
        },
        {
          path: 'collection',
          name:'collection',
          component:() => import('../components/collection.vue')
        },
        {
          path: 'like',
          name:'like',
          component:() => import('../components/like.vue')
        },
        
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  // 测试，免登录
  next()
  // 检查用户是否登录，如果未登录且尝试访问需要登录的页面，则跳转到登录界面
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isLoggedIn = store.state.isLoggedIn;

  if (requiresAuth && !isLoggedIn) {
    // 未登录且需要登录权限
    store.dispatch('showLoginDialog'); // 假设你已经在Vuex actions中定义了此action
  } else {
    next();
  }
});
window.addEventListener('beforeunload', () => {
  window.location.href = '/';
});
router.afterEach(() => {
  if (!store.state.isLoggedIn && store.state.visible) {
    // app.showDialog();
  }
});

export default router
