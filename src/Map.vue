<template>
  
  <p style="margin-top: 10px;">{{ post.text }}</p>
  <el-carousel :interval="4000" type="card" height="200px" style="margin-top:20px">
    <el-carousel-item v-for="(image,index) in post.images" :src="image" :key="index" class="topImg img">
      <h3 text="2xl" justify="center">{{ image }}</h3>
    </el-carousel-item>
  </el-carousel>
  <el-tabs
    v-model="editableTabsValue"
    type="card"
    class="demo-tabs"
    @edit="handleTabsEdit"
    style="margin-top: 20px;margin-right: 50px;"
  >
    <el-tab-pane
      v-for="(route,index) in post.routes"
      :key="index"
      :label="route.name"

      :name= "route.name"
    >
    {{route.name}}
      <el-timeline style="max-width: 600px;margin-top: 10px">
        <el-timeline-item
          v-for="(event,innerIndex) in route.events"
          :key="innerIndex"
          :timestamp="(route?.navigation?.[innerIndex]?.交通方式 || '')+'   '+(route?.navigation?.[innerIndex]?.价格 || '')+'   '+(route?.navigation?.[innerIndex]?.路程 || '')"
          type='primary'
          hollow='true'
        >
        <el-card>


              <h3 style="font-weight: bold;">{{event.name}}</h3>
              <p>{{ event.description }}</p>
              

  

        </el-card>
        </el-timeline-item>
      </el-timeline>
     
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts" setup>
import { defineProps, ref } from 'vue';

// 定义 props 并使用 TypeScript 进行类型注解
interface Post {
  title: string;
  cover: string;
  images: string[];
  text: string;
  routes: {
    name: string;
    navigation: {
      起点: {
        name: string,
        address: string,
        location: {
          latitude: number,
          longitude: number
        }
      },
      终点: {
        name: string,
        address: string,
        location: {
          latitude: number,
          longitude: number
        }
    },
    交通方式: string,
      路程: string,
      价格: string
  }[];
    events: {
      name: string;
      position: string;
      description: string;
      images: string[];
    }[];
  }[];
}



const post = ref<Post>({
  title: "标题",
  cover: "封面base64编码",
  images: ["图片A base64", "图片B base64"],
  text: "滚滚长江东逝水滚滚长江东逝水滚滚长江东逝水滚滚长江东逝水，滚滚长江东逝水。滚滚长江东逝水滚滚长江东逝水。",
  routes: [
    {
      name: "路线1",
      navigation:[
    {
      起点: {
        name: "市中心广场",
        address: "市中心大道1号",
        location: {
          latitude: 39.905489,
          longitude: 116.401245
        }
      },
      终点: {
        name: "历史博物馆",
        address: "文化路88号",
        location: {
          latitude: 39.906489,
          longitude: 116.402245
        }
      },
      交通方式: "走路",
      路程: "2公里",
      价格: "免费"
    },
    {
      起点: {
        name: "历史博物馆",
        address: "文化路88号",
        location: {
          latitude: 39.906489,
          longitude: 116.402245
        }
      },
      终点: {
        name: "科技馆",
        address: "科技路100号",
        location: {
          latitude: 39.907489,
          longitude: 116.403245
        }
      },
      交通方式: "公交车",
      路程: "3.5公里",
      价格: "2元"
    },
    {
      起点: {
        name: "科技馆",
        address: "科技路100号",
        location: {
          latitude: 39.907489,
          longitude: 116.403245
        }
      },
      终点: {
        name: "购物中心",
        address: "商业大街200号",
        location: {
          latitude: 39.908489,
          longitude: 116.404245
        }
      },
      交通方式: "打车",
      路程: "5公里",
      价格: "20元"
    },
    {
      起点: {
        name: "购物中心",
        address: "商业大街200号",
        location: {
          latitude: 39.908489,
          longitude: 116.404245
        }
      },
      终点: {
        name: "公园",
        address: "自然路50号",
        location: {
          latitude: 39.909489,
          longitude: 116.405245
        }
      },
      交通方式: "骑车",
      路程: "1.5公里",
      价格: "5元"
    }
  ],
      events: [
        {
          name: "市中心广场",
          position:"导航数据",
          description: "市中心广场是个好地方",
          images: ["图片111 base64", "图片112 base64"]
        },
        {
          name: "历史博物馆",
          position:"导航数据",
          description: "描述烫烫烫烫烫烫烫烫烫锟斤拷fcdafeasfqasaqfasfafasfqfqwfqwfwqqwqwaszxcs",
          images: ["图片121 base64", "图片122 base64"]
        },
        {
          name: "科技馆",
          position:"导航数据",
          description: "科技馆是个好地方",
          images: ["图片111 base64", "图片112 base64"]
        },
        {
          name: "购物中心",
          position:"导航数据",
          description: "购物中心是个好地方呀是个好地方",
          images: ["图片111 base64", "图片112 base64"]
        },
        {
          name: "公园",
          position:"导航数据",
          description: "公园也是好地方呀也是好地方",
          images: ["图片111 base64", "图片112 base64"]
        },
      ]
    },
    {
      name: "路线2",
      navigation: [
        {
        起点: {
        name: "火焰山",
        address: "灵台方寸山",
        location: {
          latitude: 11.11800,
          longitude: 2.22226
        }
      },
      终点: {
        name: "渣滓洞",
        address: "斜月三星洞",
        location: {
          latitude: 22.899,
          longitude: 33.878
        }
      }
    ,
    交通方式: "筋斗云",
      路程: "十万八千里",
      价格: "统统不要钱"
      }
    ],
      
      events: [
        {
          name: "途径点1",
          position:"导航数据",
          description: "描述",
          images: ["图片211 base64", "图片212 base64"]
        },
        {
          name: "途径点2",
          position:"导航数据",
          description: "描述",
          images: ["图片221 base64", "图片222 base64"]
        }
      ]
    }
  ]
});

import type { TabPaneName } from 'element-plus'

let tabIndex = 0
const editableTabsValue = ref('0')
const editableTabs = ref([
  {
    title: 'Day 1',
    name: '1',
    content: 'Tab 1 content',
  },
  {
    title: 'Day 2',
    name: '2',
    content: 'Tab 2 content',
  },
])

const handleTabsEdit = (
  targetName: TabPaneName | undefined,
  action: 'remove' | 'add'
) => {
  if (action === 'add') {
    const newTabName = `${++tabIndex}`
    editableTabs.value.push({
      title: 'New Tab',
      name: newTabName,
      content: 'New Tab content',
    })
    editableTabsValue.value = newTabName
  } else if (action === 'remove') {
    const tabs = editableTabs.value
    let activeName = editableTabsValue.value
    if (activeName === targetName) {
      tabs.forEach((tab, index) => {
        if (tab.name === targetName) {
          const nextTab = tabs[index + 1] || tabs[index - 1]
          if (nextTab) {
            activeName = nextTab.name
          }
        }
      })
    }

    editableTabsValue.value = activeName
    editableTabs.value = tabs.filter((tab) => tab.name !== targetName)
  }
}


</script>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.el-card {
    min-width: 100px;
    height: 100%;
    margin-right: 20px;
    transition: all .5s;
  }
  .el-card:hover{
    margin-top: -5px;
  }

  .innerimage h5 {
  color: #475669;
  opacity: 0.75;
  height:100%;
  margin: 0;
  text-align: center;
}
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}


</style>
