import { both, compose, curry, identical } from 'ramda';

import { getBorderAt, getTokenAt, hasTokenAt } from '../../util/game';
import { isTokenForPlayer } from '../../util/playerType';
import { getNextPosition } from '../../util/position';

import { Border } from '../../model/border';
import { Direction } from '../../model/direction';
import { Game } from '../../model/game';
import { Position } from '../../model/position';
import { Token } from '../../model/token';
import { TokenType } from '../../model/tokenType';

const isAnchor = identical(TokenType.Anchor);
const isBully = identical(TokenType.Bully);

const getTokenType = (token: Token): TokenType => token.getTokenType();
const hasAnchorAtPosition = compose(isAnchor, getTokenType, getTokenAt);

const tokenIsBully = compose(isBully, getTokenType);

const isWall = identical(Border.Wall);
const hasWallAtPosition = compose(isWall, getBorderAt);

const canShove = (game: Game, pos: Position, dir: Direction): boolean => {
	if (!hasTokenAt(game, pos)) {
		return true;
	}

	return !hasAnchorAtPosition(game, pos)
		&& !hasWallAtPosition(game, pos, dir)
		&& canShove(game, getNextPosition(dir, pos), dir);
};

const isShoveableToken = (game: Game, token: Token): boolean =>
	both(tokenIsBully, isTokenForPlayer(game.getTurn()))(token);

export const validateShove =
curry((game: Game, pos: Position, dir: Direction): boolean =>
	hasTokenAt(game, pos)
		&& hasTokenAt(game, getNextPosition(dir, pos))
		&& isShoveableToken(game, getTokenAt(game, pos))
		&& canShove(game, pos, dir));
