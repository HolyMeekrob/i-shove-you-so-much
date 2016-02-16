import { all, append, curry, defaultTo } from 'ramda';

import * as tt from './model/tokenType';
import * as b from './model/border';
import * as d from './model/direction';
import * as f from './model/floor';
import position from './model/position';

const getSquareAt = (game, pos) => {
	return game.getGameBoard().getBoard().getSquareAt(pos);
};

const getTokenAt = (game, pos) => {
	return game.getGameBoard().getTokenAt(pos);
};

const hasTokenAt = (game, pos) => {
	return game.getGameBoard().hasTokenAt(pos);
};

const canPush = (game, direction, pos) => {
	const isNotAnchor = getTokenAt(game, pos).getTokenType() !== tt.ANCHOR;
	const hasOpenBorder = getSquareAt(game, pos).getBorder(direction) === b.OPEN_BORDER;

	return isNotAnchor && hasOpenBorder;
};

const getNextPositionFn = (direction) => {
	switch (direction) {
	case d.NORTH:
		return (pos) => position(pos.x, pos.y + 1);

	case d.EAST:
		return (pos) => position(pos.x + 1, pos.y);

	case d.SOUTH:
		return (pos) => position(pos.x, pos.y - 1);

	case d.WEST:
		return (pos) => position(pos.x - 1, pos.y);

	default:
		throw new Error('Invalid direction');
	}
};

const getLine = (game, nextPositionFn, pos, prepend) => {
	const line = defaultTo([], prepend);

	if (getSquareAt(game, pos).getFloorType() === f.PIT) {
		return line;
	}

	if (!hasTokenAt(game, pos)) {
		return line;
	}

	return getLine(game, nextPositionFn(pos), nextPositionFn, append(pos, line));
};

const validateMove = (game, direction, pos) => {
	if (getTokenAt(game, pos).getTokenType() !== tt.BULLY) {
		return false;
	}

	const canPushInDirection = curry(canPush(game, direction));
	const nextPositionFn = getNextPositionFn(direction);
	return all(canPushInDirection, getLine(game, nextPositionFn, pos));
};

export default (game, direction, pos) => {
	if (!validateMove(game, direction, pos)) {
		throw new Error('Invalid move');
	}
};
