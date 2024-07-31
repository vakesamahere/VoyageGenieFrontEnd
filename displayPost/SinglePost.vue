<template>
  <div class="container">
      <div class="backgroundImg" :style="{backgroundImage:`(url${post.cover})`}">
          <img :src="post.cover" alt="">
      </div>
      <div class="titleBox">
          {{ post.title }}
      </div>

      <div class="topImgsBox">
          <img v-for="(image,index) in post.images" :src="image" :key="index" class="topImg img">
      </div>

      <div class="topTextBox light">
          {{ post.text }}
      </div>

      <div class="routesBox light">
          <div v-for="(route,index) in post.routes" :key="index" class="routeBox">
              <div class="routeName">
                  {{ route.name }}
              </div>
              <div class="routeDescription">
                  {{route.description}}
              </div>
              <div class="eventsBox">
                  <div class="eventsLeftBlock"></div>
                  <div v-for="(event,innerIndex) in route.events" :key="innerIndex" class="eventBox">
                      <div class="eventImagesBox">
                          <div class="eventTextBox">
                              <div class="eventName">
                                  {{ event.name }}
                              </div>
                              <div class="eventDescription">
                                  {{ event.description }}
                              </div>
                          </div>
                          <img v-for="(image,imgIndex) in event.images" :key="imgIndex" :src="image" class="eventImg img"/>
                      </div>
                  </div>
                  
                  <div class="eventsRightBlock"></div>
              </div>
          </div>
      </div>
  </div>
</template>

<script lang="ts">
export default {
props: {
  post: {
    type: Object,
    default:()=>(
          {
              "title":"标题",
              "cover":"封面base64编码",
              "images":[
                  "图片A base64",
                  "图片B base64"
              ],
              "text":"总体介绍",
              "routes":[
                  {
                      "name":"路线1",
                      "navigation":"导航数据",
                      "events":[
                          {
                              "name":"途径点1",
                              "position":"导航数据",
                              "description":"描述",
                              "images":[
                                  "图片111 base64",
                                  "图片112 base64"
                              ]
                          },
                          {
                              "name":"途径点2",
                              "position":"导航数据",
                              "description":"描述",
                              "images":[
                                  "图片121 base64",
                                  "图片122 base64"
                              ]
                          }
                      ]
                  },
                  {
                      "name":"路线2",
                      "navigation":"导航数据",
                      "events":[
                          {
                              "name":"途径点1",
                              "position":"导航数据",
                              "description":"描述",
                              "images":[
                                  "图片211 base64",
                                  "图片212 base64"
                              ]
                          },
                          {
                              "name":"途径点2",
                              "position":"导航数据",
                              "description":"描述",
                              "images":[
                                  "图片221 base64",
                                  "图片222 base64"
                              ]
                          }
                      ]
                  }
              ]
          }
      )
  }
}
};

</script>

<style scoped>
* {
  border: 0px solid black;
}

::-webkit-scrollbar {
  display: none
}

.container {
  /* CSS for container */
  position: absolute;
  height: 100%;
  width: 100%;
  background-size: cover;
  background-position: center;
  box-shadow: inset 0 8vh 5vh -10px rgba(0, 0, 0, 0.3);
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
}

.light {
  text-shadow: 0 0 1px #ffffff, 0 0 2px #ffffff, 0 0 3px #ffffff;
}

.box {
  border-radius: 12px;
  overflow: auto
}
.img {
  scale: 90%;
  filter: drop-shadow(0 0 3px rgba(0,0,0,0.5));
  border-radius:  5px;
  transition: scale 0.3s ease-in-out 0.05s;
}
.img:hover {
  scale: 1.005;
}

.container > # {
  /*
  text-shadow: 0 0 10px #ffffff, 0 0 20px #ffffff, 0 0 30px #ffffff;
  */
  flex-shrink: 0;
}

.backgroundImg {
  z-index: -1;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size:cover;
  background-position: center;
  filter: blur(10px); /* 设置模糊效果 */
  transform: scale(1.1); /* 稍微放大以避免边缘的白色边框 */
}

.titleBox {
  /* CSS for titleBox */
  position: fixed;
  font-size: 5vh;
  color: #eeeeee;
  align-self: self-start;
  padding-left: 5%;
  z-index: 1;
  text-shadow: 0 0 1px #aaaaaa, 0 0 2px #aaaaaa, 0 0 3px #aaaaaa;
}

.topImgsBox {
  /* CSS for topImgsBox */
  padding-top: 12vh;
  height: 30vh;
  min-height: 30vh;
  width: 90%;
  display: flex;
  flex-direction: row;
  overflow-y: hidden;
  overflow-x: scroll;
  align-self: self-start;
  padding-left: 5%;
}

.topImg {
  /* CSS for topImg */
  height: 98%;
  width: auto;
}

.topTextBox {
  /* CSS for topTextBox */
  padding-top: 2vh;
  width: 80%;
  font-size: 2.5vh;
}

.routesBox {
  /* CSS for routesBox */
  padding-top: 5vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
}

.routeBox {
  /* CSS for routeBox */
  width: 100%;
  height: 40vh;
  display: flex;
  flex-direction: column;
  align-items: self-start;
}

.routeName {
  /* CSS for routeName */
  font-size: 4vh;
  padding-left: 7%;
  height: 5vh;
}

.routeDescription {
  /* CSS for routeDescription */
  font-size: 3vh;
  padding-left: 7%;
  height: 4vh;
}

.eventsBox {
  /* CSS for eventsBox */
  height: 31vh;
  display: flex;
  flex-direction: row;
  align-items: self-start;
  width: 100%;
  overflow-x: scroll;
  overflow-y: hidden
}

.eventsLeftBlock {
  width: 7%;
  flex-shrink: 0;
}

.eventsRightBlock {
  width: 100%;
  flex-shrink: 0;
}

.eventBox {
  /* CSS for eventBox */
  height: 100%;
  padding-right: 2vw;
}

.eventName {
  /* CSS for eventName */
  align-self: self-start;
  font-size: 2.5vh;
}

.eventDescription {
  /* CSS for eventDescription */
  align-self: self-start;
  font-size: 2vh;
}

.eventImagesBox {
  /* CSS for eventImagesBox */
  height: 100%;
  min-height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: start;
}

.eventTextBox {
  /* CSS for eventTextBox */
  height: 100%;
  padding-right: 2vh;
  min-width: 18vh;
  display: flex;
  flex-direction: column;
  align-items: self-start;
  overflow-y: scroll;
}

.eventImg {
  /* CSS for eventImg */
  height: 98%;
  width: auto;
}

</style>