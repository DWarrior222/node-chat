<template>
  <div class="room-container">
    <div class="room-cont" :ref="setRef">
      <div v-for="({ name, cont, type }, i) in chatData" :key="i">
        <div class="tip" v-if="type === 'join' || type === 'leave'">
          {{ name }} {{ cont }}
        </div>
        <chat-msg v-else :cont="cont" :name="name" :is-me="username === name"></chat-msg>
      </div>
    </div>
    <span v-if="isShowNewsTip" @click="toNews" class="to-news">查看最新消息</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch, onUnmounted } from 'vue';
import ChatMsg from './chat-msg.vue';
export default defineComponent({
  components: {
    ChatMsg
  },

  props: {
    chatData: Array,
    username: String
  },

  setup(props) {
    const isShowNewsTip = ref(false);

    let myRef = ref();
    const setRef = e => {
      myRef.value = e;
    }
    // 获取聊天内容的 DOM 数据
    const getElInfo = () => {
      if (!myRef.value) return {};
      const scrollHeight = myRef.value.scrollHeight,
      clientHeight = myRef.value.clientHeight,
      scrollTop = myRef.value.scrollTop;
      return { el: myRef, scrollHeight, clientHeight, scrollTop };
    }

    // 滚动时监听是否查看了最新消息
    const onScroll = () => {
      const { scrollHeight, clientHeight, scrollTop } = getElInfo();
      const isBottom = scrollTop === scrollHeight - clientHeight;
      if (isBottom) isShowNewsTip.value = false;
    }

    // 挂载
    onMounted(() => {
      const { el } = getElInfo();
      el.value.addEventListener('scroll', onScroll);
    })
    // 卸载
    onUnmounted(() => {
      const { el } = getElInfo();
      el.value.removeEventListener && el.value.removeEventListener('scroll', onScroll);
    })

    // 监听聊天内容变化
    const watchChatChange = function () {
      const { el, scrollHeight, clientHeight, scrollTop } = getElInfo();
      if (!el) return;
      const isBottom = scrollTop === scrollHeight - clientHeight;
      
      if (isBottom) {
        setTimeout(() => { 
          isShowNewsTip.value = false;
          const newsTop = el.value.scrollHeight - el.value.clientHeight;
          el.value.scrollTo(0, newsTop) 
        });
        return;
      }
      isShowNewsTip.value = true;
    }
    watch(() => props.chatData.length, watchChatChange)

    const toNews = () => {
      const { el, scrollHeight, clientHeight, scrollTop } = getElInfo();
      const newsTop = scrollHeight - clientHeight;
      el.value.scrollTo(0, newsTop) 
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
    height: 473px;
    padding: 20px;
    overflow: auto;
    font-size: 18px;

    .tip {
      text-align: center;
      font-size: 14px;
    }
  }

  .to-news {
    position: absolute;
    bottom: 10px;
    right: 50%;
    transform: translateX(50%);
    font-size: 14px;
  }
}
</style>