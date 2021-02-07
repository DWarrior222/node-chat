<template>
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
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    chatData: Array
  },
  watch: {
    'chatData.length'() {
      const el = this.$refs['room-cont'];
      const scrollHeight = el.scrollHeight,
      clientHeight = el.clientHeight,
      scrollTop = el.scrollTop;
      const isBottom = scrollTop === scrollHeight - clientHeight;
      
      if (isBottom) setTimeout(() => { 
        const newTop = el.scrollHeight - el.clientHeight;
        el.scrollTo(0, newTop) 
      });
    }
  },
  setup() {
    return {
    }
  }
});
</script>
<style lang="less" scoped>
.room-cont {
  padding: 20px;
  flex: 1;
  overflow: auto;
  font-size: 18px;
}
</style>