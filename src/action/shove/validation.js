import { and, curry, lift } from 'ramda';

import {
	getBorderAt,
	getNextPosition,
	isTokenForCurrentPlayer
} from '../util';

import * as tokenType from '../model/tokenType';
import * as border from '../model/border';

const canShove = (game, pos, dir) => {
	if (game.getTokenAt(game).getTokenType() === tokenType.ANCHOR) {
		return false;
	}

	if (getBorderAt(game, pos, dir) === border.WALL_BORDER) {
		return false;
	}

	if (!game.hasTokenAt(pos)) {
		return true;
	}

	return canShove(game, getNextPosition(dir, pos), dir);
};

const isBully = (token) => token.getTokenType() === tokenType.BULLY;

const isShoveableToken = (game, token) =>
	lift(and)(isBully, isTokenForCurrentPlayer(game))(token);

export default curry((game, pos, dir) => {
	// Can not shove an empty space
	if (!game.hasTokenAt(pos)) {
		return false;
	}

	// If the next space is empty, it's a move not a shove
	if (!game.hasTokenAt(getNextPosition(dir, pos))) {
		return false;
	}

	return isShoveableToken(game, game.getTokenAt(pos)) && canShove(pos, dir);
});
