const Router = require('koa-router');
const router = new Router();

router.get('/signin', (ctx, next) => {
  console.log('ctx.query =', ctx.query, 'ctx.param = ', ctx.param, 'ctx.body = ', ctx.body);
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
      name,
      code: 10000
    },
    state: 200,
    type: 'success' // 自定义响应体
  }
  next()
});

module.exports = {
  router
}