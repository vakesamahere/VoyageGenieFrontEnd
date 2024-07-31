<template>
  <h1 style="font-size:large;font-weight: bold;">{{ post.title }}</h1>
  <p style="margin-top: 10px;">{{ post.text }}</p>
  <el-carousel :interval="4000" type="card" height="200px" style="margin-top:20px">
    <el-carousel-item v-for="(image,index) in post.images?JSON.parse(post.images):[]" :src="image" :key="index" class="topImg img">
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
      v-for="(route,index) in post.routes?JSON.parse(post.routes):[]"
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



const props = defineProps<{
  post: Post | null;
}>();

// // 使用解构赋值从 props 中获取 post 数据
// const { post } = props;

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
