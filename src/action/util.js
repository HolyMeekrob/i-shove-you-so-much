import { curry } from 'ramda';

import * as direction from '../model/direction';
import position from '../model/position';

export const getSquareAt = (pos, game) => {
	return game.getGameBoard().getBoard().getSquareAt(pos);
};

export const getBorderAt = (pos, game, dir) => {
	return getSquareAt(pos, game).getBorder(dir);
};

export const hasTokenAt = (pos, game) => {
	return game.getGameBoard().hasTokenAt(pos);
};

export const getTokenAt = (pos, game) => {
	return game.getGameBoard().getTokenAt(pos);
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
