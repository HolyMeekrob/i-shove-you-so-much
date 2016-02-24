import { append, contains, defaultTo } from 'ramda';
import { getNextPosition } from '../util';

import * as tokenType from '../model/tokenType';
import token from '../model/token';
import tokenPosition from '../model/tokenPosition';

const getShovedTokens = (game, dir, pos, tokens) => {
	const shoved = defaultTo([], tokens);
	if (!game.hasTokenAt(pos)) {
		return shoved;
	}

	return getShovedTokens(game, dir, getNextPosition(dir, pos),
		append(game.getTokenAt(pos), shoved));
};

export default (game, dir, pos) => {
	const shovedTokens = getShovedTokens(dir, pos, game);
	return game.getTokenPositions().map((tp) => {
		// The former anchor reverts to a bully
		if (tp.token.getTokenType() === tokenType.ANCHOR) {
			return tokenPosition(token(tp.token.getPlayerType(), tokenType.BULLY),
				tp.position);
		}

		// The initiating bully becomes an anchor
		if (tp.position.equals(pos)) {
			return tokenPosition(token(tp.token.getPlayerType(), tokenType.ANCHOR),
				getNextPosition(dir, tp.position));
		}

		// Shoved tokens get moved one square
		if (contains(tp.token, shovedTokens)) {
			return tokenPosition(tp.token, getNextPosition(dir, tp.position));
		}

		// All other tokens are unaffected
		return tp;
	});
};
