<template>
  <!-- 左侧显示title和text，右侧显示routes -->
  <!-- start of container -->
  <div class="container-box">
    <!-- start of routes -->
    <div class="routes-box">
      <div class="route-box">
        <iframe :src="`${iframeUrl}${postRoutes}`" width="100%" height="100%" frameborder="0" allowfullscreen></iframe>
      </div>
    </div>
    <!-- end of routes -->
    <!-- button -->
    <div class="button-box" :class="toggleClass" @click="toggleText">
      <div v-if="hideText" class="text-icon">A</div>
      <el-icon v-else><Hide /></el-icon>
    </div>
    <!-- button -->
    <!-- start of left text area -->
    <div class="text-area-box" :class="toggleClass">
      <div class="title-box">
        {{ postTitle }}
      </div>
      <div class="text-box">
        {{ postText }}
      </div>
    </div>
    <!-- end of left text area -->
    <!-- start of bg -->
    <div class="bg" :class="toggleClass"></div>
    <!-- end of bg -->
  </div>
  
  <!-- end of container -->

</template>

<script>
export default {
  props:{
    post:null
  },
  data() {
    return {
      iframeUrl:'static/a.html?data=',
      hideText:true
    }
  },
  methods:{
    toggleText(){
      this.hideText=!this.hideText
      this.$emit('toggleText',this.hideText)
    }
  },
  computed:{
    postRoutes(){
      // if(!this.post||!this.post.routes){
      // }
      try {
        return encodeURIComponent(JSON.stringify(JSON.parse(this.post.routes).flatMap(route => 
          route.events.map(event => ({
              place: '',
              title: event.name,
              title2: '',
              description: event.description,
              image: event.images[0] || ''
          }))
        )));
      } catch (error) {
        return encodeURIComponent(JSON.stringify([
                {
                    place:'place name 2',
                    title:'2-line1',
                    title2:'2-line2',
                    description:'Description2',
                    image:'https://assets.codepen.io/3685267/timed-cards-2.jpg'
                },
                {
                    place:'place name 3',
                    title:'3-line1',
                    title2:'3-line2',
                    description:'Description3',
                    image:'https://assets.codepen.io/3685267/timed-cards-3.jpg'
                },
                {
                    place:'place name 4',
                    title:'4-line1',
                    title2:'4-line2',
                    description:'Description4',
                    image:'https://assets.codepen.io/3685267/timed-cards-4.jpg'
                },
                {
                    place:'place name ',
                    title:'5-line1',
                    title2:'5-line2',
                    description:'Description5',
                    image:'https://assets.codepen.io/3685267/timed-cards-5.jpg'
                },
                {
                    place:'place name 6',
                    title:'6-line1',
                    title2:'6-line2',
                    description:'Description6',
                    image:'https://assets.codepen.io/3685267/timed-cards-6.jpg'
                },
            ]))
      }
    },
    postText(){
      if(this.post==null){
        return 'postText'
      }
      return this.post.text
    },
    postTitle(){
      if(this.post==null){
        return 'postTitle'
      }
      return this.post.title
    },
    toggleClass() {
      return this.hideText?'hide-text':'show-text'
    }
  }
}
</script>

<style scoped>
* {
  /* border: 1px solid pink; */
}
.container-box {
  position: fixed;
  width: 100vw;
  height: 100vh;
  overflow: show;
  display:flex;
  flex-direction: row;
  background-color: var(--bg-color);
}
.routes-box {
  height: 100%;
  width: 100%;
  flex-shrink: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.route-box {
  width: 100%;
  height: 93vh;
  flex-shrink: 0;
}

.button-box {
  width: 4vw;
  height: 4vw;
  border-radius: 50%;
  position: absolute;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2.4vw;
  border: 0.11vw solid var(--display-text-color);
  cursor: pointer;
  transition: all 0.2s ease;
  z-index: 1000;
  scale: 0.8;
}

.button-box:hover{
  scale: 0.9;
}

.button-box.show-text {
  top: 80%;
  left: 50%;
  scale: 1;
}
.button-box.hide-text {
  top: 45%;
  left: -6.5vw;
  filter: drop-shadow(0 0 2px var(--color-light));
}


.text-area-box {
  position: absolute;
  height: 100%;
  width: 100%;
  flex-shrink: 1;
  transition: all 0.3s ease;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2;
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
}
.text-area-box.hide-text {
  opacity: 0;
  display: none;
}
.text-area-box.show-text {
  opacity: 1;
}
.title-box {
  padding-top: 2%;
  color: var(--display-text-color);
  font-size: 4vh;
  z-index: 3;
}
.text-box {
  padding-top: 1%;
  color: var(--display-text-color);
  font-size: 3vh;
  z-index: 3;
  max-width: 70%;
  word-wrap: break-word;
}

.bg {
  transition: all 0.3s ease;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  scale: 2;
  backdrop-filter: blur(3px);
}
.bg.hide-text {
  display: none;
  opacity: 0;
  z-index: -1;
}
.bg.show-text {
  opacity: 1;
  z-index: 1;
}

.text-icon {
  transform: translateY(-5%);
}

</style>