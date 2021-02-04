<template>
  <div class="signin">
    <input type="text" v-model="name" placeholder="请输入名字">
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
<style lang="less" scoped>
.signin {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  >input {
    height: 30px;
    width: 200px;
    text-indent: 1em;
  }
  >button {
    width: 60px;
    height: 30px;
    margin-left: 10px;
  }
}
</style>