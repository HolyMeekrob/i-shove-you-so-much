import { curry } from 'ramda';

import * as direction from './model/direction';
import * as turn from '../model/turn';
import position from './model/position';

export const getBorderAt = curry((pos, game, dir) => {
	return game.getSquareAt(pos).getBorder(dir);
});

export const getFloorAt = curry((pos, game) => {
	return game.getSquareAt(pos).getFloorType();
});

// TODO: How to equate these two different types?
export const isTokenForPlayer = curry((playerTurn, token) =>
	token.getPlayerType() === playerTurn
);

export const isTokenForCurrentPlayer = curry((game, token) =>
	isTokenForPlayer(game.getTurn, token)
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
	return currentTurn === turn.PLAYER_ONE_TURN
		? turn.PLAYER_TWO_TURN
		: turn.PLAYER_ONE_TURN;
};

export const iterate = curry((fn, n, val) => {
	if (n < 0) {
		throw new Error('Iteration count must be non-negative');
	}

	if (n === 0) {
		return val;
	}

	return iterate(fn, n - 1, fn(val));
});
