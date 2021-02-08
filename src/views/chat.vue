<template>
  <button class="signout" @click="signout">退出</button>
  <button class="signout" @click="$router.push('/signin')">登录</button>
  <div class="chat">
    <div class="container">
      <div class="room">
        <div class="title">
          room
          {{ onlineStatus ? "在线" : "掉线了"}} <span v-if="!onlineStatus" @click="reConnecting">点我重连</span>
        </div>
        <chat-record :chatData="chatData.value"></chat-record>
        <div class="input-area">
          <div class="top-tool"></div>
          <div class="text">
            <textarea @keydown.enter="send" v-model="chatInfo.value" name="" id="" cols="30" rows="10"></textarea>
          </div>
          <div class="bottom-tool">
            <button @click="send">发送</button>
          </div>
        </div>
      </div>
      <div class="user-list">
        <div class="title"> 当前在线用户 </div>
        <user-list :userData="userList.value"></user-list>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import service from '../service/index'
import { createWs, listenBeforeUnload, leaveWsPage } from '../http/ws'
import ChatRecord from './src/components/chat-record.vue'
import UserList from './src/components/user-list.vue'

export default defineComponent({
  components: {
    ChatRecord,
    UserList
  },
  setup() {
    const chatData = reactive({ value: [] })
    const chatInfo = reactive({ value: '' })
    const userList = reactive({ value: [] })
    const onlineStatus = ref(true)
    const ws = createWs()
    const checkTimer = 0
    
    return {
      chatData,
      userList,
      chatInfo,
      ws,
      onlineStatus,
      checkTimer
    }
  },
  beforeRouteLeave() {
    const flag = leaveWsPage();
    if (!flag) return false
    this.ws.send('close');
  },
  mounted() {
    this.registerWs()
  },
  methods: {
    checkOnlineStatus () {
      clearTimeout(this.checkTimer)
      this.onlineStatus = true;
      this.checkTimer = setTimeout(() => {
        this.onlineStatus = false;
      }, 35000);
    },
    async signout () {
      const { ws, $router } = this;
      ws.send('close')
      await service.signout()
      $router.push('/signin')
    },
    send () {
      const { chatInfo, ws } = this;
      const v = chatInfo.value;
      chatInfo.value = ''
      if (!v.trim()) return
      const msg = JSON.stringify({ msg: v, type: 'text' });
      ws.send(msg);
      if (ws.readyState === 3) this.onlineStatus = false;
    },
    registerWs () {
      const { ws } = this;
      // 用于指定当从服务器接受到信息时的回调函数。
      ws.onmessage = event => { 
        const data = JSON.parse(event.data);
        this.checkOnlineStatus()
        if (data.type === 'list') {
          this.userList.value = data.data || [];
        } else {
          this.chatData.value.push(data);
        }
      };

      // 用于指定连接成功后的回调函数
      ws.onopen = () => {
      }

      ws.onclose = (e) => {
      }

      listenBeforeUnload(() => {
        ws.send('close');
      })
    },
    reConnecting () {
      const ws = createWs()
      this.ws = ws
      this.registerWs()
      if (ws.readyState === 1) this.onlineStatus = true;
    }
  }
});
</script>
<style scoped lang="less">
.chat {
  padding-bottom: 100px;
  .container {
    display: flex;
    width: 500px;
    height: 700px;
    background: antiquewhite;
    justify-content: space-between;
    margin: 0 auto;
    width: 800px;
    border: 1px solid #ccc;
    background: white;
    border-radius: 5px;


    .room {
      flex: 1;
      border-right: 1px solid #ddd;
      display: flex;
      flex-direction: column;

      .input-area {
        height: 160px;
        border-top: 1px solid #ddd;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .top-tool {
          padding: 0 10px;
          height: 30px;
        }

        .text {
          flex: 1;
          display: flex;
          justify-content: center;

          textarea {
            border: 0px;
            outline: none;
            height: 90px;
            width: 560px;
            font-size: 16px;
          }
        }

        .bottom-tool {
          padding: 0 10px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: flex-end;

          >button {
            width: 70px;
            height: 25px;
          }
        }
      }
    }

    .title {
      height: 25px;
      background: #e9e8e8;
      border-bottom: 1px solid #ddd;
      line-height: 25px;
      padding: 0 20px;
    }
  }

  .user-list {
    width: 200px;
    font-size: 14px;
  }
}

.signout {
  width: 60px;
  height: 30px;
}
</style>