import * as test from 'tape';

import { getSimpleGame, getTwoVersusTwoGame } from '../../gameFactory';

import { Direction } from '../../../../src/game/model/direction';
import { Position } from '../../../../src/game/model/position';

import { validateMove } from '../../../../src/game/action/move/validation';

test('validateMove() given a non-positive space count', (assert: test.Test): void => {
	const game = getSimpleGame();
	const pos = new Position(1, 1);
	const dir = Direction.North;
	const spaces = 0;
	assert.equal(validateMove(game, pos, dir, spaces), false, 'returns false');
	assert.end();
});

test('validateMove() if there is no token at the position', (assert: test.Test): void => {
	const game = getSimpleGame();
	const pos = new Position(2, 1);
	const dir = Direction.North;
	const spaces = 1;
	assert.equal(validateMove(game, pos, dir, spaces), false, 'returns false');
	assert.end();
});

test('validateMove() if the token is for the other player', (assert: test.Test): void => {
	const game = getSimpleGame();
	const pos = new Position(2, 2);
	const dir = Direction.South;
	const spaces = 1;
	assert.equal(validateMove(game, pos, dir, spaces), false, 'returns false');
	assert.end();
});

test('validateMove() if moving into a pit', (assert: test.Test): void => {
	const game = getSimpleGame();
	const pos = new Position(1, 1);
	const dir = Direction.South;
	const spaces = 1;
	assert.equal(validateMove(game, pos, dir, spaces), false, 'returns false');
	assert.end();
});

test('validateMove() if moving through another piece', (assert: test.Test): void => {
	const game = getTwoVersusTwoGame();
	const pos = new Position(1, 1);
	const dir = Direction.East;
	const spaces = 1;
	assert.equal(validateMove(game, pos, dir, spaces), false, 'returns false');
	assert.end();
});

test('validateMove() if moving through a wall', (assert: test.Test): void => {
	const game = getTwoVersusTwoGame();
	const pos = new Position(1, 1);
	const dir = Direction.North;
	const spaces = 2;
	assert.equal(validateMove(game, pos, dir, spaces), false, 'returns false');
	assert.end();
});

test('validateMove() for a valid move', (assert: test.Test): void => {
	const game = getTwoVersusTwoGame();
	const pos = new Position(1, 1);
	const dir = Direction.North;
	const spaces = 1;
	assert.equal(validateMove(game, pos, dir, spaces), true, 'returns true');
	assert.end();
});
