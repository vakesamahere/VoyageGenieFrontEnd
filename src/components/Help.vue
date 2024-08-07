<template>
    <div class="common-layout">
      <el-container>
        <el-main class="main">
            <img alt="" src="/src/assets/genie.png" class="inserted-image">
            <section class="introduction-section">
                <div class="introduction-container">
                <h2>探索世界，从VoyageGenie开始 —— 您的智能旅行伴侣</h2>
                <p>欢迎来到VoyageGenie，一个专为热爱旅行的您设计的个性化旅行规划平台。我们深知每一次旅行都是一次全新的探索和发现，因此我们致力于打造一个能够激发您旅行灵感、满足您个性化需求的旅行社区。</p>
                <p>**为什么选择VoyageGenie？**</p>
                <ul>
                    <li>个性化旅行体验：通过我们的AI助手，您可以获得量身定制的旅行建议和攻略，让您的旅程独一无二。</li>
                    <li>社区分享与交流：加入我们的旅行社区，分享您的旅行故事，获取灵感，与来自世界各地的旅行者交流心得。</li>
                    <li>丰富的旅行资源：无论是热门目的地还是隐秘的小众景点，VoyageGenie都能为您提供详尽的旅行信息和实用建议。</li>
                    <li>动态交互体验：我们的前端设计注重用户体验，无论是通过瀑布流浏览攻略，还是通过AI Chat进行实时互动，都能让您感受到流畅和便捷。</li>
                    <li>响应式网页设计：无论您使用手机、平板还是电脑，VoyageGenie都能提供最佳的浏览体验。</li>
                </ul>
                <p>在VoyageGenie，我们相信旅行不仅仅是到达目的地，更是一段关于自我发现和世界认知的旅程。让我们一起启程，探索未知，记录美好，分享感动。</p>
                <p><strong>加入VoyageGenie，让每一次旅行都成为您人生中难忘的篇章。</strong></p>
                </div>
            </section>
        </el-main>
      </el-container>
    </div>
</template>


<script lang="ts" setup>
    
</script>

<style scoped>
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
    text-align: center;
    font-size: 25px;
    font-weight: bold;
}
.inserted-image{
    max-width: 100%;  /* 确保图片不会超过容器宽度 */
    height: auto;  /* 保持图片的纵横比 */
}
.inserted-image{
    width: 60%;
    
}
.introduction-section {
  background-color: #000; /* 黑色背景 */
  color: #fff; /* 文字颜色为白色 */
  padding: 50px ;
  margin-top: -100px;
}

.introduction-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
  text-align: center;
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

@media (max-width: 768px) {
  .introduction-container {
    padding: 0 10px;
  }

  .title {
    font-size: 1.5rem;
  }

  p {
    font-size: 16px;
  }
}
</style>