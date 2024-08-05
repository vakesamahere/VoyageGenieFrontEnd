<template>
  <div class="common-layout">
    <el-container>
      <el-header class="header" style="width: 100%;">
          <el-row>
            <el-col :span="1"></el-col>
            <el-col :span="21"><span>编辑资料</span></el-col>
            <el-col :span="2" class="avatar"> <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" :size="50"/></el-col>
          </el-row>
      </el-header>
      <el-main class="main">
      <div class="tag">
          昵称
      </div>
      <el-row class="input-layout">
          <el-col :span="2"></el-col>
          <el-col :span="20"><el-input v-model="name" :disabled="isDisabled" :placeholder="name" class="input"/></el-col>
          <el-col :span="2"></el-col>
      </el-row>
      <br>
      <div class="tag">
          Email
      </div>
      <el-row class="input-layout">
          <el-col :span="2"></el-col>
          <el-col :span="20"><el-input v-model="email" disabled :placeholder="email" class="input"/></el-col>
          <el-col :span="2"></el-col>
      </el-row>
      <br>
      <div class="tag">
          密码
      </div>
      <el-row class="input-layout">
          <el-col :span="2"></el-col>
          <el-col :span="20"><el-input v-model="password" disabled :placeholder="password" class="input"/></el-col>
          <el-col :span="2"></el-col>
      </el-row>
      <br>
      <div class="tag">
          简介
      </div>
      <el-row class="input-layout">
          <el-col :span="2"></el-col>
          <el-col :span="20"><el-input v-model="bio" type="textarea" rows="4" :disabled="isDisabled" :placeholder="bio" class="introduce"/></el-col>
          <el-col :span="2"></el-col>
      </el-row>

          <el-row  class="row" >
              <el-col :span="8"><el-button  v-if = "showBAndC" plain  class="button-cancel"  type="primary"  @click="cancel">取消</el-button></el-col>
              <el-col :span="8"><el-button v-if = "showA"  class="button"type="primary" @click="alter">修改</el-button></el-col>
              <el-col :span="8"><el-button v-if = "showBAndC"  class="button" type="primary"@click="save">保存</el-button></el-col>
          </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
  import axios from 'axios';
import { ElNotification } from 'element-plus';
  import { onMounted, ref,computed,watch } from 'vue'
  const name = ref('')
  const email= ref('')
  const password = ref('')
  const bio = ref('')
  const isDisabled = ref(true);
  const showA = ref(true);
  const showBAndC = ref(false);
  const response=ref();
  const tele=ref();
  const birth=ref();

  import { useStore } from 'vuex';

const store = useStore();
const userId = ref(store.state.userId);

// 使用getter获取userId
const getUserId = computed(() => store.state.userId);

// 监听userId变化
watch(() => store.getters.getUserId, (newVal, oldVal) => {
 console.log(`User ID changed from ${oldVal} to ${newVal}`);
      // 执行其他需要的操作
 });


  const show=async ()=>{
      try{
          const res=await axios.get(`http://1.94.170.22:5000/get_user_profile?user_id=${userId.value}`);
          response.value=res.data;
          email.value=response.value.email;
          password.value=response.value.password;
          bio.value=JSON.parse(response.value.info).bio;
          name.value=response.value.name;
          tele.value=response.value.tele;
          birth.value=response.value.birth;
      }catch(error:any){
          console.error('There was an error fetching the data!',error);
      }
  };
  onMounted(() => {
    show(); 
  });
  // 隐藏按钮 B 和 C，重新显示按钮 A
  const save = async () => {
    isDisabled.value = !isDisabled.value;
    showA.value = true;
    showBAndC.value = false;
    try{
      const info=ref(JSON.stringify({"bio":bio.value}));
      const data=ref({"user_id":userId.value,"email":email.value,"name":name.value,"tele":tele.value,"info":info.value})
      console.log(data.value);
      const res=await axios.post('http://1.94.170.22:5000/update_user_profile', data.value);
      response.value=res.data;
    }catch(error:any){
      console.error('There was an error sending the post',error);
    }
    if(response.value.status=='success'){
      // alert('修改成功！');
      ElNotification({
        title:'Success',
        type:'success',
        message:'修改成功',
        duration:1500,
        offset:200
      })
    }
    else{
      // alert(response.value.status+'修改失败！');
      ElNotification({
        title:'Oh No',
        type:'error',
        message:'修改失败...Something Wrong',
        duration:1500,
        offset:200
      })
    }
    show();
  };
  const cancel = () => {
    isDisabled.value = !isDisabled.value;
    showA.value = true;
    showBAndC.value = false;
    show();
  };

  // 切换输入框状态的函数
  const alter = () => {
    isDisabled.value = !isDisabled.value;
    showA.value = false;
    showBAndC.value = true;
  };
 
</script>


<style scoped>
.header{
  font-size: 30px;
  font-weight: bold;
}
.input{
  width: 100%;
  height: 50px;
  font-size: 20px;
  font-weight: bold;
}
.input .el-input__inner {
  padding-left: 50px; /* 根据需要调整距离 */
}
.input-layout{
  display: flex;
  align-items: center;
  justify-content: center;
}
.introduce{
  width: 100%;
  height: 200px;
  font-size: 20px;
  font-weight: bold;
}

.introduce .el-textarea__inner {
padding-left: 60px; /* 设置输入内容距离左边框 200px */
}
.tag{
  font-size: 20px;
  padding-left: 10%;
  display: flex;
  justify-content: flex-start;
  font-weight: bold;
}
.button{
  font-size: 20px;
height: 50px;
width: 100%;
display: flex;
justify-content: center; 
align-items: center; 
}
.button-cancel{
font-size: 20px;
height: 50px;
width: 100%;
display: flex;
justify-content: center; 
align-items: center; 
}
.row{
  display: flex;
  justify-content: flex-start;
  /* padding-left: 40px; */
}
.main{
  position: relative;
  height: 100%;
}
::-webkit-scrollbar{
  display: none;
}
</style>