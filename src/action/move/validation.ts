import { complement, compose, curry, either, identical } from 'ramda';
import { isTokenForPlayer } from '../../util/playerType';
import { getBorderAt, getFloorAt } from '../../util/game';
import { getNextPosition } from '../../util/position';

import { Border } from '../../model/border';
import { Direction } from '../../model/direction';
import { Floor } from '../../model/floor';
import { Game } from '../../model/game';
import { Position } from '../../model/position';

const isNotWall: (border: Border) => boolean = complement(identical(Border.Wall));
const isNotMovingThroughWall: (game: Game, pos: Position, dir: Direction) => boolean =
	compose(isNotWall, getBorderAt);
const floorIsPit = (game: Game) => compose(identical(Floor.Pit), getFloorAt(game));

const hasEmptyPath =
(game: Game, pos: Position, dir: Direction, spacesRemaining: number): boolean => {
	if (either(game.getGameBoard().hasTokenAt, floorIsPit(game))(pos)) {
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
