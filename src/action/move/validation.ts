import { and, complement, curry, isNil, lift } from 'ramda';
import {
	getBorderAt, getFloorAt, getNextPosition, isTokenForPlayer
} from '../util';

import { Border } from '../../model/border';
import { Direction } from '../../model/direction';
import { Floor } from '../../model/floor';
import { Game } from '../../model/game';
import { Position } from '../../model/position';
import { Token } from '../../model/token';

const hasEmptyPath =
(game: Game, pos: Position, dir: Direction, spacesRemaining: number): boolean => {
	if (game.getGameBoard().hasTokenAt(pos) || getFloorAt(game, pos) === Floor.Pit) {
		return false;
	}

	if (spacesRemaining === 0) {
		return true;
	}

	return getBorderAt(game, pos, dir) !== Border.Wall
		&& hasEmptyPath(game, getNextPosition(dir, pos), dir, spacesRemaining - 1);
};

const isMoveableToken = (game: Game, token: Token): boolean =>
	lift(and)(complement(isNil), isTokenForPlayer(game.getTurn()))(token);

export const validateMove =
curry((game: Game, pos: Position, dir: Direction, spaces: number): boolean => {
	if (spaces < 1) {
		return false;
	}

	if (!game.getGameBoard().hasTokenAt(pos)) {
		return false;
	}

	return isMoveableToken(game, game.getGameBoard().getTokenAt(pos))
		&& hasEmptyPath(game, pos, dir, spaces - 1);
});
