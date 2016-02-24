import { and, complement, converge, isNil } from 'ramda';
import {
	getBorderAt, getFloorAt, isTokenForCurrentPlayer, getNextPosition
} from '../util';

import * as floor from '../../model/floor';
import * as border from '../../model/border';

const hasEmptyPath = (game, dir, pos, spacesRemaining) => {
	if (game.hasTokenAt(pos)) {
		return false;
	}

	if (getFloorAt(pos, game) === floor.PIT) {
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

const isMoveableToken = (game, token) => converge(and,
	[complement(isNil), isTokenForCurrentPlayer(game)])(token);

export default (game, dir, pos, spaces) => {
	if (spaces < 1) {
		return false;
	}

	if (!game.hasTokenAt(pos)) {
		return false;
	}

	return isMoveableToken(game, game.getTokenAt(pos))
		&& hasEmptyPath(game, dir, pos, spaces - 1);
};
