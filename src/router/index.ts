//引入createRouter
import { createRouter,createWebHashHistory } from "vue-router"
//引入组件
import collection from '@/components/collection.vue'
import interest from '@/components/interest.vue'
import journey from '@/components/journey.vue'
import like from "@/components/like.vue"

const routes= [//一个一个的路由规则
    {
        path: '/collection',
        name:'collection',
        component:collection
    },
    {
        path: '/like',
        name:'like',
        component:like
    },
    {
        path: '/interest',
        name:'interest',
        component:interest
    },
    {
        path: '/journey',
        name:'journey',
        component:journey
    }
]
//创建路由器
const router =createRouter({
    history:createWebHashHistory(import.meta.env.BASE_URL),
    routes//路由器的工作模式
   
});

export default router;