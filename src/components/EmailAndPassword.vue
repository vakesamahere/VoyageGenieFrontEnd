<template>
<el-form class="login-form" @submit.prevent="handleSubmit">
    <el-form-item>
      <el-input
        v-model="email"
        placeholder="邮箱"
        prefix-icon="Message"
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-input
        v-model="password"
        type="password"
        placeholder="密码"
        prefix-icon="Lock"
        show-password
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button color="#ff7f0e" class="login-button" @click="handleLogin">
        登录
      </el-button>
    </el-form-item>
    <div class="form-links">
        <el-link @click="register">注册登录</el-link>
        <el-link @click="recoverPassword">找回密码</el-link>
    </div>
  </el-form>
</template>


<script lang="ts" setup>
  import axios from 'axios';
  import { ref,reactive,defineEmits } from 'vue';
  import { useStore } from 'vuex';
  const store = useStore();
  const emit = defineEmits(['login','recover','register'])
  const email = ref('');
  const password = ref('');
  const result=ref(0)
  const data=ref({email,password,result})
  const response=ref()
  const setUserId = (id) => store.commit('setUserId', id);

const handleSubmit = () => {
    console.log('submit');
    
};
  
const handleLogin = async () => {
    let resUserId = null;
    try{
      const res=await axios.post('http://1.94.170.22:5000/login', data.value);
      response.value=res.data;
      console.log(res.data.user_id);
      resUserId = res.data.user_id
    }catch(error:any){
      console.error('There was an error sending the data!', error);
      response.value = { result: error.message };
    }
    if(response.value.result==0){
      alert('登录失败！未查询到邮箱或密码错误，请重新输入。');
    }
    else{
      alert('登录成功');
      setUserId(resUserId);
      emit('login');
    }
};

const register = () => {
    emit('register')
};

const recoverPassword = () => {
    emit('recover',email.value)
};

</script>
    
<style scoped>

.login-form {
    width: 100%;
}

.login-button {
    width: 100%;
    color: white;
}

.form-links {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
}

.form-links .el-link {
    font-size: 14px;
}
</style>

    
    
  