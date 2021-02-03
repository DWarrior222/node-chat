<template>
  <div class="chat">
    <input type="text" v-model="name">
    <button @click="login">登录</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import service from '../service/index'

export default defineComponent({
  setup() {
    onMounted(() => {
      console.log('setup', 'onMounted');
    })

    const name = ref()

    return {
      name
    }
  },
  mounted() {
  },
  methods: {
    async login() {
      await service.login({ user: this.name })
      this.$router.push('/chat')
    }
  }
});
</script>