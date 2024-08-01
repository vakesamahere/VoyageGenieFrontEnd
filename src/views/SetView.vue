
<template>
    <div class="common-layout">
      <el-container style="height: 100vh;">
        <!--一级导航栏-->
        <!--<el-aside width="100px" class = "voyage" >
            <br>
            <div style="display: flex;align-items: center;justify-content: center;">
                <img alt="" src="./assets/logo.jpg" class="logo">
            </div>
            <br>
            <div style="display: flex;align-items: center;justify-content: center;">
                <el-button color="#ffc297" >
                    <el-icon style="font-size: 20px;color:#ff7008;"><ChatDotSquare/></el-icon>
                </el-button>
            </div>
            <br>
            <div style="display: flex;align-items: center;justify-content: center;">
                <el-button color="#ffc297" >
                    <el-icon style="font-size: 20px;color:#ff7008;"><House/></el-icon>
                </el-button>
            </div>
            <br>
            <div style="display: flex;align-items: center;justify-content: center;">
                <el-button color="#ffc297" >
                    <el-icon style="font-size: 20px;color:#ff7008;"><Bell/></el-icon>
                </el-button>
            </div>
            <br>
            <div style="display: flex;align-items: center;justify-content: center;">
                <el-button color="#ffc297" >
                    <el-icon style="font-size: 20px;color:#ff7008;"><User/></el-icon>
                </el-button>
            </div>
            <br>
            <div style="display: flex;align-items: center;justify-content: center;">
                <el-button color="#ffc297" >
                    <el-icon style="font-size: 20px;color:#ff7008;"><Moon/></el-icon>
                </el-button>
            </div>
            <div class="bottom-button">
                <el-button color="#ff7008" class="circle-button">
                    <el-icon style="font-size: 20px;color:white;"><Tools/></el-icon>
                </el-button>
            </div>
        </el-aside>-->
        <el-container >
             <!--二级导航栏-->
            <el-aside width="200px">
                <el-button color="white" class="top-button" icon="DArrowLeft">
                    <i class="custom-icon"></i>
                        设置
                </el-button>
                <br>
                <div style="display: flex;align-items: center;justify-content: center;">
                    <el-button color="white" :class="{'common-button':!isAClick,'click-button':isAClick}" icon="EditPen" @click="handleAClick">
                        <i class="custom-icon"></i>
                        详细资料
                    </el-button>
                </div>
                <br>
                <div style="display: flex;align-items: center;justify-content: center;">
                    <el-button color="white" :class="{'common-button':!isBClick,'click-button':isBClick}" icon="Lock" @click="handleBClick">
                        <i class="custom-icon"></i>
                        安全
                    </el-button>
                </div>
                <br>
                <div style="display: flex;align-items: center;justify-content: center;">
                    <el-button color="white" :class="{'common-button':!isCClick,'click-button':isCClick}" icon="Warning" @click="handleCClick">
                        <i class="custom-icon"></i>
                        帮助
                    </el-button>
                </div>
            </el-aside>
             <!--主界面-->
            <el-main class="main-content" >
                    <router-view/>
            </el-main>
        </el-container>
      </el-container>
    </div>
</template>

<script lang="ts" setup>
    import {ref} from 'vue'
    import { useRouter } from 'vue-router';
    const router = useRouter();
    const isAClick = ref(false)
    const isBClick = ref(false)
    const isCClick = ref(false)
    
    
    function handleAClick() {
        isAClick.value = true; 
        isBClick.value = false;
        isCClick.value = false;
        router.push({name:'Data'});
    }
    function handleBClick() {
      isAClick.value = false; 
      isBClick.value = true;
      isCClick.value = false;
      router.push({name:'Safety'});
    }
    function handleCClick(){
      isAClick.value = false; 
      isBClick.value = false;
      isCClick.value = true;
      router.push({name:'Help'});
    }
</script>




<style>
.voyage{
    background-color: #ffc297;
}
.logo{
    width: 50px;
}
.common-layout{
    display: flex;
    justify-content: center;
}
.circle-button{
    width: 50px;
    height: 50px;
    border-radius: 50%;
}
.bottom-button {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 350px;
}
.main-content {
  border: 2px solid black; /* 设置 el-main 的边框 */
  padding: 20px; /* 可选：内边距 */
  box-sizing: border-box; /* 确保内边距不影响边框尺寸 */
  flex: 1; /* 使 main-content 自适应宽度 */
  overflow: hidden; /* 隐藏溢出的内容 */
}
.top-button {
  font-size: 22px;
  color: black;
  height: 50px;
  width: 200px;
  display: flex;
  justify-content: flex-start; 
  align-items: center; 
  padding-left: 10px;
}
.custom-icon {
  font-size: 24px; /* 调整按钮图标的大小 */
  margin-right: 8px; /* 调整图标和文字之间的间距 */
}
.common-button{
    font-size: 18px;
  color: black;
  height: 50px;
  width: 180px;
  display: flex;
  justify-content: flex-start; 
  align-items: center; 
  padding-left: 30px;
}
.click-button{
    background-color: #eaeaea;
    font-size: 18px;
  color: black;
  height: 50px;
  width: 180px;
  display: flex;
  justify-content: flex-start; 
  align-items: center; 
  padding-left: 30px;
}
</style>
