<template>
    <div class="common-layout">
      <el-container>
        <el-header class="header" style="width: 100%;">
            <el-row>
                <el-col :span="1"></el-col>
                <el-col :span="21"><span>账号安全</span></el-col>
                <el-col :span="2" class="avatar"> <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" :size="50"/></el-col>
            </el-row>
        </el-header>
        <el-main class="main">
            <div class="tag">
                Email
            </div>
            <el-row class="input-layout">
                <el-col :span="2"></el-col>
                <el-col :span="20"><el-input v-model="email"  placeholder="请输入邮箱" class="email"/></el-col>
                <el-col :span="2"></el-col>
            </el-row>
            <br>
            <div class="tag">
                验证码
            </div>
            <el-row class="input-layout">
                <el-col :span="2"></el-col>
                <el-col :span="14"><el-input v-model="verification" placeholder="请输入验证码" class="input"/></el-col>
                <el-col :span="1"></el-col>
                <el-col :span="5"><el-button type="primary" class="send-button" @click="click">发送验证码</el-button>  </el-col>
                <el-col :span="2"></el-col>
            </el-row>
            <br>
            <div class="tag">
                旧密码
            </div>
            <el-row class="input-layout">
                <el-col :span="2"></el-col>
                <el-col :span="20"><el-input v-model="oldPassword" placeholder="请输入旧密码" class="input"/></el-col>
                <el-col :span="2"></el-col>
            </el-row>
            <br>
            <div class="tag">
                新密码
            </div>
            <el-row class="input-layout">
                <el-col :span="2"></el-col>
                <el-col :span="20"><el-input v-model="password" placeholder="请输入新密码" class="input"/></el-col>
                <el-col :span="2"></el-col>
            </el-row>
            <br>

            <el-row  class="row" >
                <el-col :span="8"></el-col>
                <el-col :span="8"><el-button type="primary" class="button" @click="handleclick">确定</el-button></el-col>
                <el-col :span="8"></el-col>
            </el-row>
        </el-main>
      </el-container>
    </div>
  </template>

<script lang="ts" setup>
    import axios from 'axios';
    import { ref,watch,computed } from 'vue'
    const verification = ref('')
    const email= ref('')
    const oldPassword = ref('')
    const password = ref('')
    const RightPassword=ref('')
    const response=ref();
    const data=ref({"email":email,"new_password":password})
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

    async function handleclick(){
        try{
            const res=await axios.get(`http://1.94.170.22:5000/get_user_profile?user_id=${userId.value}`);
            response.value=res.data;
            RightPassword.value=response.value.password;
        }catch(error:any){
            console.error('There was an error fetching the data!',error);
        }
        if(RightPassword.value==password.value){
                alert('新设密码与旧密码重复！不可修改');
                return ;
        }
        else{
            try{
                const res1=await axios.post('http://1.94.170.22:5000/reset_password',data.value);
                response.value=res1.data;
            }catch(error:any){
                console.error('There was an error sending the post!',error);
            }
        }
        if(response.value.result==0)
        {
            alert('修改失败！');
        }
        else{
            alert('修改成功！');
        }

    }
    function click(){
       alert('已发送');
    }
    
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
.email{
    width: 100%;
    height: 50px;
    font-size: 20px;
    font-weight: bold;
}
.email .el-input__inner {
    padding-left: 50px; /* 根据需要调整距离 */
  }
.input-layout{
    display: flex;
    align-items: center;
    justify-content: center;
}
.tag{
    font-size: 20px;
    padding-left: 10%;
    font-weight: bold;
    display: flex;
    justify-content: flex-start;
}
.button{
    font-size: 20px;
    color: white;
    height: 50px;
    width: 100%;
    display: flex;
    justify-content: center; 
    align-items: center; 
}
.send-button{
    font-size: 20px;
    color: white;
    width: 100%;
    height: 50px;
}

.main{
    position: relative;
}
::-webkit-scrollbar{
    display: none;
}
</style>