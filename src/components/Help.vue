<template>
    <div class="common-layout">
      <!-- <el-container> -->
        <el-main class="main">
            <div class="barrage-container">
              <div v-for="(barrage, index) in barrages" :key="index" :class="barrage.class" :style="barrage.style"></div>
            </div>
            <h2 style="text-align: center;">探索世界，从VoyageGenie开始 —— 您的智能旅行伴侣</h2>
            <div class="container">
            
            <section class="introduction-section">
                <div class="introduction-container">
                  
                  <p>欢迎来到VoyageGenie，一个专为热爱旅行的您设计的个性化旅行规划平台。我们深知每一次旅行都是一次全新的探索和发现，因此我们致力于打造一个能够激发您旅行灵感、满足您个性化需求的旅行社区。</p>
                  <p>**为什么选择VoyageGenie？**</p>
                  <p></p>
                  <ul>
                      <li>个性化旅行体验：通过我们的AI助手，您可以获得量身定制的旅行建议和攻略，让您的旅程独一无二。</li>
                      <li>社区分享与交流：加入我们的旅行社区，分享您的旅行故事，获取灵感，与来自世界各地的旅行者交流心得。</li>
                      <li>丰富的旅行资源：无论是热门目的地还是隐秘的小众景点，VoyageGenie都能为您提供详尽的旅行信息和实用建议。</li>
                      <li>动态交互体验：我们的前端设计注重用户体验，无论是通过瀑布流浏览攻略，还是通过AI Chat进行实时互动，都能让您感受到流畅和便捷。</li>
                      <li>全平台同步：无论您使用手机、平板还是电脑，VoyageGenie都能提供最佳的浏览体验。</li>
                  </ul>
                  <p></p>
                  <p>在VoyageGenie，我们相信旅行不仅仅是到达目的地，更是一段关于自我发现和世界认知的旅程。让我们一起启程，探索未知，记录美好，分享感动。</p>
                  <p><strong>加入VoyageGenie，让每一次旅行都成为您人生中难忘的篇章。</strong></p>
                </div>
            </section>
            <img alt="" src="/src/assets/genie.png" class="inserted-image">
            </div>
        </el-main>
      <!-- </el-container> -->
    </div>
</template>


<script>
export default {
  data() {
    return {
      barrages: [],
      bheight: 8,
      bgap:4
    };
  },
  created() {
    this.generateBarrages();
  },
  methods: {
    getRandom(max) {
      return (Math.random() * max);
    },
    generateBarrages() {
      const numberOfBarrages = 15;
      for (let i = 0; i < numberOfBarrages; i++) {
        const count = this.getRandom(6)
        // 
        let ws = []
        let sum =0;
        for (let k=0;k<count;k++){
          let t = 10+Math.random()*8
          ws.push(t)
          sum+=t
        }
        for (let k = 0;k<count;k++){
          ws[k]/=sum
          ws[k]*=100
        }
        let td = 0

        const offset = Math.random()*100+50
        for (let k = 0; k <count; k++){
          this.barrages.push({
            class: `barrage-bar`,
            style: {
              top: `calc(${((i+0.0) / (numberOfBarrages - 1)) * 100}% + ${i*this.bgap}px)`,
              width: `${ws[k]*0.8}%`,
              animationDelay: `${10*td/100.0}s`,
              left: `200%`,
              transform: `translateX(${-offset}%)`,
              height: `${this.bheight}px`,
              borderRadius: `${this.bheight/2}px`,
              backgroundColor: `rgb(255, ${Math.floor(Math.random() * (165 - 140 + 1)) + 140}, 0)`,
            }
          });
          td += ws[k]
        }
      }
    }
  }
};
    
</script>

<style scoped>
* {
  overflow: visible;
}
.header{
    font-size: 30px;
    padding-left: 40px;
    font-weight: bold;
}
.row{
    margin-left: 80px;
}
.main{
    position: relative;
    font-size: 25px;
    font-weight: bold;
    
}
.inserted-image{
    /* max-width: 100%;  确保图片不会超过容器宽度 */
    height: 80%;
    width: 40%; /* 根据需要调整图片宽度 */
    margin-top: 0%;
    margin-right:-5%;
}

.title {
  color: #42d1f5; /* 例如使用明亮的青色作为标题高亮 */
  margin-bottom: 20px;
}

p {
  font-size: 18px;
  line-height: 1.6;
  color: #bbb; /* 文字颜色为较浅的灰色，以提高可读性 */
  margin-bottom: 15px;
}

.closing-statement {
  font-weight: bold;
  color: #fff; /* 结束语文字颜色为白色 */
}

li{
  font-size: 20px;
}

@media (max-width: 768px) {
  .introduction-container {
    padding: 0 10px;
  }
  .container {
    flex-direction:column; /* 桌面模式为左右布局 */
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .title {
    font-size: 1.5rem;
  }

  p {
    font-size: 16px;
  }
}

.common-layout{
  height: calc(84.5vh + 7vh);
  width: 100%;
  overflow: scroll;
}

.introduction-section {
  background-color: #000; /* 黑色背景 */
  color: #fff; /* 文字颜色为白色 */
  padding: 50px;
  position: relative;
  overflow: visible;
  flex: 1; /* 文本容器占据剩余空间 */
}

.introduction-container {
  position: relative;
  z-index: 0;
}

.barrage-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
  overflow: visible;
}

.barrage-bar {
  position: absolute;
  overflow: hidden;
  /* width: 100%; */
  
  animation: moveBarrage 10s linear infinite; /* 动画 */
  opacity: 0.2;
}
.container {
  display: flex;
  margin: 10 auto;
  justify-content: space-between; /* 根据需要调整 */
}

@keyframes moveBarrage {
  0% {
    left: 100%;
    opacity: 0;
  }
  25% {
    left: 50%;
    opacity: 0.4;
  }
  50% {
    left: 0%;
    opacity: 0;
  }
  100% {
    left: -100%;
    opacity: 0;
  }
}

.barrage-bar::before,
.barrage-bar::after {
  content: '';
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent);
}

.barrage-bar::before {
  left: -100%;
  animation: shine1 3s infinite;
}

.barrage-bar::after {
  left: 100%;
  animation: shine2 2s infinite;
}

@keyframes shine1 {
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
}

@keyframes shine2 {
  0% {
    left: 100%;
  }
  100% {
    left: -100%;
  }
}

</style>