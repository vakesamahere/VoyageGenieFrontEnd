<template>
  <div class="demo-collapse">
    <el-collapse v-model="activeName" accordion>
      <el-collapse-item title="往返" name="1">
        <div>
           <!-- 动态生成的 div 列表，展示输入文本 -->
           <div v-for="(message, index) in textList1" :key="'group1-'+index" v-if="activeName ==='1'">
            <el-card style="position: relative;">
              <strong>{{ message.from }}:</strong> {{ message.content }}
              <div v-if="(index+1)%2===0" class="card-actions">
                <el-radio v-model="radio1" :label="index">{{''}}</el-radio>
              </div>
            </el-card>
            <p style="height: 8px;"></p>

            </div>
            
        </div>
      </el-collapse-item>
      <el-collapse-item title="游玩" name="2">
        <div>
          <div v-for="(text, index) in textList2"  v-if="activeName === '2'" :key="'group2-'+index">
            <el-card style="position: relative;">
              {{ text }}
              <div v-if="(index+1)%2===0" class="card-actions">
                <el-checkbox v-model="radio2" :label="index">{{''}}</el-checkbox>
              </div>
            </el-card>
            <p style="height: 8px;"></p>

          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script lang="ts" setup>
import { ref,watch,computed } from 'vue'
const props = defineProps(['textList1','textList2','isdone']);
const textList1 = ref(props.textList1 || []);
const textList2 = ref(props.textList2 || []);
const index = ref(0);
const radio1 = ref(index.value)
const radio2 = ref(index.value)




watch(() => props.textList1, (newVal) => {
    textList1.value[index.value]+=newVal ;
 
  }
);
watch(() => props.textList2, (newVal) => {
    textList2.value[index.value]+=newVal;

  }
);
const activeName = ref('1')
const emit = defineEmits(['update:activeName']);
watch(activeName, (newVal) => {
  emit('update:activeName', newVal);
});

</script>

<style>

.card-actions {
  position: absolute;
  bottom: 5px; /* 距离卡片底部的距离 */
  right: 10px; /* 距离卡片右侧的距离 */
}
</style>