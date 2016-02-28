import { curry, unfold } from 'ramda';

import * as direction from '../model/direction';
import * as playerType from '../model/playerType';
import position from '../model/position';

export const getBorderAt = curry((game, dir, pos) => {
	return game.getSquareAt(pos).getBorder(dir);
});

export const getFloorAt = curry((game, pos) => {
	return game.getSquareAt(pos).getFloorType();
});

export const isTokenForPlayer = curry((playerTurn, token) =>
	token.getPlayerType() === playerTurn
);

export const isTokenForCurrentPlayer = curry((game, token) =>
	isTokenForPlayer(game.getTurn(), token)
);

export const getNextPosition = curry((dir, pos) => {
	switch (dir) {
		case direction.NORTH:
			return position(pos.x, pos.y + 1);

		case direction.EAST:
			return position(pos.x + 1, pos.y);

		case direction.SOUTH:
			return position(pos.x, pos.y - 1);

		case direction.WEST:
			return position(pos.x - 1, pos.y);

		default:
			throw new Error('Invalid direction');
	}
});

export const getNextPlayerTurn = (currentTurn) => {
	return currentTurn === playerType.PLAYER_ONE
		? playerType.PLAYER_TWO
		: playerType.PLAYER_ONE;
};

export const iterateWhile = (fIter, fValidate, seed) => {
	return unfold((val) => fValidate(val) ? [val, fIter(val)] : false, seed);
};

export const iterateN = (f, n, seed) => {
	return unfold((x) => {
		return x.count < n
			? [x.val, { count: x.count + 1, val: f(x.val) }]
			: false;
	}, { count: 0, val: seed });
};
