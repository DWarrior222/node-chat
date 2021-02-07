<template>
  <div class="room-container">
    <div class="room-cont" ref="room-cont">
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
import { defineComponent, ref, onMounted } from 'vue';

export default defineComponent({
  setup() {
    const isShowNewsTip = ref(false);
    onMounted(() => {
      // window.addEventListener('scroll');
      console.log(isShowNewsTip.value, 'this');
    })
    return {
      isShowNewsTip
    }
  },
  props: {
    chatData: Array
  },
  watch: {
    'chatData.length'() {
      const { el, scrollHeight, clientHeight, scrollTop } = this.getElInfo();
      const isBottom = scrollTop === scrollHeight - clientHeight;
      
      if (isBottom) {
        setTimeout(() => { 
          this.isShowNewsTip = false;
          const newsTop = el.scrollHeight - el.clientHeight;
          el.scrollTo(0, newsTop) 
        });
        return;
      }
      this.isShowNewsTip = true;
    }
  },
  methods: {
    getElInfo() {
      const el = this.$refs['room-cont'];
      const scrollHeight = el.scrollHeight,
      clientHeight = el.clientHeight,
      scrollTop = el.scrollTop;
      return { el, scrollHeight, clientHeight, scrollTop };
    },
    toNews() {
      const { el, scrollHeight, clientHeight, scrollTop } = this.getElInfo();
      const newsTop = scrollHeight - clientHeight;
      el.scrollTo(0, newsTop) 
      this.isShowNewsTip = false;
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