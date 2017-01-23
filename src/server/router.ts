import * as Router from 'koa-router';

import { GameTracker } from './gameTracker';

const gameTracker = new GameTracker();

export const getRouter = (): Router.IMiddleware => {
	const router = new Router();

	router.post('/game/create', async (ctx, next) => {
		await(next());
		const gameId = gameTracker.create(ctx.request.body);
		ctx.body = { id: gameId };
		ctx.status = 200;
}).get('/game/create', async (ctx, next) => {
	await(next());
	ctx.body = 'Great jorb!';
	ctx.status = 200;
});

	return router.routes();
};
