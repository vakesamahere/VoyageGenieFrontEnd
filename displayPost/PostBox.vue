<template>
  <!-- 左侧显示title和text，右侧显示routes -->
  <!-- start of container -->
  <div class="container-box">
    <!-- start of left text area -->
    <div class="text-area-box">
      <div class="title-box">
        {{ postTitle }}
      </div>
      <div class="text-box">
        {{ postText }}
      </div>
    </div>
    <!-- end of left text area -->
    <!-- start of right routes -->
    <div class="routes-box">
      <div v-for="(route,index) in postRoutes" :key="index" class="route-box">
        <iframe :src="`${iframeUrl}${route}`" width="100%" height="100%" frameborder="0" allowfullscreen></iframe>
      </div>
    </div>
    <!-- end of right routes -->
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
      iframeUrl:'static/a.html?data='
    }
  },
  computed:{
    postRoutes(){
      if(!this.post||!this.post.routes){
        return [encodeURIComponent(JSON.stringify([
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
            ]))]
      }
      return JSON.parse(this.post.routes).map(route => 
          route.events.map(event => (encodeURIComponent(JSON.stringify({
          place: '',
          title: event.name,
          title2: '',
          description: event.description,
          image: event.images[0] || ''
          }))))
      );
    },
    postText(){
      if(this.post==null){
        return ''
      }
      return this.post.text
    },
    postTitle(){
      if(this.post==null){
        return ''
      }
      return this.post.title
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
  overflow: hidden;
  display:flex;
  flex-direction: row;
  background-color: var(--bg-color);
}
.text-area-box {
  height: 100%;
  width: 25%;
  flex-shrink: 1;
}
.title-box {
  min-height: 10%;
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
</style>