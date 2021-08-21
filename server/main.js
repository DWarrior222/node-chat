const Koa = require('koa');
const app = new Koa();
const { router } = require('./router');
const { createWs } = require('./ws');
require('./db');

app.use(router.routes()).use(router.allowedMethods());

const server = app.listen(3334);
console.log('listen port 3334');
createWs(server);

app.on('error', err => {
  log.error('server error', err)
});