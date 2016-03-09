import { and, complement, curry, isNil, lift } from 'ramda';
import {
	getBorderAt, getFloorAt, getNextPosition
} from '../util';

import { Border } from '../../model/border';
import { Direction } from '../../model/direction';
import { Floor } from '../../model/floor';
import { Game } from '../../model/game';
import { Position } from '../../model/position';

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