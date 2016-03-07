import { and, complement, curry, isNil, lift } from 'ramda';
import {
	getBorderAt, getFloorAt, isTokenForCurrentPlayer, getNextPosition
} from '../util';

import * as floor from '../../model/floor';
import * as border from '../../model/border';

const hasEmptyPath = (game, pos, dir, spacesRemaining) => {
	if (game.hasTokenAt(pos) || getFloorAt(game, pos) === floor.PIT) {
		return false;
	}

	if (spacesRemaining === 0) {
		return true;
	}

	return getBorderAt(game, pos, dir) !== border.WALL_BORDER
		&& hasEmptyPath(game, getNextPosition(dir, pos), dir, spacesRemaining - 1);
};

const isMoveableToken = (game, token) =>
	lift(and)(complement(isNil), isTokenForCurrentPlayer(game))(token);

export default curry((game, pos, dir, spaces) => {
	if (spaces < 1) {
		return false;
	}

	if (!game.hasTokenAt(pos)) {
		return false;
	}

	return isMoveableToken(game, game.getTokenAt(pos))
		&& hasEmptyPath(game, pos, dir, spaces - 1);
});
