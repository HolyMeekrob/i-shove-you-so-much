"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const Koa = require('koa');
const Router = require('koa-router');
const router = Router();
const app = new Koa();
router.get('/', (ctx, next) => __awaiter(this, void 0, void 0, function* () {
    yield next();
    ctx.body = 'I Shove You So Much';
}));
router.get('/game', (ctx, next) => __awaiter(this, void 0, void 0, function* () {
    yield next();
    ctx.body = 'GAME';
}));
app.use(router.routes());
app.listen(3000);
