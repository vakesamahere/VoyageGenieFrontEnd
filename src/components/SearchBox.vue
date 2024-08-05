<template>
    <div class="inputboxes-container">
        <div class="search-box">
        <el-input
            type="text"
            v-model="searchQuery"
            @keyup.enter="search"
            placeholder="Search"
        />
        <el-button type='primary' @click="search">enter</el-button>
        
        </div>
    </div>
  </template>
  
<script>

export default{
props:{
    wfHeight:Number,
    wfWidth:Number,
    msg:String
},
data(){
    return{
        searchQuery:'',
        selectedCity:'',
        cities:[
            '北京',
            '上海',
            '广州',
            '深圳',
            '杭州'
            ]
    }
},
methods:{
    search(){
        this.$emit('search',this.searchQuery)
    }
}
}
</script>
    
<style scoped>
.inputboxes-container{
    display: flex;
    flex-direction: row;
    align-items: self-start;
    height: 8vh;
    overflow: hidden;

}
.select-box {
    height: 4vh;
    padding: 1vh; /* 为容器添加一些内边距 */
    display: flex;
    align-items: center;
    z-index: 2000;

}
.search-box {
    margin-left: 15%;
    height: 30px;
    width:70%;
    display: flex;
    align-items: center;
    box-sizing: border-box; /* 边框计算在宽度内 */
    pointer-events: all;
    z-index: 2000;
}
.label {
margin-right:20px; /* 标题左侧边距 */
}
input, select, button {
padding: 20px;
border: 1px solid #ccc;
border-radius: 4px;
}
input {
flex-grow: 1; /* 使输入框占据剩余空间 */
margin-right: 8px; /* 与下拉框和按钮保持间隔 */
}
/*button {
background-color: lightpink;
color: white;
border: none;
cursor: pointer;
}
button:hover {
background-color: #0056b3;
}*/
select {
margin-right: 8px; /* 与按钮保持间隔 */
cursor: pointer;
}
.el-button{
    margin-left: 2px;
    width: 10%;
}
</style>