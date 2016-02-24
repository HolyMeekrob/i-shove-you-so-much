import { and, converge } from 'ramda';

import {
	getBorderAt,
	getNextPosition,
	isTokenForCurrentPlayer
} from '../util';

import * as tokenType from '../model/tokenType';
import * as border from '../model/border';

const canShove = (dir, pos, game) => {
	if (game.getTokenAt(game).getTokenType() === tokenType.ANCHOR) {
		return false;
	}

	if (getBorderAt(pos, game, dir) === border.WALL_BORDER) {
		return false;
	}

	if (!game.hasTokenAt(pos)) {
		return true;
	}

	return canShove(dir, getNextPosition(dir, pos), game);
};

export default (dir, pos, game) => {
	// Can not shove an empty space
	if (!game.hasTokenAt(pos)) {
		return false;
	}

	// If the next space is empty, it's a move not a shove
	const nextPosition = getNextPosition(dir, pos);
	if (!game.hasTokenAt(nextPosition)) {
		return false;
	}

	const tokenToShove = game.getTokenAt(pos);
	const isBully = (token) => token.getTokenType() === tokenType.BULLY;
	const isShoveableToken = converge(and, [isBully, isTokenForCurrentPlayer(game)]);

	return isShoveableToken(tokenToShove) && canShove(dir, pos);
};
