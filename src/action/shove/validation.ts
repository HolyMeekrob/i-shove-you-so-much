import { and, curry, identical, lift } from 'ramda';
import { getBorderAt, getNextPosition, isTokenForPlayer } from '../util';

import { Border } from '../../model/border';
import { Direction } from '../../model/direction';
import { Game } from '../../model/game';
import { Position } from '../../model/position';
import { Token } from '../../model/token';
import { TokenType } from '../../model/tokenType';

const canShove = (game: Game, pos: Position, dir: Direction): boolean => {
	if (game.getGameBoard().getTokenAt(pos).getTokenType() === TokenType.Anchor) {
		return false;
	}

	if (getBorderAt(game, pos, dir) === Border.Wall) {
		return false;
	}

	if (!game.getGameBoard().hasTokenAt(pos)) {
		return true;
	}

	return canShove(game, getNextPosition(dir, pos), dir);
};

const isShoveableToken = (game: Game, token: Token): boolean =>
	lift(and)(identical(TokenType.Bully), isTokenForPlayer(game.getTurn()))(token);

export const validateShove =
curry((game: Game, pos: Position, dir: Direction): boolean => {
	// Can not shove an empty space
	if (!game.getGameBoard().hasTokenAt(pos)) {
		return false;
	}

	// If the next space is empty, it's a move not a shove
	if (!game.getGameBoard().hasTokenAt(getNextPosition(dir, pos))) {
		return false;
	}

	return isShoveableToken(game, game.getGameBoard().getTokenAt(pos))
		&& canShove(game, pos, dir);
});
