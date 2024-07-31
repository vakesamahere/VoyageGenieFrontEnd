<template>
  <el-button color="#ff7f0e" class="button" @click="sendPost">
    发送
  </el-button>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const eventSource = ref<EventSource | null>(null);

function sendPost() {
  console.log("sendPost");

  const postData = {
    // 这里填写你要发送的 JSON 数据
    key: "value"
  };

  fetch('http://127.0.0.1:5000/stream', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(postData)
  })
  .then(response => {
    if (response.ok) {
      return response.body;
    } else {
      throw new Error('Network response was not ok.');
    }
  })
  .then(body => {
    const reader = body!.getReader();
    const decoder = new TextDecoder('utf-8');

    function readStream() {
      reader.read().then(({ done, value }) => {
        if (done) {
          console.log('Stream complete');
          return;
        }
        const chunk = decoder.decode(value, { stream: true });
        console.log('Received chunk:', chunk);
        readStream();
      });
    }

    readStream();
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });
}
</script>

<style scoped>
.button {
  position: absolute;
  top: 40%;
  scale: 4;
}
</style>
