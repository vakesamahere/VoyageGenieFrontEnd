<template>
  <el-form class="login-form">
      <el-form-item>
        <el-input
          v-model="email"
          placeholder="邮箱"
          prefix-icon="Message"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="name"
          placeholder="用户名 "
          prefix-icon="User"
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
        <el-button color="#ff7f0e" class="login-button" @click="register">
          注册
        </el-button>
      </el-form-item>
      <div class="form-links">
        <el-link @click="cancel">返回</el-link>
      </div>
    </el-form>
  </template>
  
  
  <script lang="ts" setup>
    import axios from 'axios';
    import { ref,defineEmits } from 'vue';
    const emit = defineEmits(['cancel','register'])
    const email = ref('');
    const password = ref('');
    const name = ref('');
    const data=ref({email,password,name})//待添加属性username
    const response=ref();
  
    const register = async () => {
      //
      console.log(1);
      emit('register',email.value,password.value,name.value)
      try{
      const res=await axios.post('http://1.94.170.22:5000/register', data.value);
      console.log(data.value.name);
      response.value=res.data;
      if(response.value.result==0){
      alert('该邮箱已被注册账号');
    }
    else{
      alert('注册成功');
    }
    }catch(error:any){
      console.error('There was an error sending the data!', error);
      response.value = { result: error.message };
      alert('注册失败');
    }
    
    };
  
    const cancel = () => {
      //
      console.log(1);
      emit('cancel')
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
      justify-content: center;
      margin-top: 10px;
  }
  
  .form-links .el-link {
      font-size: 14px;
  }
  </style>
  
      
      
    