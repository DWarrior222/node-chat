<template>
  <button class="signout" @click="signout">退出</button>
  <div class="chat">
    <div class="container">
      <div class="room">
        <div class="title"> room </div>
        <div class="room-cont">
          <p v-for="({ data, msg, type}, i) in chatRecord" :key="i">
            <span v-if="type === 'join' || type === 'leave'">
              {{ data }} {{ msg }}
            </span>
            <span v-else>
              {{ data }}: {{ msg }}
            </span>
          </p>
        </div>
        <div class="input-area">
          <div class="top-tool"></div>
          <div class="text">
            <textarea v-model="chatInfo.value" name="" id="" cols="30" rows="10"></textarea>
          </div>
          <div class="bottom-tool">
            <button @click="send">发送</button>
          </div>
        </div>
      </div>
      <div class="user-list">
        <div class="title"> 当前在线用户 </div>
        <div class="user-list-cont">
          <p v-for="(user, i) in userList.arr" :key="i">
            {{ user }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import service from '../service/index'
export default defineComponent({
  setup() {
    const chatRecord = reactive([])
    const chatInfo = reactive({
      value: ''
    })
    const userList = reactive({
      arr: []
    })
    
    const ws = new WebSocket(`ws://${location.host}/ws/`);
    return {
      chatRecord,
      ws,
      userList,
      chatInfo
    }
  },
  beforeRouteLeave() {
    const answer = window.confirm(
      '确定离开当前页面吗'
    )
    if (!answer) return false
    this.ws.send('close');
  },
  mounted() {
    // 用于指定当从服务器接受到信息时的回调函数。
    this.ws.onmessage = event => { 
      const data = JSON.parse(event.data);
      if (data.type === 'list') {
        this.userList.arr = data.data || [];
      } else {
        this.chatRecord.push(data);
      }
    };

    // 用于指定连接成功后的回调函数
    this.ws.onopen = () => {
    }

    this.ws.onclose = (e) => {
    }

    window.addEventListener('beforeunload', (event) => {
      // Cancel the event as stated by the standard.
      event.preventDefault();
      // Chrome requires returnValue to be set.
      event.returnValue = '';
      this.ws.send('close');
    });
  },
  methods: {
    async signout () {
      this.ws.send('close')
      await service.signout()
      this.$router.push('/signin')
    },
    send () {
      const v = this.chatInfo.value;
      this.chatInfo.value = ''
      const msg = JSON.stringify({ msg: v, type: 'text' });
      this.ws.send(msg);
    }
  }
});
</script>
<style scoped lang="less">
.chat {
  padding-top: 100px;
  .container {
    display: flex;
    width: 500px;
    height: 500px;
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

      .room-cont {
        padding: 20px;
        flex: 1;
        overflow: auto;
      }

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
          }
        }

        .bottom-tool {
          padding: 0 10px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: flex-end;
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

    .user-list-cont {
      padding: 10px 20px;
      max-height: 454px;
      overflow: auto;
    }
  }
}

.signout {
  width: 60px;
  height: 30px;
}
</style>