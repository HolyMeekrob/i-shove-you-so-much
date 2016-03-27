import * as test from 'tape';

import { getSimpleGame, getTwoVersusTwoGame, getThreeVersusThreeGame }
	from '../../gameFactory';
import { validateShove } from '../../../../src/action/shove/validation';

import { Direction } from '../../../../src/model/direction';
import { Position } from '../../../../src/model/position';

test('validateShove() when there is no token at the given position', (assert: test.Test): void => {
	const game = getSimpleGame();
	const pos = new Position(1, 2);
	const dir = Direction.South;

	assert.equal(validateShove(game, pos, dir), false, 'returns false');
	assert.end();
});

test('validateShove() when there is no token in the shove direction', (assert: test.Test): void => {
	const game = getSimpleGame();
	const pos = new Position(1, 1);
	const dir = Direction.North;

	assert.equal(validateShove(game, pos, dir), false, 'returns false');
	assert.end();
});

test('validateShove() when the token being shoved is a victim', (assert: test.Test): void => {
	const game = getTwoVersusTwoGame();
	const pos = new Position(2, 1);
	const dir = Direction.West;

	assert.equal(validateShove(game, pos, dir), false, 'returns false');
	assert.end();
});

test('validateShove() when a different player\s token is shoved', (assert: test.Test): void => {
	const game = getThreeVersusThreeGame();
	const pos = new Position(4, 5);
	const dir = Direction.North;

	assert.equal(validateShove(game, pos, dir), false, 'returns false');
	assert.end();
});

test('validateShove() when an anchor is being shoved', (assert: test.Test): void => {
	const game = getThreeVersusThreeGame();
	const pos = new Position(2, 4);
	const dir = Direction.North;

	assert.equal(validateShove(game, pos, dir), false, 'returns false');
	assert.end();
});

test('validateShove() when shoving through a wall', (assert: test.Test): void => {

	assert.end();
});

test('validateShove() when shoving through a wall', (assert: test.Test): void => {
	const game = getThreeVersusThreeGame();
	const pos = new Position(2, 4);
	const dir = Direction.West;

	assert.equal(validateShove(game, pos, dir), false, 'returns false');
	assert.end();
});

test('validateShove() for a valid shove', (assert: test.Test): void => {
	const game = getThreeVersusThreeGame();
	const pos = new Position(4, 4);
	const dir = Direction.North;

	assert.equal(validateShove(game, pos, dir), true, 'returns true');
	assert.end();
});
