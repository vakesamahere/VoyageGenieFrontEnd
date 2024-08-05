<template>
    <el-form class="login-form">
        <el-form-item>
          <el-input
            v-model="email"
            placeholder="邮箱"
            prefix-icon="Message"
            class="email"
          ></el-input>
            <el-button color="#ff7f0e" class="send-button" @click="send">
           发送验证码
          </el-button>
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
          <el-input
            v-model="code"
            type="code"
            placeholder="验证码"
            prefix-icon="Check"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button color="#ff7f0e" class="login-button" @click="handleRecover">
            重置密码
          </el-button>
        </el-form-item>
        <div class="form-links">
          <el-link @click="cancel">返回</el-link>
        </div>
      </el-form>
    </template>
 <script lang="ts" setup>
   import axios from 'axios';
import { ElNotification } from 'element-plus';
  import { ref,defineEmits } from 'vue';
  const emit = defineEmits(['cancel','recover'])
  const email = ref('');
  const password = ref('');
  const code = ref('');
  const result=ref(0);
  const data=ref({email,password,result});
  const response=ref();

const handleRecover = async () =>  {
    //
    emit('recover',email.value,password.value,code.value);
    try{
      const res=await axios.post('http://1.94.170.22:5000/reset_password', data.value);
      response.value=res.data;
    }catch(error:any){
      console.error('There was an error sending the data!', error);
      response.value = { result: error.message };
    }
    if(response.value.result==0){
      // alert('未查询到该用户！');
      ElNotification({
        title:'Oh No',
        type:'error',
        message:'未查询到该用户',
        duration:1500,
        offset:200
      })
    }
    else{
      ElNotification({
        title:'Success',
        type:'success',
        message:'密码已修改',
        duration:1500,
        offset:200
      })
    }
};
const cancel = () => {
    //
    emit('cancel')
};
const send = () => {
    //
    // alert('已发送');
    ElNotification({
      title:'Info',
      type:'info',
      message:'已发送',
      duration:1500,
      offset:200
    })
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
.email{
  width: 60%;
}
.send-button{
  width: 40%;
  color: white;
}
.form-links {
    display: flex;
    justify-content:center;
    margin-top: 10px;
}

.form-links .el-link {
    font-size: 14px;
}
</style scoped>