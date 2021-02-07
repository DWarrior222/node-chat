const WebSocket = require('ws');

function createWs(server) {
  const wss = new WebSocket.Server({
    server: server
  })

  wss.broadcast = (data = {}, fromUser) => {
    wss.clients.forEach(client => {
      try {
        const { user } = client;
        const isMe = fromUser === user;
        const res = { ...JSON.parse(data), isMe };
        client.send(JSON.stringify(res));
      } catch (error) {
        console.log(error, 'error');
        client.send('{}');
      }
    });
  };

  wss.on('connection', (ws, req) => {
    if (!getUser(req)) {
      console.error('用户未登录');
      return;
    }

    const user = Buffer.from(getUser(req), 'base64').toString();
    
    console.log('客户端连接了！！', );

    ws.isAlive = true;
    
    // 会响应 ping 消息
    ws.on('pong', () => {
      ws.isAlive = true;
    })

    // 识别成功，把user绑定到该WebSocket对象:
    ws.user = user;

    // 绑定WebSocketServer对象:
    ws.wss = wss;

    // 通知所有客户端有人进入房间
    wss.broadcast(JSON.stringify(getUserMsg(user, '进入了房间', 'join')), user);

    // 通知所有客户端更新房间列表
    wss.broadcast(JSON.stringify(getUserListMsg(wss)));

    ws.on('message', message => {
      console.log('客户端说: %s', message);
      if (message === 'close') {
        ws.isAlive = false
        ws.terminate();
        wss.broadcast(JSON.stringify(getUserMsg(user, '离开了房间', 'leave')), user);
        wss.broadcast(JSON.stringify(getUserListMsg(wss)));
        return
      }

      const { msg, type } = JSON.parse(message);
      wss.broadcast(JSON.stringify(getUserMsg(user, msg, type)), user);
    });
  })

  const interval = setInterval(function ping() {
    const userListMsg = getUserListMsg(wss);
    wss.broadcast(JSON.stringify(userListMsg));
    
    wss.clients.forEach(function each(ws) {
      if (ws.isAlive === false) return ws.terminate();
      ws.isAlive = false;
      ws.ping(() => {});
    });
  }, 30000);

  wss.on('close', () => {
    console.log('close');
    clearInterval(interval);
  });
}

function getUserMsg(data, msg, type) {
  return { data, msg, type }
}

function getUserListMsg(wss) {
  const userList = [...wss.clients].filter(ws => ws.isAlive).map(ws => ws.user);
  console.log(userList);
  return getUserMsg(userList, '在线列表', 'list')
}

function getUser(req) {
  const cookie = req.headers.cookie || '';
  const userCookie = cookie.split('; ').filter(v => v).find(v => {
    return v.split('=').some(d => d === 'name')
  });
  const user = userCookie && userCookie.split('=')[1];
  return user;
}

module.exports = {
  createWs
}