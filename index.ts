/// <reference path="typings/main.d.ts" />
import * as Koa from 'koa';
import * as Router from 'koa-router';
const router = Router();
const app = new Koa();

router.get('/', async (ctx: Koa.Context, next: Function) => {
	await next();
	ctx.body = 'Placeholder';
});

app.use(router.routes());
app.listen(3000);
