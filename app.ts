import * as Koa from 'koa';
import * as bodyParser from 'koa-bodyparser';
import * as mount from 'koa-mount';
import * as serve from 'koa-static';

import { getRouter } from './src/server/router';

const app = new Koa();

app.use(bodyParser());
app.use(serve('./src/client/'));
app.use(mount('/game', serve('./src/game')));
app.use(getRouter());

app.listen(3000);
