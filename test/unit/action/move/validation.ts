import * as test from 'tape';

import { getSimpleGame } from '../../gameFactory';
import { validateMove } from '../../../../src/action/move/validation';

import { Direction } from '../../../../src/model/direction';
import { Position } from '../../../../src/model/position';

test('validateMove() given a non-positive space count', (assert: test.Test): void => {
	const game = getSimpleGame();
	const position = new Position(0, 0);
	const direction = Direction.North;
	const spaces = 0;
	assert.equal(validateMove(game, position, direction, spaces), false, 'returns false');
	assert.end();
});
