<template>
  <div class="room-container">
    <div class="room-cont" :ref="setRef">
      <p v-for="({ data, msg, type }, i) in chatData" :key="i">
        <span v-if="type === 'join' || type === 'leave'">
          {{ data }} {{ msg }}
        </span>
        <span v-else>
          {{ data }}: {{ msg }}
        </span>
      </p>
    </div>
    <span v-if="isShowNewsTip" @click="toNews" class="to-news">查看最新消息</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUnmount, watchEffect, watch, onUnmounted } from 'vue';

export default defineComponent({
  props: {
    chatData: Array
  },
  
  setup(props) {
    const isShowNewsTip = ref(false);

    let myRef = null;
    const setRef = e => {
      myRef = e;
    }
    // 获取聊天内容的 DOM 数据
    const getElInfo = () => {
      const el = myRef;
      if (!el) return {};
      const scrollHeight = el.scrollHeight,
      clientHeight = el.clientHeight,
      scrollTop = el.scrollTop;
      return { el, scrollHeight, clientHeight, scrollTop };
    }

    // 滚动时监听是否查看了最新消息
    const onScroll = () => {
      const { el, scrollHeight, clientHeight, scrollTop } = getElInfo();
      const isBottom = scrollTop === scrollHeight - clientHeight;
      if (isBottom) isShowNewsTip.value = false;
    }

    // 挂载
    onMounted(() => {
      const { el } = getElInfo();
      el.addEventListener('scroll', onScroll);
    })
    // 卸载
    onUnmounted(() => {
      const { el } = getElInfo();
      el.removeEventListener('scroll', onScroll);
    })

    // 监听聊天内容变化
    const watchChatChange = function () {
      const { el, scrollHeight, clientHeight, scrollTop } = getElInfo();
      if (!el) return;
      const isBottom = scrollTop === scrollHeight - clientHeight;
      
      if (isBottom) {
        setTimeout(() => { 
          isShowNewsTip.value = false;
          const newsTop = el.scrollHeight - el.clientHeight;
          el.scrollTo(0, newsTop) 
        });
        return;
      }
      isShowNewsTip.value = true;
    }
    watch(() => props.chatData.length, watchChatChange)

    const toNews = () => {
      const { el, scrollHeight, clientHeight, scrollTop } = getElInfo();
      const newsTop = scrollHeight - clientHeight;
      el.scrollTo(0, newsTop) 
      isShowNewsTip.value = false;
    }
    
    return {
      isShowNewsTip,
      setRef,
      getElInfo,
      toNews
    }
  }
});
</script>
<style lang="less" scoped>
.room-container {
  position: relative;
  flex: 1;
  .room-cont {
    height: 273px;
    padding: 20px;
    overflow: auto;
    font-size: 18px;
  }

  .to-news {
    position: absolute;
    bottom: 10px;
    right: 10px;
    font-size: 14px;
  }
}
</style>