<template>
  <div class="user-list-cont">
    <p v-for="(user, i) in userData" :key="i">
      {{ user }}
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    userData: Array
  },
  setup() {
    return {
    }
  }
});
</script>
<style lang="less" scoped>
.user-list-cont {
  padding: 10px 20px;
  max-height: 654px;
  overflow: auto;
}
</style>
