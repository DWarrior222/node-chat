<template>
  <div class="user-msg" :class="{'is-me': isMe}">
    <span class="user-name">
      {{ name }}
    </span>
    <span class="msg">
      {{ cont }}
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    name: String,
    cont: String,
    isMe: Boolean
  },

  setup(props) {
    return {
     
    }
  }
});
</script>
<style lang="less" scoped>
.user-msg {
  display: flex;
  margin: 25px 0px;

  &.is-me {
    flex-direction: row-reverse;
    .msg {
      margin-right: 10px;
      border-radius: 12px 0px 12px 12px;
      background: #bff8d7;
    }
  }

  .msg {
    margin-left: 10px;
    background: antiquewhite;
    border-radius: 0px 12px 12px 12px;
    padding: 7px 15px;
    max-width: 70%;
  }
}
</style>