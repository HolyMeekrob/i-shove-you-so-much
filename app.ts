import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as serve from 'koa-static';

const router = new Router();
const app = new Koa();

app.use(serve('./src/client'));

app.listen(3000);
