import { curry } from 'ramda';

import * as direction from '../model/direction';
import position from '../model/position';

export const getBorderAt = (pos, game, dir) => {
	return game.getSquareAt(pos).getBorder(dir);
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
