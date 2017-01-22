import * as Router from 'koa-router';

import { GameFactory } from './gameFactory';
import { INewGameInput } from './newGameInput';

export const getRouter = (): Router.IMiddleware => {
	const gameFactory = new GameFactory();

	const router = new Router();

	router.post('/game/create', async (ctx, next) => {
		await(next());
		ctx.body = { id: 1234 };
		ctx.status = 200;
}).get('/game/create', async (ctx, next) => {
	await(next());
	ctx.body = 'Great jorb!';
	ctx.status = 200;
});

	return router.routes();
};
