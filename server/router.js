const Router = require('koa-router');
const router = new Router();
const { getRecord } = require('./db.js');

router.get('/signin', (ctx, next) => {
  const { user } = ctx.query || {}
  if (!user) {
    ctx.body = {
      data: {
        msg: '请输入name'
      },
      state: 200,
      type: 'success' // 自定义响应体
    }
    next()
    return
  }
  ctx.cookies.set('name', Buffer.from(user).toString('base64'));
  ctx.body = {
    data: {
      msg: '登录成功'
    },
    state: 200,
    type: 'success' // 自定义响应体
  }
  next()
});

router.get('/signup', (ctx, next) => {
  console.log('signup');
});

router.get('/signout', (ctx, next) => {
  console.log('signout');
  ctx.cookies.set('name', '', { signed: false, maxAge: 0})
  ctx.cookies.set('age', '', { signed: false, maxAge: 0 })
  ctx.body = {
    data: {
      msg: '退出成功'
    },
    state: 200,
    type: 'success' // 自定义响应体
  }
  next()
});

router.get('/userinfo', (ctx, next) => {
  console.log('userinfo');
  const name = ctx.cookies.get('name');
  if (!name) {
    ctx.body = {
      data: {
        msg: '未登录',
        code: 20000
      },
      state: 200,
      type: 'success' // 自定义响应体
    }
    next()
    return
  }
  ctx.body = {
    data: {
      name: Buffer.from(name, 'base64').toString(),
      code: 10000
    },
    state: 200,
    type: 'success' // 自定义响应体
  }
  next()
});

router.get('/history', async (ctx, next) => {
  const name = ctx.cookies.get('name');
  if (!name) {
    ctx.body = {
      data: {
        msg: '未登录',
        code: 20000
      },
      state: 200,
      type: 'success' // 自定义响应体
    }
    next()
    return
  }
  const result = await getRecord({ start: 0, end: 10 });
  ctx.body = {
    data: result,
    state: 200,
    type: 'success' // 自定义响应体
  }
  next()
});

module.exports = {
  router
}