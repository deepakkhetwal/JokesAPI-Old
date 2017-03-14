/**
 * Created by deepakkhetwal on 3/11/17.
 */
const Koa = require('koa');
const Router = require('koa-66');
const app = new Koa();
const router = new Router();
const controller = require("./controllers/authController");

router.use(async function(ctx, next){
   ctx.a = "hello ";
   await next();
});

router.get('/admn/review',);

router.get('/review', (ctx, next) => {
   return next().then(() => {
      ctx.body = controller.login(ctx.request, ctx.response);
   })
});

app.use(router.routes());

app.listen(3000);
