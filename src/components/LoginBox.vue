<template>
  <div class="layout">
    <el-container class="login-container">
      <div class="main-content">
        <div style="display: flex;align-items: center;justify-content: center;">
          <img src="../assets/genie.png" alt="Logo" class="logo"/>
        </div>
        <el-row :style="{transform:`translateX(${offset}%)`}" class="formbox">
          <el-col :span="1"/>
          <el-col :span="6">
            <reg @cancel="moveToRight" @register="handleRegister" class="formItem"></reg>
          </el-col>
          <el-col :span="2"/>
          <el-col :span="6">
            <eap @register="register" @login="handleLogin" @recover="recover" class="formItem"></eap>
          </el-col>
          <el-col :span="2"/>
          <el-col :span="6">
            <rec @cancel="moveToLeft" @recover="handleRecover" class="formItem"></rec>
          </el-col>
          <el-col :span="1"/>
        </el-row>
      </div>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { ref,defineEmits } from 'vue';
import eap from './EmailAndPassword.vue';
import reg from './RegisterUser.vue';
import rec from './RecoverPassword.vue';

const emit = defineEmits(['handleLogin']);


let offset = ref(0 / 3);

function register() {
  console.log('register');
  moveToLeft();
}

function recover(email: string) {
  console.log(email);
  moveToRight();
}

function handleLogin(email: string, password: string) {
  console.log(email);
  console.log(password);
  console.log('login');
  emit('handleLogin');
}

function handleRegister(email: string, password: string, username: string) {
  console.log(email);
  console.log(password);
  console.log(username);
}

function handleRecover(email: string, password: string, code: string) {
  console.log(email);
  console.log(password);
  console.log(code);
}

function moveToRight() {
  offset.value = offset.value - 100.0 / 3;
}

function moveToLeft() {
  offset.value = offset.value + 100.0 / 3;
}
</script>

<style scoped>
.layout {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.login-container {
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background-color: #f0f2f5;
  width: 100vw;
  height: 100%;
  align-items: center;
  justify-content: center;
  background-color: white;
  
}

.main-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.formbox {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 300%;
}

.formItem {
  position: relative;
  
}

.logo {
  width:40%;
  height: 40%;
  margin-bottom: 20px;
}

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

html, body {
  height: 100%;
  margin: 0;
}
</style>
