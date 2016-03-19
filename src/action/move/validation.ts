import { complement, compose, curry, identical } from 'ramda';
import { getBorderAt, getFloorAt, getNextPosition, isTokenForPlayer } from '../util';

import { Border } from '../../model/border';
import { Direction } from '../../model/direction';
import { Floor } from '../../model/floor';
import { Game } from '../../model/game';
import { Position } from '../../model/position';

const isNotWall: (border: Border) => boolean = complement(identical(Border.Wall));
const isNotMovingThroughWall: (game: Game, pos: Position, dir: Direction) => boolean =
	compose(isNotWall, getBorderAt);

const hasEmptyPath =
(game: Game, pos: Position, dir: Direction, spacesRemaining: number): boolean => {
	if (game.getGameBoard().hasTokenAt(pos) || getFloorAt(game, pos) === Floor.Pit) {
		return false;
	}

	if (spacesRemaining === 0) {
		return true;
	}

	return isNotMovingThroughWall(game, pos, dir)
		&& hasEmptyPath(game, getNextPosition(dir, pos), dir, spacesRemaining - 1);
};

const isMoveableToken = (game: Game, pos: Position): boolean =>
	isTokenForPlayer(game.getTurn(), game.getGameBoard().getTokenAt(pos));

export const validateMove =
curry((game: Game, pos: Position, dir: Direction, spaces: number): boolean =>
	(spaces > 0)
		&& game.getGameBoard().hasTokenAt(pos)
		&& isMoveableToken(game, pos)
		&& isNotMovingThroughWall(game, pos, dir)
		&& hasEmptyPath(game, getNextPosition(dir, pos), dir, spaces - 1));
