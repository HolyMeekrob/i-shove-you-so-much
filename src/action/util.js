import { curry } from 'ramda';

import * as direction from '../model/direction';
import position from '../model/position';

export const getBorderAt = (pos, game, dir) => {
	return game.getSquareAt(pos).getBorder(dir);
};

export const getFloorAt = (pos, game) => {
	return game.getSquareAt(pos).getFloorType();
};

// TODO: How to equate these two different types?
export const isTokenForCurrentPlayer = curry((game, token) =>
	token.getPlayerType() === game.getTurn());

export const getNextPosition = (dir, pos) => {
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
