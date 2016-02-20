import { and, complement, converge, isNil } from 'ramda';
import { getBorderAt, getNextPosition, isTokenForCurrentPlayer } from './util';

import * as border from '../model/border';

const hasEmptyPath = (game, dir, pos, spacesRemaining) => {
	if (game.hasTokenAt(pos)) {
		return false;
	}

	if (spacesRemaining === 0) {
		return true;
	}

	if (getBorderAt(pos, game, dir) === border.WALL_BORDER) {
		return false;
	}

	return hasEmptyPath(game, dir, getNextPosition(dir, pos), spacesRemaining - 1);
};

const validateMove = (game, dir, pos, spaces) => {
	if (!game.hasTokenAt(pos)) {
		return false;
	}

	const tokenToMove = game.getTokenAt(pos);
	const isMoveableToken = converge(and,
		[complement(isNil), isTokenForCurrentPlayer(game)]);

	return isMoveableToken(tokenToMove) && hasEmptyPath(game, dir, pos, spaces - 1);
};

export default(dir, pos, spaces, game) => {
	if (!validateMove(dir, pos, spaces, game)) {
		throw new Error('Invalid move');
	}
};
