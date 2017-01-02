import { curry } from 'ramda';

import { Direction } from '../model/direction';
import { Position } from '../model/position';

export const getNextPosition = curry((dir: Direction, pos: Position): Position => {
	switch (dir) {
		case Direction.North:
			return new Position(pos.x, pos.y + 1);

		case Direction.East:
			return new Position(pos.x + 1, pos.y);

		case Direction.South:
			return new Position(pos.x, pos.y - 1);

		case Direction.West:
			return new Position(pos.x - 1, pos.y);

		default:
			throw new Error('Invalid direction');
	}
});
